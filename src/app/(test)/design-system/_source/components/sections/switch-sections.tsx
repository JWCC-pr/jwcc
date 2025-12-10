'use client'

import { Box } from '@chakra-ui/react/box'
import { Stack } from '@chakra-ui/react/stack'
import { Switch } from '@chakra-ui/react/switch'

const option = {
  sizes: ['md', 'lg'],
  variants: ['solid'],
  checked: [false, true],
} as const

const SwitchSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="column" gap="40px">
          {option.variants.map((variant) => (
            <Stack key={variant} direction="row" gap="24px">
              {option.sizes.map((size) => (
                <Stack key={size} direction="column" gap="24px">
                  {option.checked.map((checked) => (
                    <Switch.Root
                      key={`${variant}-${size}-${checked}`}
                      size={size}
                      variant={variant}
                      checked={checked}
                      // disabled
                    >
                      <Switch.HiddenInput />
                      <Switch.Control />
                      <Switch.Label>
                        스위치 {`${variant}-${size}-${checked}`}
                      </Switch.Label>
                    </Switch.Root>
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

export default SwitchSections
