'use client'

import { useMemo } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { Text } from '@chakra-ui/react/text'
import { CaretDownIcon, XIcon } from '@phosphor-icons/react'

import ReactSelect, {
  type DropdownIndicatorProps,
  type MultiValue,
  type MultiValueProps,
  type OptionProps,
  components,
} from 'react-select'

interface Option {
  value: string
  label: string
}

const WEEKDAY_OPTIONS: Option[] = [
  { label: '월', value: '0' },
  { label: '화', value: '1' },
  { label: '수', value: '2' },
  { label: '목', value: '3' },
  { label: '금', value: '4' },
  { label: '토', value: '5' },
  { label: '일', value: '6' },
]

const getStyles = (state: {
  isFocused: boolean
  isSelected: boolean
  isDisabled: boolean
}) => {
  if (state.isFocused) return { backgroundColor: '#1B1C1D0D' }
  if (state.isSelected) return { backgroundColor: '#FEEFEA' }
  if (state.isDisabled) return { backgroundColor: '#FEEFEA', opacity: 0.4 }

  return { backgroundColor: '#FFFFFF' }
}

const MultiValueComp = (props: MultiValueProps<Option, true>) => {
  const { data, innerProps, removeProps } = props

  return (
    <Box
      {...innerProps}
      h="24px"
      display="inline-flex"
      alignItems="center"
      gap="4px"
      bgColor="grey.2"
      rounded="6px"
      px="6px"
    >
      <Text textStyle="pre-caption-1" color="grey.8">
        {data.label}
      </Text>
      <Box as="button" {...removeProps} cursor="pointer">
        <XIcon size="12px" />
      </Box>
    </Box>
  )
}

const DropdownIndicatorComp = (props: DropdownIndicatorProps<Option, true>) => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon size="20px" />
    </components.DropdownIndicator>
  )
}

interface WeekdayMultiSelectProps {
  value?: string[]
  onChange?: (value: string[]) => void
  onBlur?: () => void
}

const WeekdayMultiSelect: React.FC<WeekdayMultiSelectProps> = ({
  value = [],
  onChange,
  onBlur,
}) => {
  const selectedValues = useMemo<MultiValue<Option>>(() => {
    return value
      .map((val) => WEEKDAY_OPTIONS.find((opt) => opt.value === val))
      .filter((opt): opt is Option => opt !== undefined)
  }, [value])

  const handleOptionChange = (option: Option) => {
    const isSelected = selectedValues.some(
      (item) => item.value === option.value,
    )

    let newSelectedValues: Option[] = []

    if (isSelected) {
      newSelectedValues = selectedValues.filter(
        (item) => item.value !== option.value,
      )
    } else {
      newSelectedValues = [...selectedValues, option]
    }

    const newValue = newSelectedValues.map((item) => item.value)
    onChange?.(newValue)
  }

  const handleChange = (newValue: MultiValue<Option>) => {
    const newValueArray = newValue.map((item) => item.value)
    onChange?.(newValueArray)
  }

  const formatOptionLabel = (option: Option) => {
    const isSelected =
      selectedValues?.some((item) => item.value === option.value) ?? false

    return (
      <Checkbox.Root
        size="sm"
        variant="solid"
        colorPalette="primary"
        checked={isSelected}
        gap="8px"
        p="10px 12px"
        data-checkbox="true"
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label textStyle="pre-body-4" color="grey.10">
          {option.label}
        </Checkbox.Label>
      </Checkbox.Root>
    )
  }

  const CustomOption = (props: OptionProps<Option, true>) => {
    const { data, innerRef, innerProps } = props

    return (
      <components.Option
        {...props}
        innerProps={{
          ...innerProps,
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            if (!(e.target instanceof HTMLElement)) return
            const isCheckboxClick =
              e.target.closest('[data-checkbox]') !== null ||
              e.target.closest('input[type="checkbox"]') !== null ||
              e.target.closest('[role="checkbox"]') !== null

            if (isCheckboxClick) {
              e.stopPropagation()
              handleOptionChange(data)
            } else {
              innerProps?.onClick?.(e)
            }
          },
        }}
      >
        <Box ref={innerRef}>{formatOptionLabel(data)}</Box>
      </components.Option>
    )
  }

  return (
    <ReactSelect
      value={selectedValues}
      onChange={handleChange}
      onBlur={onBlur}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isClearable={false}
      menuPlacement="top"
      classNamePrefix="react-select"
      name="weekdays"
      placeholder="요일 선택"
      options={WEEKDAY_OPTIONS}
      formatOptionLabel={formatOptionLabel}
      components={{
        MultiValue: MultiValueComp,
        Option: CustomOption,
        DropdownIndicator: DropdownIndicatorComp,
      }}
      styles={{
        control: (provided) => ({
          ...provided,
          border: '1px solid #EAEBEC',
          borderRadius: '10px',
          minHeight: '48px',
          boxShadow: 'none',
          width: '100%',
          ':hover': { border: '1px solid #EAEBEC' },
        }),
        container: (provided) => ({ ...provided, width: '100%' }),
        option: (provided, state) => ({
          ...provided,
          ...getStyles(state),
          padding: '0px',
          cursor: 'pointer',
          ':active': { backgroundColor: getStyles(state).backgroundColor },
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '3px 8px',
          gap: '4px',
        }),
        indicatorSeparator: () => ({ display: 'none' }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: '#9FA4A9',
          padding: '0 12px 0 8px',
          cursor: 'pointer',
          ':hover': { color: '#9FA4A9' },
        }),
        menu: (provided) => ({ ...provided, zIndex: 2000 }),
      }}
    />
  )
}

export default WeekdayMultiSelect
