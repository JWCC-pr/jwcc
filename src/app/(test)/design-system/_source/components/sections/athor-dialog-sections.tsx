'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Stack } from '@chakra-ui/react/stack'

import OtherDialog from '@/components/dialogs/other-dialog'

const option = {
  sizes: ['sm', 'md', 'lg'],
} as const

const OtherDialogSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="column" gap="24px">
          {option.sizes.map((size) => (
            <OtherDialog
              key={size}
              title={`Other Dialog ${size}`}
              size={size}
              trigger={<Button size={size}>Open Other Dialog - {size}</Button>}
              buttons={{
                cancelText: 'Cancel',
                actionText: 'Action',
              }}
            >
              <Box>
                <Box>Other Dialog 1</Box>
                <Box>Other Dialog 2</Box>
              </Box>
            </OtherDialog>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default OtherDialogSections
