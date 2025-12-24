'use client'

import { Box } from '@chakra-ui/react/box'
import { Portal } from '@chakra-ui/react/portal'
import { Spinner } from '@chakra-ui/react/spinner'
import { Stack } from '@chakra-ui/react/stack'
import {
  Toaster as ChakraToaster,
  Toast,
  createToaster,
} from '@chakra-ui/react/toast'

import {
  ToastCCheckCircleFillIcon,
  ToastCInfoFillIcon,
  ToastCWarningCircleFillIcon,
  ToastCXCircleFillIcon,
} from '@/generated/icons/MyIcons'

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
  duration: 3_000,
  offsets: {
    top: '40px',
    bottom: '40px',
    right: '20px',
    left: '20px',
  },
})

const getToastIcon = (type?: 'success' | 'error' | 'info' | (string & {})) => {
  switch (type) {
    case 'success':
      return <ToastCCheckCircleFillIcon w="24px" h="24px" />
    case 'warning':
      return <ToastCWarningCircleFillIcon w="24px" h="24px" />
    case 'error':
      return <ToastCXCircleFillIcon w="24px" h="24px" />
    case 'info':
      return <ToastCInfoFillIcon w="24px" h="24px" />
    default:
      return <Toast.Indicator w="24px" h="24px" />
  }
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root display="flex" alignItems="center" gap="24px">
            <Box display="flex" alignItems="center" gap="8px">
              {toast.type === 'loading' ?
                <Spinner size="sm" color="blue.solid" />
              : getToastIcon(toast.type)}
              <Stack gap="1" flex="1" maxWidth="100%">
                {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              </Stack>
            </Box>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
