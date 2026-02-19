'use client'

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { format } from 'date-fns'

import AlertDialog from '@/components/dialogs/alert-dialog'
import {
  CatechismRoomItemType,
  RoomReservationType,
} from '@/generated/apis/@types/data-contracts'
import {
  QUERY_KEY_REPEAT_ROOM_RESERVATION_API,
  useRepeatRoomReservationRetrieveQuery,
  useRepeatRoomReservationUpdateMutation,
} from '@/generated/apis/RepeatRoomReservation/RepeatRoomReservation.query'
import {
  QUERY_KEY_ROOM_RESERVATION_API,
  useRoomReservationRetrieveQuery,
  useRoomReservationUpdateMutation,
} from '@/generated/apis/RoomReservation/RoomReservation.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'

import { useRoomReservationForm } from '../../../hooks/useRoomReservationForm'
import ReservationDialogLayout from '../../reservation-form/reservation-dialog-layout'
import ReservationFormButtons from '../../reservation-form/reservation-form-buttons'
import ReservationFormView from '../../reservation-form/reservation-form-view'

const NOW = new Date()

interface ReservationEditDialogProps {
  open: boolean
  onClose: () => void
  onCloseAll: () => void
  room: CatechismRoomItemType
  roomReservations: RoomReservationType[]
  reservationId: number
  repeatId?: number | null
}

const ReservationEditDialog: React.FC<ReservationEditDialogProps> = ({
  open,
  onClose,
  onCloseAll,
  room,
  roomReservations,
  reservationId,
  repeatId,
}) => {
  const searchParams = useSearchParams()
  const date = format(searchParams.get('date') || NOW, 'yyyy-MM-dd')

  const methods = useRoomReservationForm({
    defaultValues: {
      title: '',
      organizationName: '',
      startAt: '10:00',
      endAt: '10:30',
      isRecurring: !!repeatId,
      repeatType: 'weekly',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    },
  })

  const { reset } = methods

  // 기존 데이터 패칭
  const { data: existingData } = useRoomReservationRetrieveQuery({
    variables: { id: reservationId },
    options: { enabled: open && !!reservationId },
  })
  const { data: repeatData } = useRepeatRoomReservationRetrieveQuery({
    variables: { id: repeatId! },
    options: { enabled: open && !!repeatId },
  })

  // 데이터 로드 시 폼 초기화
  useEffect(() => {
    if (!open) return

    // 반복 예약인 경우
    if (repeatId && repeatData) {
      reset({
        title: repeatData.title,
        organizationName: repeatData.organizationName || '',
        startAt: repeatData.startAt.slice(0, 5),
        endAt: repeatData.endAt.slice(0, 5),
        isRecurring: true,
        repeatType: repeatData.repeatType,
        startDate: repeatData.startDate,
        endDate: repeatData.endDate,
        weekdays: repeatData.weekdays?.map(String),
        weekOfMonth:
          repeatData.weekOfMonth ? String(repeatData.weekOfMonth) : '0',
        monthDay: repeatData.monthDay ? String(repeatData.monthDay) : '',
      })
    }
    // 일반 예약인 경우
    else if (existingData) {
      reset({
        title: existingData.title,
        organizationName: existingData.organizationName || '',
        startAt: existingData.startAt.slice(0, 5),
        endAt: existingData.endAt.slice(0, 5),
        isRecurring: false,
        repeatType: 'weekly',
        startDate: existingData.date,
        endDate: existingData.date,
      })
    }
  }, [open, existingData, repeatData, reset, repeatId])

  // 일반 예약 수정
  const { mutateAsync: updateRoomReservationMutateAsync } =
    useRoomReservationUpdateMutation({})
  // 반복 예약 수정
  const { mutateAsync: updateRepeatRoomReservationMutateAsync } =
    useRepeatRoomReservationUpdateMutation({})

  const invalidateQueries = useInvalidateQueries()

  const [openAlertDialog, setOpenAlertDialog] = useState(false)

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const startDate = format(data.startDate || NOW, 'yyyy-MM-dd')
      const endDate = format(data.endDate || NOW, 'yyyy-MM-dd')

      // 반복 예약 수정
      if (repeatId) {
        if (data.repeatType === 'weekly') {
          await updateRepeatRoomReservationMutateAsync({
            id: repeatId,
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
          await updateRepeatRoomReservationMutateAsync({
            id: repeatId,
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

        invalidateQueries(
          QUERY_KEY_REPEAT_ROOM_RESERVATION_API.RETRIEVE({ id: repeatId }),
        )
      }
      // 일반 예약 수정
      else {
        await updateRoomReservationMutateAsync({
          id: reservationId,
          data: {
            title: data.title,
            organizationName: data.organizationName,
            roomId: room.roomId,
            startAt: data.startAt,
            endAt: data.endAt,
            date: existingData?.date || date,
          },
        })

        invalidateQueries(
          QUERY_KEY_ROOM_RESERVATION_API.RETRIEVE({ id: reservationId }),
        )
      }

      invalidateQueries(
        QUERY_KEY_ROOM_RESERVATION_API.LIST({ query: { date } }),
      )

      onCloseAll()
    } catch {
      setOpenAlertDialog(true)
    }
  })

  return (
    <>
      <ReservationDialogLayout
        open={open}
        onClose={onClose}
        title="교리실 예약 수정"
        methods={methods}
        onSubmit={onSubmit}
        footer={
          <ReservationFormButtons confirmText="수정" onCancel={onClose} />
        }
      >
        <ReservationFormView
          room={room}
          roomReservations={roomReservations}
          excludeReservationId={reservationId}
          isEditMode
        />
      </ReservationDialogLayout>

      <AlertDialog
        size="sm"
        open={openAlertDialog}
        title="수정 불가"
        description={`이미 일정이 등록되어 있어 수정이 불가합니다.\n관리자에게 문의해 주세요.\npr@jwcc.or.kr`}
        buttons={{
          actionProps: {
            text: '확인',
            onClick: () => setOpenAlertDialog(false),
          },
        }}
        backdropZIndex={2000}
        positionerZIndex={3000}
      />
    </>
  )
}

export default ReservationEditDialog
