'use client'

import { Box } from '@chakra-ui/react/box'
import { Input } from '@chakra-ui/react/input'
import { Stack } from '@chakra-ui/react/stack'

import { FormHelper } from '@/components/form-helper'

const option = {
  sizes: ['sm', 'md', 'lg'],
  variants: ['outline'],
} as const

const InputSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="column" gap="24px">
          {option.variants.map((variant) => (
            <Stack key={variant} direction="row" gap="24px">
              {option.sizes.map((size) => (
                <FormHelper key={size} label={`${size} ${variant}`}>
                  <Input
                    size={size}
                    variant={variant}
                    placeholder={`${size} ${variant} placeholder`}
                  />
                </FormHelper>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default InputSections
