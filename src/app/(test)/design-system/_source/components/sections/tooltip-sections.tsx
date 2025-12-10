'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Stack } from '@chakra-ui/react/stack'

import { Tooltip } from '@/components/ui/tooltip'

const option = {
  placements: ['top', 'bottom', 'left', 'right'],
} as const

const TooltipSections: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Box display="flex" flexDirection="column" gap="12px">
        <Stack direction="row" gap="24px">
          {option.placements.map((placement) => (
            <Tooltip
              key={placement}
              positioning={{ placement }}
              content={`${placement} 툴팁 내용`}
            >
              <Button>{placement} 툴팁</Button>
            </Tooltip>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default TooltipSections
