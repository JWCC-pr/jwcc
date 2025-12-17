'use client'

import { useState } from 'react'

import { Box, BoxProps } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Popover as ChakraPopover } from '@chakra-ui/react/popover'
import { Portal } from '@chakra-ui/react/portal'
import { DotsThreeVerticalIcon } from '@phosphor-icons/react'

interface PopoverProps extends Omit<ChakraPopover.RootProps, 'children'> {
  trigger?: React.ReactNode
  options: {
    label: string
    styles?: BoxProps
    onClick: () => void
  }[]
}

const Popover: React.FC<PopoverProps> = ({ trigger, options, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ChakraPopover.Root
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      positioning={{ placement: 'bottom-end', offset: { mainAxis: 10 } }}
      {...props}
    >
      <ChakraPopover.Trigger asChild>
        {trigger ?
          trigger
        : <IconButton size="sm" variant="ghost" colorPalette="grey">
            <DotsThreeVerticalIcon size="16px" color="#6A6D71" />
          </IconButton>
        }
      </ChakraPopover.Trigger>
      <Portal>
        <ChakraPopover.Positioner>
          <ChakraPopover.Content
            w="80px"
            rounded="8px"
            border="1px solid"
            borderColor="grey.2"
            bgColor="grey.0"
            boxShadow="shadow-bottom"
          >
            <ChakraPopover.Body as="ul" p="0">
              {options.map((option) => (
                <Box
                  as="li"
                  key={option.label}
                  p="8px 10px"
                  textAlign="left"
                  textStyle="pre-body-6"
                  cursor="pointer"
                  _hover={{
                    bgColor: 'grey.transparent.1',
                  }}
                  {...option.styles}
                  onClick={option.onClick}
                >
                  {option.label}
                </Box>
              ))}
            </ChakraPopover.Body>
          </ChakraPopover.Content>
        </ChakraPopover.Positioner>
      </Portal>
    </ChakraPopover.Root>
  )
}

export default Popover
