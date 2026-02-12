import { useMemo } from 'react'

import { addMinutes, isAfter, isBefore, parse } from 'date-fns'

import { RoomReservationType } from '@/generated/apis/@types/data-contracts'
import useMe from '@/hooks/useMe'

import { formatTimeKey } from '../utils/time'

interface UseRoomReservationProps {
  roomId: number
  reservations: RoomReservationType[]
}

/** 30분 단위 시간 슬롯 생성 */
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => [
  { hour: i, minute: 0 },
  { hour: i, minute: 30 },
]).flat()

export const useRoomReservation = ({
  roomId,
  reservations,
}: UseRoomReservationProps) => {
  const { data: me } = useMe()

  /** 해당 방에 배정된 예약만 필터링 */
  const roomReservations = useMemo(
    () => reservations.filter((v) => v.roomId === roomId),
    [reservations, roomId],
  )

  /** 각 시간 슬롯에 대한 상태 계산 */
  const processedSlots = useMemo(() => {
    return TIME_SLOTS.map((time) => {
      const timeKey = formatTimeKey(time.hour, time.minute)
      const slotStart = parse(timeKey, 'HH:mm', new Date())
      const slotEnd = addMinutes(slotStart, 30)

      const currentReservation = roomReservations.find((res) => {
        const resStart = parse(res.startAt, 'HH:mm:ss', new Date())
        const resEnd = parse(res.endAt, 'HH:mm:ss', new Date())
        return isBefore(slotStart, resEnd) && isAfter(slotEnd, resStart)
      })

      const isReserved = !!currentReservation
      const isStart =
        currentReservation && currentReservation.startAt.startsWith(timeKey)
      const isMine =
        currentReservation && me && currentReservation.createdByName === me.name

      return {
        timeKey,
        isReserved,
        isStart: !!isStart,
        isMine: !!isMine,
        reservation: currentReservation,
      }
    })
  }, [roomReservations, me])

  return {
    roomReservations,
    processedSlots,
  }
}
