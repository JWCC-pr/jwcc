'use client'

import { Box } from '@chakra-ui/react/box'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { Stack } from '@chakra-ui/react/stack'

const option = {
  sizes: ['sm', 'md'],
  variants: ['solid'],
  checked: [false, true, 'indeterminate'],
} as const

const CheckboxSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="column" gap="40px">
          {option.variants.map((variant) => (
            <Stack key={variant} direction="row" gap="24px">
              {option.sizes.map((size) => (
                <Stack key={size} direction="column" gap="24px">
                  {option.checked.map((checked) => (
                    <Checkbox.Root
                      key={`${variant}-${size}-${checked}`}
                      size={size}
                      variant={variant}
                      checked={checked}
                      // disabled
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>
                        체크박스 {`${variant}-${size}`}
                      </Checkbox.Label>
                    </Checkbox.Root>
                  ))}
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default CheckboxSections
