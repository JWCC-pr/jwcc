'use client'

import React from 'react'

import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Dialog } from '@chakra-ui/react/dialog'
import { Portal } from '@chakra-ui/react/portal'
import { Text } from '@chakra-ui/react/text'
import { PencilSimpleLineIcon, XIcon } from '@phosphor-icons/react'

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

import { RoomReservationType } from '@/generated/apis/@types/data-contracts'
import { useRoomReservationRetrieveQuery } from '@/generated/apis/RoomReservation/RoomReservation.query'
import useMe from '@/hooks/useMe'

import {
  calculateReservationDuration,
  formatTimeWithoutSeconds,
} from '../../../utils/time'
import ReservationEditDialog from '../reservation-edit-dialog/reservation-edit-dialog'
import ReservationDeleteDialog from './reservation-delete-dialog'

interface ReservationDetailDialogProps {
  open: boolean
  onClose: () => void
  reservationId?: number
  roomReservations: RoomReservationType[]
}

const ReservationDetailDialog: React.FC<ReservationDetailDialogProps> = ({
  open,
  onClose,
  reservationId,
  roomReservations,
}) => {
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const { data: me, isAdmin } = useMe()
  const { data } = useRoomReservationRetrieveQuery({
    variables: { id: reservationId! },
    options: { enabled: !!reservationId },
  })

  if (!data) return null

  const isMine = me && data.createdByName === me.name

  const items = [
    { label: '사용단체명', value: data.organizationName },
    {
      label: '예약 날짜',
      value: format(data.date, 'yyyy년 M월 d일 (EEE)', { locale: ko }),
    },
    {
      label: '예약 시간',
      value: `${formatTimeWithoutSeconds(data.startAt)} - ${formatTimeWithoutSeconds(data.endAt)} (${calculateReservationDuration(data.startAt, data.endAt)})`,
    },
    { label: '예약 교리실', value: data.roomName },
    { label: '예약자명', value: data.createdByName },
  ]

  const isRepeatReservation = !!data.repeatId

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner p={['0', '0', '16px']}>
          <Dialog.Content
            w={['100vw', '100vw', 'md']}
            h={['100vh', '100vh', 'auto']}
            maxW={['100vw', '100vw', 'md']}
            maxH={['100vh', '100vh', 'auto']}
            p="0"
            display="flex"
            flexDirection="column"
            borderRadius={['0', '0', 'md']}
          >
            <Dialog.Header
              p={['16px 20px 8px', '16px 40px 8px', '16px 16px 8px']}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Box display="flex" gap="4px">
                {(isMine || isAdmin) && (
                  <>
                    <IconButton
                      size="sm"
                      variant="ghost"
                      color="gray"
                      onClick={() => setIsEditOpen(true)}
                    >
                      <PencilSimpleLineIcon size="16px" weight="bold" />
                    </IconButton>
                    <ReservationDeleteDialog
                      reservationId={data.id}
                      onClose={onClose}
                      isRepeatReservation={isRepeatReservation}
                    />
                  </>
                )}
              </Box>
              <Dialog.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost" colorPalette="grey">
                  <XIcon size="16px" />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body
              p={['16px 20px', '16px 40px', '16px']}
              display="flex"
              flexDirection="column"
              gap="6px"
            >
              <Text textStyle="pre-body-1" color="grey.10">
                {data.title}
              </Text>
              <Box display="flex" flexFlow="column nowrap">
                {items.map((item) => (
                  <Box
                    key={item.label}
                    py="10px"
                    display="flex"
                    gap="10px"
                    alignItems="center"
                  >
                    <Text w="80px" textStyle="pre-body-6" color="grey.8">
                      {item.label}
                    </Text>
                    <Text textStyle="pre-body-4" color="grey.10">
                      {item.value}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>

      {/* 수정 다이얼로그 */}
      {data && (
        <ReservationEditDialog
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onCloseAll={() => {
            onClose()
            setIsEditOpen(false)
          }}
          reservationId={data.id}
          repeatId={data.repeatId}
          room={{
            roomId: data.roomId,
            name: data.roomName,
            location: '',
          }}
          roomReservations={roomReservations}
        />
      )}
    </Dialog.Root>
  )
}

export default ReservationDetailDialog
