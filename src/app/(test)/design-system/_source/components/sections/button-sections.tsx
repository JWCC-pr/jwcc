'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Stack } from '@chakra-ui/react/stack'

const option = {
  sizes: ['sm', 'md', 'lg'],
  variants: ['solid', 'outline', 'ghost'],
  colorPalettes: ['primary', 'grey'],
} as const

const ButtonSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="column" gap="20px">
          {option.colorPalettes.map((colorPalette) => (
            <Stack key={colorPalette} direction="column" gap="20px">
              {option.sizes.map((size) => (
                <Stack key={size} direction="row" gap="20px">
                  {option.variants.map((variant) => (
                    <Button
                      key={`${size}-${variant}`}
                      size={size}
                      variant={variant}
                      colorPalette={colorPalette}
                    >
                      {size} {variant} {colorPalette}
                    </Button>
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

export default ButtonSections
