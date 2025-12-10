'use client'

import { Badge } from '@chakra-ui/react/badge'
import { Box } from '@chakra-ui/react/box'
import { Stack } from '@chakra-ui/react/stack'

const option = {
  sizes: ['md', 'lg'],
  variants: ['solid', 'subtle'],
  colorPalettes: [
    'grey',
    'primary',
    'green',
    'yellow',
    'blue',
    'red',
    'pink',
    'violet',
  ],
} as const

const BadgeSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="row" gap="40px">
          {option.variants.map((variant) => (
            <Stack key={variant} direction="row" gap="24px">
              {option.sizes.map((size) => (
                <Stack key={size} direction="column" gap="24px">
                  {option.colorPalettes.map((colorPalette) => (
                    <Badge
                      key={colorPalette}
                      variant={variant}
                      size={size}
                      colorPalette={colorPalette}
                    >
                      {colorPalette}
                    </Badge>
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

export default BadgeSections
