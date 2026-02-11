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
  { label: '월', value: 'monday' },
  { label: '화', value: 'tuesday' },
  { label: '수', value: 'wednesday' },
  { label: '목', value: 'thursday' },
  { label: '금', value: 'friday' },
  { label: '토', value: 'saturday' },
  { label: '일', value: 'sunday' },
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

// input 필드 내부의 선택된 항목에 표시될 커스텀 컴포넌트
const MultiValue = (props: MultiValueProps<Option, true>) => {
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

/** 드롭다운 화살표 커스텀 컴포넌트 */
const DropdownIndicator = (props: DropdownIndicatorProps<Option, true>) => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon size="20px" />
    </components.DropdownIndicator>
  )
}

interface WeekdayMultiSelectProps {
  /** 선택된 값 (string[]) */
  value?: string[]
  /** 값 변경 핸들러 */
  onChange?: (value: string[]) => void
  /** blur 핸들러 */
  onBlur?: () => void
}

const WeekdayMultiSelect: React.FC<WeekdayMultiSelectProps> = ({
  value = [],
  onChange,
  onBlur,
}) => {
  // string[]을 MultiValue<Option>으로 변환
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

  // 커스텀 Option 컴포넌트 - 체크박스 클릭 시 메뉴가 닫히지 않도록 처리
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

            // 체크박스 클릭 시에는 직접 처리하고 기본 옵션 클릭은 방지
            if (isCheckboxClick) {
              e.stopPropagation()
              handleOptionChange(data)
            }
            // 체크박스가 아닌 영역 클릭 시에는 기본 동작 유지
            else {
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
        MultiValue,
        Option: CustomOption,
        DropdownIndicator,
      }}
      styles={{
        // control 커스텀
        control: (provided) => ({
          ...provided,
          border: '1px solid #EAEBEC',
          borderRadius: '10px',
          minHeight: '48px',
          boxShadow: 'none',
          width: '100%',
          ':hover': {
            border: '1px solid #EAEBEC',
          },
        }),
        // container 커스텀 (전체 너비 설정)
        container: (provided) => ({
          ...provided,
          width: '100%',
        }),
        // option 커스텀
        option: (provided, state) => ({
          ...provided,
          ...getStyles(state),
          padding: '0px',
          cursor: 'pointer',
          ':active': {
            backgroundColor: getStyles(state).backgroundColor,
          },
        }),
        // 선택한 요소들이 표시되는 컨테이너 커스텀
        valueContainer: (provided) => ({
          ...provided,
          padding: '3px 8px',
          gap: '4px',
        }),
        // 구분선 커스텀
        indicatorSeparator: () => ({
          display: 'none',
        }),
        // 드롭다운 화살표 커스텀 (hover 애니메이션 제거)
        dropdownIndicator: (provided) => ({
          ...provided,
          color: '#9FA4A9',
          padding: '0 12px 0 8px',
          cursor: 'pointer',
          ':hover': {
            color: '#9FA4A9', // hover 시에도 색상 변경 없음
          },
        }),
        // 메뉴 z-index 설정
        menu: (provided) => ({
          ...provided,
          zIndex: 2000,
        }),
      }}
    />
  )
}

export default WeekdayMultiSelect
