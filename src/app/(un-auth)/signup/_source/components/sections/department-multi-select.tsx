'use client'

import { useMemo } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { Text } from '@chakra-ui/react/text'
import { CaretDownIcon, XIcon } from '@phosphor-icons/react'

import ReactSelect, {
  type DropdownIndicatorProps,
  type GroupHeadingProps,
  type MultiValue,
  type MultiValueProps,
  type OptionProps,
  components,
} from 'react-select'

import { useDepartmentListQuery } from '@/generated/apis/Department/Department.query'

interface GroupOption {
  label: string
  options: Option[]
}
interface Option {
  value: string
  label: string
}

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

/** 그룹 라벨 커스텀 컴포넌트 */
const GroupHeading = (props: GroupHeadingProps<Option, true>) => {
  return (
    <components.GroupHeading {...props}>
      <Text textStyle="pre-caption-2" color="grey.5">
        {props.children}
      </Text>
    </components.GroupHeading>
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

interface DepartmentMultiSelectProps {
  /** 선택된 값 (string[]) */
  value?: string[]
  /** 값 변경 핸들러 */
  onChange?: (value: string[]) => void
  /** blur 핸들러 */
  onBlur?: () => void
  /** 기존 onSelect prop (하위 호환성) */
  onSelect?: (department: string[]) => void
}

const DepartmentMultiSelect: React.FC<DepartmentMultiSelectProps> = ({
  value = [],
  onChange,
  onBlur,
  onSelect,
}) => {
  const { data: departmentList = [] } = useDepartmentListQuery()

  // departmentList를 groupedOptions 형태로 변환
  const groupedOptions = useMemo<GroupOption[]>(() => {
    if (!Array.isArray(departmentList)) return []

    return departmentList.map((department) => ({
      label: department.name,
      options: department.subDepartmentSet.map((subDepartment) => ({
        value: subDepartment.id.toString(),
        label: subDepartment.name,
      })),
    }))
  }, [departmentList])

  // 모든 옵션을 평탄화하여 value로 Option을 찾을 수 있도록 함
  const allOptions = useMemo(() => {
    return groupedOptions.flatMap((group) => group.options)
  }, [groupedOptions])

  // string[]을 MultiValue<Option>으로 변환
  const selectedValues = useMemo<MultiValue<Option>>(() => {
    return value
      .map((val) => allOptions.find((opt) => opt.value === val))
      .filter((opt): opt is Option => opt !== undefined)
  }, [value, allOptions])

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
    onSelect?.(newValue)
  }

  const handleChange = (newValue: MultiValue<Option>) => {
    const newValueArray = newValue.map((item) => item.value)
    onChange?.(newValueArray)
    onSelect?.(newValueArray)
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
      classNamePrefix="react-select"
      name="department"
      placeholder="단체 선택"
      options={groupedOptions}
      formatOptionLabel={formatOptionLabel}
      components={{
        MultiValue,
        GroupHeading,
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
      }}
    />
  )
}

export default DepartmentMultiSelect
