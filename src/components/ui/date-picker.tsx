'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Box, BoxProps } from '@chakra-ui/react/box'
import { Button, IconButton } from '@chakra-ui/react/button'
import { useDisclosure } from '@chakra-ui/react/hooks'
import { Text } from '@chakra-ui/react/text'
import {
  CalendarBlankIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckIcon,
} from '@phosphor-icons/react'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

import { CCaretDownFillIcon } from '@/generated/icons/MyIcons'

const now = new Date()
now.setHours(0, 0, 0, 0) // Start of today
const currentYear = now.getFullYear()
const currentMonth = now.getMonth()

const years = Array(101)
  .fill(null)
  .map((_, index) => index + currentYear)

const DROPDOWN_OFFSET = 16

export type DatePickerPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

const getPlacementStyles = (
  placement: DatePickerPlacement,
): Record<string, string> => {
  const offset = `${DROPDOWN_OFFSET}px`
  switch (placement) {
    case 'bottom':
      return {
        top: `calc(100% + ${offset})`,
        left: '50%',
        transform: 'translateX(-50%)',
      }
    case 'bottom-start':
      return { top: `calc(100% + ${offset})`, left: '0' }
    case 'bottom-end':
      return { top: `calc(100% + ${offset})`, right: '0', left: 'auto' }
    case 'top':
      return {
        bottom: `calc(100% + ${offset})`,
        left: '50%',
        transform: 'translateX(-50%)',
        top: 'auto',
      }
    case 'top-start':
      return { bottom: `calc(100% + ${offset})`, left: '0', top: 'auto' }
    case 'top-end':
      return {
        bottom: `calc(100% + ${offset})`,
        right: '0',
        left: 'auto',
        top: 'auto',
      }
    case 'left':
      return {
        right: `calc(100% + ${offset})`,
        top: '50%',
        transform: 'translateY(-50%)',
        left: 'auto',
        bottom: 'auto',
      }
    case 'left-start':
      return {
        right: `calc(100% + ${offset})`,
        top: '0',
        left: 'auto',
        bottom: 'auto',
      }
    case 'left-end':
      return {
        right: `calc(100% + ${offset})`,
        bottom: '0',
        top: 'auto',
        left: 'auto',
      }
    case 'right':
      return {
        left: `calc(100% + ${offset})`,
        top: '50%',
        transform: 'translateY(-50%)',
        right: 'auto',
        bottom: 'auto',
      }
    case 'right-start':
      return {
        left: `calc(100% + ${offset})`,
        top: '0',
        right: 'auto',
        bottom: 'auto',
      }
    case 'right-end':
      return {
        left: `calc(100% + ${offset})`,
        bottom: '0',
        top: 'auto',
        right: 'auto',
      }
    default:
      return getPlacementStyles('bottom')
  }
}

interface DatePickerProps extends Omit<BoxProps, 'onChange'> {
  value?: Date
  onChange?: (date: Date) => void
  disabled?: boolean
  /** Select와 동일한 패턴. 펼쳐지는 방향을 지정합니다. */
  positioning?: { placement?: DatePickerPlacement }
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { value, onChange, disabled = false, positioning, ...boxProps } = props

  const placement = positioning?.placement ?? 'bottom'
  const placementStyles = getPlacementStyles(placement)

  // Single mode state
  const [internalSelectedDate, setInternalSelectedDate] = useState<Date | null>(
    null,
  )
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | undefined>(
    undefined,
  )

  const isControlled = value !== undefined

  const selectedDate =
    isControlled ? value || null : internalSelectedDate || null

  useEffect(() => {
    if (isControlled && value === undefined && internalSelectedDate !== null) {
      setInternalSelectedDate(null)
      setTempSelectedDate(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isControlled, value])

  const [userSelectedMonth, setUserSelectedMonth] = useState<Date | null>(null)

  const selectedMonth = useMemo(() => {
    let month: Date
    if (userSelectedMonth) {
      month = userSelectedMonth
    } else {
      month = selectedDate || now
    }

    if (month < now) {
      // Logic for limiting past months visual can be added here if needed
    }
    return month
  }, [userSelectedMonth, selectedDate])

  const datePickerDisclosure = useDisclosure()
  const monthDisclosure = useDisclosure()
  const yearDisclosure = useDisclosure()

  const datePickerContainerRef = useRef<HTMLDivElement>(null)
  const monthContainerRef = useRef<HTMLDivElement>(null)
  const yearContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerDisclosure.open &&
        datePickerContainerRef.current &&
        !datePickerContainerRef.current.contains(event.target as Node)
      ) {
        datePickerDisclosure.onClose()
      }
    }

    if (datePickerDisclosure.open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [datePickerDisclosure])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        monthDisclosure.open &&
        monthContainerRef.current &&
        !monthContainerRef.current.contains(event.target as Node)
      ) {
        monthDisclosure.onClose()
      }
    }

    if (monthDisclosure.open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [monthDisclosure])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        yearDisclosure.open &&
        yearContainerRef.current &&
        !yearContainerRef.current.contains(event.target as Node)
      ) {
        yearDisclosure.onClose()
      }
    }

    if (yearDisclosure.open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [yearDisclosure])

  const availableMonths = useMemo(() => {
    const selectedYear = selectedMonth.getFullYear()

    if (selectedYear === currentYear) {
      return Array(12 - currentMonth)
        .fill(null)
        .map((_, index) => currentMonth + index)
    }

    return Array(12)
      .fill(null)
      .map((_, index) => index)
  }, [selectedMonth])

  const canGoPreviousMonth = useMemo(() => {
    const prevMonth = new Date(selectedMonth)
    prevMonth.setMonth(selectedMonth.getMonth() - 1)
    return (
      prevMonth.getFullYear() > currentYear ||
      (prevMonth.getFullYear() === currentYear &&
        prevMonth.getMonth() >= currentMonth)
    )
  }, [selectedMonth])

  const canGoPreviousYear = useMemo(() => {
    return selectedMonth.getFullYear() > currentYear
  }, [selectedMonth])

  const handleMonthSelect = (monthValue: number) => {
    const newDate = new Date(selectedMonth)
    newDate.setMonth(monthValue)
    setUserSelectedMonth(newDate)
    monthDisclosure.onClose()
  }

  const handleYearSelect = (year: number) => {
    const newDate = new Date(selectedMonth)
    newDate.setFullYear(year)

    if (year === currentYear && newDate.getMonth() < currentMonth) {
      newDate.setMonth(currentMonth)
    }

    setUserSelectedMonth(newDate)
    yearDisclosure.onClose()
  }

  const handlePreviousMonth = () => {
    if (!canGoPreviousMonth) return

    const newMonth = new Date(selectedMonth)
    newMonth.setMonth(selectedMonth.getMonth() - 1)
    setUserSelectedMonth(newMonth)
  }

  const handleNextMonth = () => {
    const newMonth = new Date(selectedMonth)
    newMonth.setMonth(selectedMonth.getMonth() + 1)
    setUserSelectedMonth(newMonth)
  }

  const handlePreviousYear = () => {
    if (!canGoPreviousYear) return

    const newYear = selectedMonth.getFullYear() - 1
    if (newYear >= currentYear) {
      handleYearSelect(newYear)
    }
  }

  const handleNextYear = () => {
    handleYearSelect(selectedMonth.getFullYear() + 1)
  }

  return (
    <Box
      ref={datePickerContainerRef}
      position="relative"
      display="inline-block"
      w={boxProps.w}
      {...boxProps}
    >
      <style>{`
        .rdp-root {
          /* Local variables for colors */
          --color-grey-8: #4E5053;
          --color-grey-10: #1B1C1D;
          --color-grey-400: #9CA3AF;
          --color-primary-1: #FEEFEA;
          --color-primary-2: #F8C8C9;
          --color-primary-4: #780536;

          /* Font variables */
          --font-family: "Pretendard Variable";
          --font-size: 16px;
          --line-height: 160%;
          --letter-spacing: -0.32px;
          --font-weight-regular: 400;
          --font-weight-bold: 600;

          --rdp-accent-color: var(--color-primary-2);
          --rdp-accent-background-color: var(--color-primary-2);
          padding-inline: 13px;
        }
        
        .rdp-day {
          width: 48px;
          height: 48px;
        }

        .rdp-day_button,
        .rdp-day_button:focus,
        .rdp-day_button:active {
          align-self: center;
          justify-self: center;
          align-items: center;
          border-radius: 6px !important;
          width: 48px !important;
          height: 48px !important;
          transition: all 0.2s;
          color: var(--color-grey-10);
          text-align: center;
          
          font-family: var(--font-family);
          font-size: var(--font-size);
          font-style: normal;
          font-weight: var(--font-weight-regular);
          line-height: var(--line-height);
          letter-spacing: var(--letter-spacing);

          border: none !important;
          box-shadow: none !important;
        }
        
        /* Hover */
        .rdp-day_button:hover {
          background-color: var(--color-primary-1) !important;
          color: var(--color-grey-10);
          border-radius: 6px !important;
          font-weight: var(--font-weight-regular);
        }
        
        .rdp-focused .rdp-day_button,
        .rdp-day_button:focus-visible {
          background-color: var(--color-primary-1) !important;
          border-radius: 6px !important;
          outline: none !important;
        }
        
        /* 3. Selected (Temp) */
        .rdp-selected .rdp-day_button,
        .rdp-selected .rdp-day_button:hover {
          background-color: var(--color-primary-2) !important; /* #F8C8C9 */
          color: var(--color-grey-10);
          border-radius: 6px !important;
          font-weight: var(--font-weight-bold);
        }
        
        /* 5. Today (Default) - Always applied unless selected */
        .rdp-today .rdp-day_button {
          font-weight: var(--font-weight-regular);
          background-color: var(--color-primary-1) !important; /* #FEEFEA */
          border: 1px solid var(--color-primary-4) !important; /* #780536 */
          color: var(--color-grey-10);
          border-radius: 6px !important;
        }
        
        /* 6. Today + Selected */
        .rdp-today.rdp-selected .rdp-day_button,
        .rdp-today.rdp-selected .rdp-day_button:hover {
          background-color: var(--color-primary-2) !important; /* #F8C8C9 */
          border: 1px solid var(--color-primary-4) !important; /* #780536 */
          color: var(--color-grey-10);
          border-radius: 6px !important;
          font-weight: var(--font-weight-bold);
        }
        
        .rdp-outside {
          color: var(--color-grey-400);
          opacity: 0.5;
        }
        
        /* 1. disabled 시 (pre-body-4) */
        .rdp-disabled,
        .rdp-disabled .rdp-day_button,
        .rdp-disabled:hover,
        .rdp-disabled .rdp-day_button:hover {
          background-color: transparent !important;
          color: var(--color-grey-8) !important;
          opacity: 1 !important;
          cursor: not-allowed !important;
          font-weight: var(--font-weight-regular) !important;
          border: none !important;
        }
        
        .rdp-weekday {
          font-weight: 600;
          font-size: var(--chakra-font-sizes-sm);
          color: var(--chakra-colors-gray-600);
        }
        
        .rdp-month_caption {
          display: none;
        }
        
        .rdp-nav {
          display: none;
        }
      `}</style>

      <IconButton
        size="md"
        variant="outline"
        colorPalette="grey"
        onClick={() => {
          if (disabled) return
          // Trigger click logic
          // Reset temp date to current selected or undefined
          setTempSelectedDate(selectedDate || undefined)

          // Reset viewed month
          let monthToUse = selectedDate || now
          if (monthToUse < now) {
            monthToUse = now
          }
          setUserSelectedMonth(monthToUse)

          datePickerDisclosure.onToggle()
        }}
        disabled={disabled}
      >
        <CalendarBlankIcon size="20px" />
      </IconButton>

      {datePickerDisclosure.open && (
        <Box
          rounded="16px"
          boxShadow="0 20px 80px 0 rgba(27, 28, 29, 0.04), 0 4px 10px 0 rgba(27, 28, 29, 0.04)"
          bg="common-white"
          w="386px"
          position="absolute"
          zIndex={10}
          {...placementStyles}
        >
          <Box
            h="64px"
            px="12px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box position="relative" ref={monthContainerRef}>
              <Box display="flex" alignItems="center">
                <Box
                  w="48px"
                  h="48px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor={canGoPreviousMonth ? 'pointer' : 'not-allowed'}
                  rounded="md"
                  _hover={canGoPreviousMonth ? { bg: 'grey.100' } : {}}
                  onClick={handlePreviousMonth}
                  opacity={canGoPreviousMonth ? 1 : 0.3}
                  transition="all 0.2s"
                >
                  <CaretLeftIcon
                    size="18px"
                    color={
                      canGoPreviousMonth ? undefined : (
                        'var(--chakra-colors-grey-400)'
                      )
                    }
                  />
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="6px"
                  p="10px 4px 10px 8px"
                  onClick={monthDisclosure.onToggle}
                  textStyle="pre-body-5"
                  color="grey.9"
                  cursor="pointer"
                  _hover={{ bg: 'gray.50' }}
                  rounded="md"
                >
                  {selectedMonth.getMonth() + 1}월
                  <CCaretDownFillIcon w="12px" h="12px" />
                </Box>

                <Box
                  w="48px"
                  h="48px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  px="4px"
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: 'grey.100' }}
                  onClick={handleNextMonth}
                  transition="all 0.2s"
                >
                  <CaretRightIcon size={18} />
                </Box>
              </Box>

              {monthDisclosure.open && (
                <Box
                  position="absolute"
                  top="100%"
                  left="0"
                  right="0"
                  bg="common-white"
                  rounded="16px"
                  boxShadow="0 20px 80px 0 rgba(27, 28, 29, 0.04), 0 4px 10px 0 rgba(27, 28, 29, 0.04);"
                  maxH="300px"
                  overflowY="auto"
                  zIndex={10}
                >
                  {availableMonths.map((month) => {
                    const isSelected = selectedMonth.getMonth() === month

                    return (
                      <Box
                        key={month}
                        px={5}
                        py={3}
                        cursor="pointer"
                        bg={isSelected ? 'primary.1' : 'common-white'}
                        color={isSelected ? 'grey.10' : 'grey.8'}
                        textStyle={isSelected ? 'pre-body-3' : 'pre-body-4'}
                        onClick={() => handleMonthSelect(month)}
                        transition="all 0.2s"
                        display="flex"
                        alignItems="center"
                        gap="16px"
                        p="4px 16px"
                        h="48px"
                      >
                        {isSelected ?
                          <CheckIcon
                            size="20px"
                            color="var(--chakra-colors-primary-4)"
                          />
                        : <Box w="20px" h="20px" />}
                        <Text>{month + 1}월</Text>
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>

            {/* 연도 선택 영역 */}
            <Box position="relative" ref={yearContainerRef}>
              <Box display="flex" alignItems="center">
                {/* 이전 연도 버튼 */}
                <Box
                  w="48px"
                  h="48px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  px="4px"
                  cursor={canGoPreviousYear ? 'pointer' : 'not-allowed'}
                  rounded="md"
                  _hover={canGoPreviousYear ? { bg: 'grey.100' } : {}}
                  onClick={handlePreviousYear}
                  opacity={canGoPreviousYear ? 1 : 0.3}
                  transition="all 0.2s"
                >
                  <CaretLeftIcon
                    size={18}
                    color={
                      canGoPreviousYear ? undefined : (
                        'var(--chakra-colors-grey-400)'
                      )
                    }
                  />
                </Box>

                {/* 연도 드롭다운 */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap="6px"
                  p="10px 4px 10px 8px"
                  onClick={yearDisclosure.onToggle}
                  textStyle="pre-body-5"
                  color="grey.9"
                  cursor="pointer"
                  _hover={{ bg: 'gray.50' }}
                  rounded="md"
                >
                  {selectedMonth.getFullYear()}년
                  <CCaretDownFillIcon w="12px" h="12px" />
                </Box>

                {/* 다음 연도 버튼 */}
                <Box
                  w="48px"
                  h="48px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  px="4px"
                  cursor="pointer"
                  rounded="md"
                  _hover={{ bg: 'grey.100' }}
                  onClick={handleNextYear}
                  transition="all 0.2s"
                >
                  <CaretRightIcon size={18} />
                </Box>
              </Box>

              {/* 연도 선택 드롭다운 메뉴 */}
              {yearDisclosure.open && (
                <Box
                  position="absolute"
                  top="100%"
                  left={0}
                  right={0}
                  mt={2}
                  bg="white"
                  rounded="16px"
                  boxShadow="0 20px 80px 0 rgba(27, 28, 29, 0.04), 0 4px 10px 0 rgba(27, 28, 29, 0.04);"
                  maxH="300px"
                  overflowY="auto"
                  zIndex={10}
                >
                  {years.map((year) => {
                    const isSelected = selectedMonth.getFullYear() === year

                    return (
                      <Box
                        key={year}
                        cursor="pointer"
                        bg={isSelected ? 'primary.1' : 'common-white'}
                        color={isSelected ? 'grey.10' : 'grey.8'}
                        textStyle={isSelected ? 'pre-body-3' : 'pre-body-4'}
                        onClick={() => handleYearSelect(year)}
                        transition="all 0.2s"
                        display="flex"
                        alignItems="center"
                        gap="16px"
                        p="4px 16px"
                        h="48px"
                      >
                        {isSelected ?
                          <CheckIcon
                            size="20px"
                            color="var(--chakra-colors-primary-4)"
                          />
                        : <Box w="20px" h="20px" />}
                        <Text>{year}</Text>
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>
          </Box>

          <Box p="0 12px 8px">
            <DayPicker
              mode="single"
              selected={tempSelectedDate}
              onSelect={setTempSelectedDate}
              month={selectedMonth}
              onMonthChange={(month) => {
                setUserSelectedMonth(month)
              }}
              disabled={{
                before: now,
              }}
              showOutsideDays
              formatters={{
                formatWeekdayName: (date: Date) => {
                  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                  return days[date.getDay()]
                },
              }}
            />
          </Box>

          <Box p="8px 12px" display="flex" justifyContent="flex-end" gap="8px">
            <Button
              size="md"
              variant="solid"
              colorPalette="grey"
              onClick={() => {
                setTempSelectedDate(undefined)
                datePickerDisclosure.onClose()
              }}
            >
              취소
            </Button>
            <Button
              size="md"
              variant="solid"
              colorPalette="primary"
              onClick={() => {
                if (!tempSelectedDate) return

                if (!isControlled) {
                  setInternalSelectedDate(tempSelectedDate)
                }

                datePickerDisclosure.onClose()
                onChange?.(tempSelectedDate)
              }}
            >
              적용
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default DatePicker
