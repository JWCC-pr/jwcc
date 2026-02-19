'use client'

import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Dialog } from '@chakra-ui/react/dialog'
import { Portal } from '@chakra-ui/react/portal'
import { XIcon } from '@phosphor-icons/react'

import { FormProvider, UseFormReturn } from 'react-hook-form'

import { RoomReservationFormDataType } from '../../hooks/useRoomReservationForm'

interface ReservationDialogLayoutProps {
  open: boolean
  onClose: () => void
  title: string
  methods: UseFormReturn<RoomReservationFormDataType>
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
  footer: React.ReactNode
  children: React.ReactNode
}

const ReservationDialogLayout: React.FC<ReservationDialogLayoutProps> = ({
  open,
  onClose,
  title,
  methods,
  onSubmit,
  footer,
  children,
}) => {
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
                {title}
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
                  {children}
                </Dialog.Body>

                <Dialog.Footer
                  position="sticky"
                  bottom="0"
                  zIndex="10"
                  bg="common-white"
                  px="40px"
                  borderTop="1px solid"
                  borderColor="grey.2"
                >
                  {footer}
                </Dialog.Footer>
              </Box>
            </FormProvider>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ReservationDialogLayout
