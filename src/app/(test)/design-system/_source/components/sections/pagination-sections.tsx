'use client'

import { Box } from '@chakra-ui/react/box'
import { Stack } from '@chakra-ui/react/stack'

import Pagination from '@/components/pagination'

const option = {
  sizes: ['sm', 'md', 'lg'],
} as const

const PaginationSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="column" gap="24px">
          {option.sizes.map((size) => (
            <Pagination
              key={size}
              size={size}
              count={101}
              pageSize={11}
              defaultPage={1}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default PaginationSections
