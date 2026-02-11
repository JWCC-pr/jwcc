'use client'

import { useEffect } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button, IconButton } from '@chakra-ui/react/button'
import { Dialog } from '@chakra-ui/react/dialog'
import { Portal } from '@chakra-ui/react/portal'
import { XIcon } from '@phosphor-icons/react'

import { FormProvider, useFormContext, useFormState } from 'react-hook-form'

import { useRoomReservationForm } from '../../../hooks/useRoomReservationForm'
import { Room } from '../scheduler.types'
import RoomReservationFormView from './room-reservation-form-view'

interface RoomReservationDialogProps {
  open: boolean
  onClose: () => void
  room: Room
  date: string
  initialTime: string
  reserverName: string
}

const FormButtons: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { control } = useFormContext()
  const { isValid } = useFormState({ control })

  return (
    <Box w={['320px', '362px']} py="16px" display="flex" gap="10px" mx="auto">
      <Button
        type="button"
        size="lg"
        variant="solid"
        colorPalette="grey"
        flex="1"
        onClick={onCancel}
      >
        취소
      </Button>
      <Button
        type="submit"
        size="lg"
        variant="solid"
        colorPalette="primary"
        flex="1"
        disabled={!isValid}
      >
        예약
      </Button>
    </Box>
  )
}

const RoomReservationDialog: React.FC<RoomReservationDialogProps> = ({
  open,
  onClose,
  room,
  date,
  initialTime,
  reserverName,
}) => {
  const methods = useRoomReservationForm({
    defaultValues: {
      title: '',
      groupName: '',
      startTime: initialTime,
      endTime: initialTime,
      isRecurring: false,
      recurringType: 'weekly',
      recurringStartDate: new Date().toISOString(),
      recurringEndDate: new Date().toISOString(),
    },
  })

  // 수동으로 초기 유효성 검사 실행 ( "예약" 버튼 활성화를 위함 )
  useEffect(() => {
    methods.trigger()
  }, [methods, initialTime, date])

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      console.log('Room Reservation Data:', {
        ...data,
        room,
        date,
      })
      // TODO: Add mutation to create reservation
      onClose()
    } catch (error) {
      console.error('Reservation error:', error)
    }
  })

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            p="0"
            maxW="100vw"
            maxH="100vh"
            w="100vw"
            h="100vh"
            display="flex"
            flexDirection="column"
          >
            <Dialog.Header
              position="sticky"
              top="0"
              zIndex="10"
              bg="common-white"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="16px 40px 8px"
            >
              <Dialog.Title textStyle="pre-heading-4" color="grey.10">
                교리실 예약
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost" colorPalette="grey">
                  <XIcon size="16px" />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <FormProvider {...methods}>
              <Box
                as="form"
                onSubmit={onSubmit}
                display="flex"
                flexDirection="column"
                flex="1"
                overflow="hidden"
              >
                <Dialog.Body p="16px 40px" flex="1" overflowY="auto">
                  <RoomReservationFormView
                    room={room}
                    date={date}
                    initialTime={initialTime}
                    reserverName={reserverName}
                  />
                </Dialog.Body>

                {/* Sticky Footer */}
                <Dialog.Footer
                  position="sticky"
                  bottom="0"
                  zIndex="10"
                  bg="common-white"
                  px="40px"
                  borderTop="1px solid"
                  borderColor="grey.2"
                >
                  <FormButtons onCancel={onClose} />
                </Dialog.Footer>
              </Box>
            </FormProvider>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default RoomReservationDialog
