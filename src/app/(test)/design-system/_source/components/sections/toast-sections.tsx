'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Stack } from '@chakra-ui/react/stack'

import { toaster } from '@/components/ui/toaster'

const option = {
  types: ['success', 'error', 'warning', 'info'],
} as const

const ToastSections: React.FC = () => {
  const handleOpenToast = (type: string) => {
    toaster.create({
      title: 'Toast',
      type: type,
      action: {
        label: 'Action',
        onClick: () => {
          console.log('Action')
        },
      },
    })
  }

  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="row" gap="24px">
          {option.types.map((type) => (
            <Button key={type} onClick={() => handleOpenToast(type)}>
              {type}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default ToastSections
