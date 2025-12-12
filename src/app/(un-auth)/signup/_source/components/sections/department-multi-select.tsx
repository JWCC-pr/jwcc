'use client'

import { useState } from 'react'

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

interface GroupOption {
  label: string
  options: Option[]
}
interface Option {
  value: string
  label: string
}

// 그룹화된 옵션 데이터
const groupedOptions: GroupOption[] = [
  {
    label: '기획분과',
    options: [{ value: 'planning', label: '기획분과' }],
  },
  {
    label: '남성총구역',
    options: [{ value: 'male', label: '남성총구역' }],
  },
  {
    label: '여성총구역',
    options: [{ value: 'female', label: '여성총구역' }],
  },
  {
    label: '문화총보분과',
    options: [{ value: 'culture', label: '명도회' }],
  },
  {
    label: '선교분과',
    options: [
      { value: 'legion', label: '레지오 마리애' },
      { value: 'cell', label: '쎌기도회' },
      { value: 'age', label: '연령회' },
      { value: 'adoration', label: '성체조배회' },
    ],
  },
  {
    label: '전례분과',
    options: [
      { value: 'weekday-liturgy', label: '평일전례단' },
      { value: 'sunday-liturgy', label: '주일전례단' },
      { value: 'fatima-choir', label: '파티마성가대' },
      { value: 'bonitas', label: '보니따스 반주단' },
      { value: 'joy', label: '환희 실내악단' },
      { value: 'piat', label: '피앗 앙상블' },
      { value: 'offering', label: '헌화회' },
      { value: 'senior-choir', label: '시니어 성가대' },
      { value: 'kang', label: '강완숙회' },
    ],
  },
  {
    label: '교육분과',
    options: [
      { value: 'bible-well', label: '성서못자리' },
      { value: 'catholic-bible', label: '가톨릭 성서모임' },
      { value: 'catechumen', label: '예비자교리 봉사회' },
      { value: 'vocation', label: '성소후원회' },
      { value: 'spirit-prayer', label: '성령기도회' },
      { value: 'bookclub', label: '북클럽 성파누엘' },
      { value: 'ultreia', label: '울뜨레아' },
      { value: 'me', label: 'M.E' },
    ],
  },
  {
    label: '시설분과',
    options: [{ value: 'facility', label: '시설분과' }],
  },
  {
    label: '재정분과',
    options: [
      { value: 'sacred', label: '성물방' },
      { value: 'bookcafe', label: '북카페' },
    ],
  },
  {
    label: 'WYD분과',
    options: [{ value: 'wyd', label: 'WYD분과' }],
  },
  {
    label: '청년분과',
    options: [
      { value: 'youth-union', label: '청년연합회' },
      { value: 'paska', label: '빠스카 청년전례단' },
      { value: 'laudate', label: '라우다떼 청년 성가대' },
      { value: 'logos', label: '로고스 청년회' },
      { value: 'youth-bible', label: '청년 성서모임' },
      { value: 'youth-ultreia', label: '청년 울뜨레아' },
    ],
  },
  {
    label: '청소년분과',
    options: [
      { value: 'elementary-low', label: '초등부 저학년 주일학교' },
      { value: 'elementary-high', label: '초등부 고학년 주일학교' },
      { value: 'middle-high', label: '중고등부 주일학교' },
      { value: 'angels', label: '엔젤스 주일학교' },
      { value: 'first-communion', label: '첫영성체 교사회' },
      { value: 'elementary-server', label: '초등부 복사단' },
      { value: 'middle-server', label: '중등부 복사단' },
      { value: 'elementary-parents', label: '초등부 자모회' },
      { value: 'middle-parents', label: '중고등부 자모회' },
      { value: 'gratia-choir', label: '그라시아 어린이 성가대' },
    ],
  },
  {
    label: '생명분과',
    options: [{ value: 'jp2', label: '요한바오로회' }],
  },
  {
    label: '사회복지분과',
    options: [
      { value: 'vincent', label: '빈첸시오회' },
      { value: 'university', label: '장수대학' },
    ],
  },
  {
    label: '사목협의회',
    options: [{ value: 'pastoral', label: '사목협의회' }],
  },
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
  onSelect: (department: string[]) => void
}

const DepartmentMultiSelect: React.FC<DepartmentMultiSelectProps> = ({
  onSelect,
}) => {
  const [selectedValues, setSelectedValues] = useState<MultiValue<Option>>([])

  const handleOptionChange = (option: Option) => {
    setSelectedValues((prev) => {
      const isSelected = prev.some((item) => item.value === option.value)

      let newSelectedValues: Option[] = []

      if (isSelected) {
        newSelectedValues = prev.filter((item) => item.value !== option.value)
      } else {
        newSelectedValues = [...prev, option]
      }

      onSelect(newSelectedValues.map((item) => item.value))
      return newSelectedValues
    })
  }

  const handleChange = (newValue: MultiValue<Option>) => {
    setSelectedValues(newValue)
    onSelect(newValue.map((item) => item.value))
  }

  const formatOptionLabel = (option: Option) => {
    const isSelected =
      selectedValues?.some((item) => item.value === option.value) ?? false

    return (
      <Checkbox.Root
        size="md"
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
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isClearable={false}
      classNamePrefix="react-select"
      name="department"
      placeholder="분과 선택"
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
