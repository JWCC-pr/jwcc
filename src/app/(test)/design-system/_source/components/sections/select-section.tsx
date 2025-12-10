'use client'

import { Box } from '@chakra-ui/react/box'
import { Stack } from '@chakra-ui/react/stack'

import Select from '@/components/select'

const option = {
  sizes: ['sm', 'md', 'lg'],
} as const

const SelectSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="row" gap="24px">
          {option.sizes.map((size) => (
            <Select
              options={[
                { label: '첫번째', value: 'first' },
                { label: '두번째', value: 'second' },
                { label: '세번째', value: 'third' },
                { label: '네번째', value: 'fourth' },
              ]}
              key={size}
              size={size}
              placeholder={`${size} 선택`}
              w="200px"
            />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default SelectSections
