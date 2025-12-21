'use client'

import { useMemo } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { createListCollection } from '@chakra-ui/react/collection'
import { Portal } from '@chakra-ui/react/portal'
import {
  Select as ChakraSelect,
  type SelectRootProps,
} from '@chakra-ui/react/select'

interface TwoDepthSelectProps {
  options: { label: string; value: string }[]
}

const TwoDepthSelect: React.FC<TwoDepthSelectProps> = ({ options }) => {
  const pathname = usePathname()
  const router = useRouter()

  const collection = createListCollection({ items: options })

  const currentValue = useMemo(() => {
    const currentOption = options.find((option) => option.value === pathname)
    return currentOption ? [currentOption.value] : []
  }, [options, pathname])

  const handleValueChange: SelectRootProps['onValueChange'] = (e) => {
    const selectedValue = e.value[0]
    if (!selectedValue) return

    router.push(selectedValue)
  }

  return (
    <Box p="0" w="180px" h="48px" display="flex" alignItems="center">
      <ChakraSelect.Root
        size="lg"
        collection={collection}
        value={currentValue}
        onValueChange={handleValueChange}
        positioning={{
          placement: 'bottom-start',
          strategy: 'fixed',
        }}
      >
        <ChakraSelect.HiddenSelect />
        <ChakraSelect.Control w="100%" h="100%">
          <ChakraSelect.Trigger
            w="100%"
            h="100%"
            px="16px"
            borderRadius="0"
            border="none"
            bgColor="transparent"
            cursor="pointer"
            _hover={{
              bgColor: 'transparent',
            }}
            _focusVisible={{
              ring: 'none',
            }}
          >
            <ChakraSelect.ValueText
              placeholder="선택해주세요"
              textStyle="pre-body-6"
              color="grey.8"
            />
          </ChakraSelect.Trigger>
          <ChakraSelect.IndicatorGroup>
            <ChakraSelect.Indicator />
          </ChakraSelect.IndicatorGroup>
        </ChakraSelect.Control>
        <Portal>
          <ChakraSelect.Positioner>
            <ChakraSelect.Content maxH="200px" maxW="400px" minW="fit-content">
              {collection.items.map((item) => (
                <ChakraSelect.Item item={item} key={item.label + item.value}>
                  <Box lineClamp={1} flex="1" minW="0">
                    {item.label}
                  </Box>
                  <ChakraSelect.ItemIndicator />
                </ChakraSelect.Item>
              ))}
            </ChakraSelect.Content>
          </ChakraSelect.Positioner>
        </Portal>
      </ChakraSelect.Root>
    </Box>
  )
}

export default TwoDepthSelect
