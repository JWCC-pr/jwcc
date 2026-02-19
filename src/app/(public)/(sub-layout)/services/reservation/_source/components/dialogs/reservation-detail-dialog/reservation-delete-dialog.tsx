'use client'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { TrashIcon } from '@phosphor-icons/react'

import { format } from 'date-fns'

import AlertDialog from '@/components/dialogs/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { toaster } from '@/components/ui/toaster'
import { useRepeatRoomReservationDestroyMutation } from '@/generated/apis/RepeatRoomReservation/RepeatRoomReservation.query'
import {
  QUERY_KEY_ROOM_RESERVATION_API,
  useRoomReservationDestroyMutation,
} from '@/generated/apis/RoomReservation/RoomReservation.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'

const NOW = new Date()

interface ReservationDeleteDialogProps {
  repeatId?: number
  reservationId: number
  onClose: () => void
}

const ReservationDeleteDialog: React.FC<ReservationDeleteDialogProps> = ({
  repeatId,
  reservationId,
  onClose,
}) => {
  const searchParams = useSearchParams()
  const date = format(searchParams.get('date') || NOW, 'yyyy-MM-dd')

  const [isOnlyThisReservation, setIsOnlyThisReservation] = useState(false)

  const invalidateQueries = useInvalidateQueries()
  const { mutateAsync: roomReservationDestroyMutateAsync } =
    useRoomReservationDestroyMutation({})
  const { mutateAsync: repeatRoomReservationDestroyMutateAsync } =
    useRepeatRoomReservationDestroyMutation({})

  const isRepeatReservation = !!repeatId

  const handleDelete = async () => {
    try {
      if (isRepeatReservation) {
        // 단일 예역 제거
        if (isOnlyThisReservation) {
          await roomReservationDestroyMutateAsync({ id: reservationId })
        }
        // 반복 예약 전체 제거
        else {
          await repeatRoomReservationDestroyMutateAsync({ id: repeatId })
        }
      }
      // 일반 예약 제거
      else {
        await roomReservationDestroyMutateAsync({ id: reservationId })
      }
      invalidateQueries(
        QUERY_KEY_ROOM_RESERVATION_API.LIST({ query: { date } }),
      )
      onClose()
      toaster.create({
        type: 'success',
        title: '예약이 삭제되었습니다.',
      })
    } catch {
      // 에러 처리 로직
    }
  }

  return (
    <AlertDialog
      size="sm"
      trigger={
        <IconButton
          size="sm"
          variant="ghost"
          color="gray"
          _icon={{ color: 'grey.8' }}
        >
          <TrashIcon size="16px" weight="bold" />
        </IconButton>
      }
      title={isRepeatReservation ? '반복 예약 삭제' : '예약 삭제'}
      description={
        isRepeatReservation ?
          <Box display="flex" flexDirection="column" gap="6px">
            <Text textStyle="pre-body-6" color="grey.7">
              이 예약은 반복 일정입니다.
              <br />
              등록된 일정을 모두 삭제하시겠습니까?
            </Text>
            <Checkbox
              pt="16px"
              size="md"
              variant="solid"
              colorPalette="primary"
              onCheckedChange={(details) => {
                setIsOnlyThisReservation(!!details.checked)
              }}
            >
              <Text textStyle="pre-body-4" color="grey.10">
                이 일정만 삭제
              </Text>
            </Checkbox>
          </Box>
        : `삭제된 예약은 복구할 수 없습니다.\n예약을 삭제하시겠습니까?`
      }
      buttons={{
        actionProps: {
          text: '삭제',
          onClick: handleDelete,
        },
        cancelProps: {
          text: '취소',
        },
      }}
    />
  )
}

export default ReservationDeleteDialog
