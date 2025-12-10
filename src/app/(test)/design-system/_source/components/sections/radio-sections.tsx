'use client'

import { Box } from '@chakra-ui/react/box'
import { RadioGroup } from '@chakra-ui/react/radio-group'
import { Stack } from '@chakra-ui/react/stack'

const option = {
  sizes: ['sm', 'md'],
  variants: ['solid'],
  checked: [false, true],
} as const

const RadioSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="column" gap="40px">
          {option.variants.map((variant) => (
            <Stack key={variant} direction="row" gap="24px">
              {option.sizes.map((size) => (
                <RadioGroup.Root
                  key={size}
                  size={size}
                  variant={variant}
                  gap="24px"
                  display="flex"
                  flexDirection="column"
                >
                  {option.checked.map((checked, index) => (
                    <RadioGroup.Item
                      key={`${variant}-${size}-${checked}`}
                      value={index.toString()}
                    >
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <RadioGroup.ItemText>
                        라디오 {`${variant}-${size}`}
                      </RadioGroup.ItemText>
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              ))}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default RadioSections
