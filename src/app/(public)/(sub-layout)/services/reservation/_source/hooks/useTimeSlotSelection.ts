import { useCallback, useMemo, useState } from 'react'

import { addMinutes, isAfter, isBefore, parse } from 'date-fns'

import { RoomReservationType } from '@/generated/apis/@types/data-contracts'

import { formatTime } from '../utils/time'

interface UseTimeSlotSelectionProps {
  initialStartTime?: string
  initialEndTime?: string
  roomReservations: RoomReservationType[]
  excludeReservationId?: number
  onSelectionChange: (start: string, end: string) => void
}

const SLOT_START_HOUR = 6
const SLOT_COUNT = 36 // 06:00 ~ 24:00, 30분 단위

export const useTimeSlotSelection = ({
  initialStartTime,
  initialEndTime,
  roomReservations,
  excludeReservationId,
  onSelectionChange,
}: UseTimeSlotSelectionProps) => {
  // 06:00 ~ 24:00 구간의 30분 단위 슬롯 생성 및 예약 여부 계산
  const timeSlots = useMemo(
    () =>
      Array.from({ length: SLOT_COUNT }, (_, i) => {
        const hour = Math.floor(i / 2) + SLOT_START_HOUR
        const minute = (i % 2) * 30
        const label = formatTime(hour, minute)

        const slotStart = parse(label, 'HH:mm', new Date())
        const slotEnd = addMinutes(slotStart, 30)

        const isReserved = roomReservations
          .filter((res) => res.id !== excludeReservationId)
          .some((res) => {
            const resStart = parse(res.startAt, 'HH:mm:ss', new Date())
            const resEnd = parse(res.endAt, 'HH:mm:ss', new Date())
            return isBefore(slotStart, resEnd) && isAfter(slotEnd, resStart)
          })

        return { label, index: i, isReserved }
      }),
    [roomReservations, excludeReservationId],
  )

  const findIdx = useCallback(
    (timeStr?: string) => {
      if (!timeStr) return null
      // 초단위 제거 (HH:mm 형식으로 비교)
      const target = timeStr.slice(0, 5)
      const idx = timeSlots.findIndex((slot) => slot.label === target)
      return idx === -1 ? null : idx
    },
    [timeSlots],
  )

  const [firstClick, setFirstClick] = useState<number | null>(null)
  const [secondClick, setSecondClick] = useState<number | null>(null)

  // Props 변경 감지를 위한 상태 (초기값을 undefined로 설정하여 첫 렌더링 시에도 동기화되도록 함)
  const [prevInitialStartTime, setPrevInitialStartTime] = useState<
    string | undefined
  >(undefined)
  const [prevInitialEndTime, setPrevInitialEndTime] = useState<
    string | undefined
  >(undefined)

  // Props가 변경되었을 때 렌더링 중 상태 업데이트 (React 권장 패턴 중 하나)
  if (
    initialStartTime !== prevInitialStartTime ||
    initialEndTime !== prevInitialEndTime
  ) {
    setPrevInitialStartTime(initialStartTime)
    setPrevInitialEndTime(initialEndTime)

    if (!initialStartTime) {
      setFirstClick(null)
      setSecondClick(null)
    } else {
      const startIdx = findIdx(initialStartTime)
      const endIdx = initialEndTime ? findIdx(initialEndTime) : null

      if (startIdx !== null) {
        setFirstClick(startIdx)
        const targetSecondClick =
          endIdx !== null && endIdx - 1 > startIdx ? endIdx - 1 : null
        setSecondClick(targetSecondClick)
      }
    }
  }

  // 인덱스 기반 종료 시간 문자열 생성 유틸리티
  const getEndTimeLabel = useCallback((index: number) => {
    const endHour = Math.floor((index + 1) / 2) + SLOT_START_HOUR
    const endMinute = ((index + 1) % 2) * 30
    return formatTime(endHour, endMinute)
  }, [])

  const handleSlotClick = useCallback(
    (index: number) => {
      const slot = timeSlots[index]
      if (slot.isReserved) return

      if (firstClick === null || secondClick !== null) {
        // 첫 번째 클릭: 단일 30분 슬롯 선택
        setFirstClick(index)
        setSecondClick(null)
        onSelectionChange(timeSlots[index].label, getEndTimeLabel(index))
      } else {
        // 두 번째 클릭: 범위 선택
        let end = index

        if (index > firstClick) {
          const obstacles = timeSlots.filter(
            (s) => s.index > firstClick && s.index <= index && s.isReserved,
          )
          if (obstacles.length > 0) {
            end = Math.min(...obstacles.map((o) => o.index)) - 1
          }
        } else if (index < firstClick) {
          const obstacles = timeSlots.filter(
            (s) => s.index < firstClick && s.index >= index && s.isReserved,
          )
          if (obstacles.length > 0) {
            end = Math.max(...obstacles.map((o) => o.index)) + 1
          }
        }

        const finalStart = Math.min(firstClick, end)
        const finalEnd = Math.max(firstClick, end)

        setFirstClick(finalStart)
        setSecondClick(finalEnd)

        onSelectionChange(
          timeSlots[finalStart].label,
          getEndTimeLabel(finalEnd),
        )
      }
    },
    [firstClick, secondClick, timeSlots, onSelectionChange, getEndTimeLabel],
  )

  const isSelected = useCallback(
    (index: number) => {
      if (firstClick === null) return false
      if (secondClick === null) return index === firstClick
      const start = Math.min(firstClick, secondClick)
      const end = Math.max(firstClick, secondClick)
      return index >= start && index <= end
    },
    [firstClick, secondClick],
  )

  return {
    timeSlots,
    handleSlotClick,
    isSelected,
  }
}
