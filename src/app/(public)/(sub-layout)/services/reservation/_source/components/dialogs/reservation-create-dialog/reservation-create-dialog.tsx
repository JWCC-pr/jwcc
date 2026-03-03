'use client'

import { useEffect, useMemo, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { format } from 'date-fns'

import {
  CatechismRoomItemType,
  RoomReservationType,
} from '@/generated/apis/@types/data-contracts'
import { useRepeatRoomReservationCreateMutation } from '@/generated/apis/RepeatRoomReservation/RepeatRoomReservation.query'
import {
  QUERY_KEY_ROOM_RESERVATION_API,
  useRoomReservationCreateMutation,
} from '@/generated/apis/RoomReservation/RoomReservation.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'

import { useRoomReservationForm } from '../../../hooks/useRoomReservationForm'
import { addMinutesToTimeStr } from '../../../utils/time'
import ReservationDialogLayout from '../../reservation-form/reservation-dialog-layout'
import ReservationFormButtons from '../../reservation-form/reservation-form-buttons'
import ReservationFormView from '../../reservation-form/reservation-form-view'
import ReservationConflictDialog from '../reservation-conflict-dialog/reservation-conflict-dialog'

const NOW = new Date()

interface ReservationCreateDialogProps {
  open: boolean
  onClose: () => void
  room: CatechismRoomItemType
  roomReservations: RoomReservationType[]
  initialTime?: string
}

interface ConflictType {
  date: string
  startAt: string
  endAt: string
  building: string
  location: string
  name: string
}

const ReservationCreateDialog: React.FC<ReservationCreateDialogProps> = ({
  open,
  onClose,
  room,
  roomReservations,
  initialTime = '10:00',
}) => {
  const searchParams = useSearchParams()
  const date = format(searchParams.get('date') || NOW, 'yyyy-MM-dd')

  // 초기 종료 시간: 기본 1시간이지만, 다음 예약 시작 시간이 더 이르면 그 시각으로 제한
  const initialEndTime = useMemo(() => {
    const startMinutes = (() => {
      const [hour, minute] = initialTime.slice(0, 5).split(':').map(Number)
      return hour * 60 + minute
    })()

    const defaultEndTime = addMinutesToTimeStr(initialTime, 60)
    const defaultEndMinutes = startMinutes + 60

    const nextReservationStartMinutes = roomReservations.reduce<number | null>(
      (closest, reservation) => {
        const [hour, minute] = reservation.startAt
          .slice(0, 5)
          .split(':')
          .map(Number)
        const reservationStartMinutes = hour * 60 + minute

        if (reservationStartMinutes <= startMinutes) return closest
        if (closest === null || reservationStartMinutes < closest) {
          return reservationStartMinutes
        }
        return closest
      },
      null,
    )

    if (
      nextReservationStartMinutes !== null &&
      nextReservationStartMinutes < defaultEndMinutes
    ) {
      const nextHour = Math.floor(nextReservationStartMinutes / 60)
      const nextMinute = nextReservationStartMinutes % 60
      return `${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`
    }

    return defaultEndTime
  }, [initialTime, roomReservations])

  const methods = useRoomReservationForm({
    defaultValues: {
      title: '',
      organizationName: '',
      startAt: initialTime,
      endAt: initialEndTime,
      isRecurring: false,
      repeatType: 'weekly',
      startDate: new Date(date).toISOString(),
      endDate: new Date(date).toISOString(),
    },
  })

  const { reset, trigger } = methods

  // 폼 초기화
  useEffect(() => {
    if (open) {
      reset({
        title: '',
        organizationName: '',
        startAt: initialTime,
        endAt: initialEndTime,
        isRecurring: false,
        repeatType: 'weekly',
        startDate: new Date(date).toISOString(),
        endDate: new Date(date).toISOString(),
      })
    }
  }, [open, reset, initialTime, initialEndTime, trigger, date])

  // 신규 반복 예약 생성
  const { mutateAsync: createRepeatRoomReservationMutateAsync } =
    useRepeatRoomReservationCreateMutation({})
  // 신규 일반 예약 생성
  const { mutateAsync: createRoomReservationMutateAsync } =
    useRoomReservationCreateMutation({})

  const invalidateQueries = useInvalidateQueries()

  const [openReservationConflictDialog, setOpenReservationConflictDialog] =
    useState(false)
  const [reservationConflictDialogData, setReservationConflictDialogData] =
    useState<ConflictType>()

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const startDate = format(data.startDate || NOW, 'yyyy-MM-dd')
      const endDate = format(data.endDate || NOW, 'yyyy-MM-dd')

      // 반복 예약 생성
      if (data.isRecurring) {
        if (data.repeatType === 'weekly') {
          await createRepeatRoomReservationMutateAsync({
            data: {
              title: data.title,
              organizationName: data.organizationName,
              roomId: room.roomId,
              startAt: data.startAt,
              endAt: data.endAt,
              repeatType: 'weekly',
              startDate,
              endDate,
              weekdays: data.weekdays?.map(Number),
              weekOfMonth:
                data.weekOfMonth && Number(data.weekOfMonth) !== 0 ?
                  Number(data.weekOfMonth)
                : null,
            },
          })
        } else if (data.repeatType === 'monthly_date') {
          await createRepeatRoomReservationMutateAsync({
            data: {
              title: data.title,
              organizationName: data.organizationName,
              roomId: room.roomId,
              startAt: data.startAt,
              endAt: data.endAt,
              repeatType: 'monthly_date',
              startDate,
              endDate,
              monthDay: Number(data.monthDay),
            },
          })
        }
      }
      // 일반 예약 생성
      else {
        await createRoomReservationMutateAsync({
          data: {
            title: data.title,
            organizationName: data.organizationName,
            roomId: room.roomId,
            startAt: data.startAt,
            endAt: data.endAt,
            date,
          },
        })
      }

      invalidateQueries(
        QUERY_KEY_ROOM_RESERVATION_API.LIST({ query: { date } }),
      )
      onClose()
    } catch (err: unknown) {
      const conflict = (err as { error?: { conflicts?: ConflictType[] } })
        ?.error?.conflicts?.[0]

      if (conflict) {
        setOpenReservationConflictDialog(true)
        setReservationConflictDialogData({
          ...conflict,
        })
      }
    }
  })

  return (
    <>
      <ReservationDialogLayout
        open={open}
        onClose={onClose}
        title="교리실 예약"
        methods={methods}
        onSubmit={onSubmit}
        footer={
          <ReservationFormButtons confirmText="예약" onCancel={onClose} />
        }
      >
        <ReservationFormView room={room} roomReservations={roomReservations} />
      </ReservationDialogLayout>

      <ReservationConflictDialog
        open={openReservationConflictDialog}
        onClose={() => setOpenReservationConflictDialog(false)}
        conflictData={reservationConflictDialogData}
      />
    </>
  )
}

export default ReservationCreateDialog
