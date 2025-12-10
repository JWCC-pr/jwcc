'use client'

import { createListCollection } from '@chakra-ui/react/collection'
import { Portal } from '@chakra-ui/react/portal'
import {
  Select as ChakraSelect,
  type SelectRootProps,
} from '@chakra-ui/react/select'

import { Controller, useFormContext } from 'react-hook-form'

export interface SelectOption<T extends string | number = string> {
  label: string
  value: T
}

interface SelectProps extends Omit<SelectRootProps, 'collection'> {
  options: SelectOption[]
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  name?: string
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = '옵션을 선택해주세요',
  size = 'md',
  name,
  onSelect,
  ...props
}) => {
  const collection = createListCollection({ items: options })
  const formContext = useFormContext()

  // controlled select
  if (formContext?.control && name) {
    return (
      <Controller
        control={formContext.control}
        name={name}
        render={({ field }) => {
          return (
            <ChakraSelect.Root
              size={size}
              collection={collection}
              value={field.value ? [String(field.value)] : []}
              onValueChange={(e) => {
                const selectedValue = e.value[0]
                field.onChange(selectedValue)
                onSelect?.({ value: selectedValue })
              }}
              onInteractOutside={() => field.onBlur()}
              {...props}
            >
              <ChakraSelect.HiddenSelect />
              <ChakraSelect.Control>
                <ChakraSelect.Trigger>
                  <ChakraSelect.ValueText placeholder={placeholder} />
                </ChakraSelect.Trigger>
                <ChakraSelect.IndicatorGroup>
                  <ChakraSelect.Indicator />
                </ChakraSelect.IndicatorGroup>
              </ChakraSelect.Control>
              <Portal>
                <ChakraSelect.Positioner>
                  <ChakraSelect.Content>
                    {collection.items.map((item) => (
                      <ChakraSelect.Item
                        item={item}
                        key={item.label + item.value}
                      >
                        {item.label}
                        <ChakraSelect.ItemIndicator />
                      </ChakraSelect.Item>
                    ))}
                  </ChakraSelect.Content>
                </ChakraSelect.Positioner>
              </Portal>
            </ChakraSelect.Root>
          )
        }}
      />
    )
  }

  // uncontrolled select
  return (
    <ChakraSelect.Root size={size} collection={collection} {...props}>
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder={placeholder} />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <Portal>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {collection.items.map((item) => (
              <ChakraSelect.Item item={item} key={item.label + item.value}>
                {item.label}
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  )
}

export default Select
