'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Stack } from '@chakra-ui/react/stack'

import AlertDialog from '@/components/dialogs/alert-dialog'

const option = {
  sizes: ['sm', 'md', 'lg'],
} as const

const AlertDialogSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="column" gap="24px">
          {option.sizes.map((size) => (
            <AlertDialog
              key={size}
              title={`Alert Dialog ${size}`}
              description="Alert Dialog"
              size={size}
              buttons={{
                actionProps: {
                  text: 'Action',
                },
                cancelProps: {
                  text: 'Cancel',
                },
              }}
              trigger={<Button size={size}>Open Alert Dialog - {size}</Button>}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default AlertDialogSections
