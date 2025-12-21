'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Badge } from '@chakra-ui/react/badge'
import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { keepPreviousData } from '@tanstack/react-query'

import {
  addMonths,
  isSameDay,
  parseISO,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { format } from 'date-fns/format'
import { getDay } from 'date-fns/getDay'
import { getDaysInMonth } from 'date-fns/getDaysInMonth'
import { isToday } from 'date-fns/isToday'
import { ko } from 'date-fns/locale'

import type { ScheduleType } from '@/generated/apis/@types/data-contracts'
import { useScheduleListQuery } from '@/generated/apis/Schedule/Schedule.query'
import { AboutEventScheduleCDoveIcon } from '@/generated/icons/MyIcons'

const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const

interface CalendarDay {
  day: number
  dayOfWeek: number
  dayName: string
  hasSchedules: boolean
  date: Date
  schedules: ScheduleType[]
  isToday: boolean
  isSunday: boolean
}

const NOW = new Date()

const AboutEventSchedulePage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(NOW)
  const [selectedDate, setSelectedDate] = useState<Date | null>(NOW)

  const year = currentMonth.getFullYear().toString()
  const month = (currentMonth.getMonth() + 1).toString()

  const { data: schedules } = useScheduleListQuery({
    variables: { query: { year, month } },
    options: {
      placeholderData: keepPreviousData,
    },
  })

  // 해당 월의 모든 날짜 정보 생성
  const calendarDays: CalendarDay[] = useMemo(() => {
    const date = startOfMonth(currentMonth)
    const daysInMonth = getDaysInMonth(date)

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      const dayDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
      )
      const dayOfWeek = getDay(dayDate)
      const dayName = format(dayDate, 'EEE', { locale: ko })

      // 해당 날짜의 일정 필터링
      const daySchedules =
        schedules?.filter((schedule) => {
          const scheduleDate = parseISO(schedule.scheduledAt)
          return isSameDay(scheduleDate, dayDate)
        }) || []

      return {
        day,
        dayOfWeek,
        dayName,
        date: dayDate,
        schedules: daySchedules,
        hasSchedules: daySchedules.length > 0,
        isToday: isToday(dayDate),
        isSunday: dayOfWeek === 0,
      }
    })
  }, [currentMonth, schedules])

  // 선택된 날짜의 일정 목록
  const selectedDaySchedules = useMemo(() => {
    if (!selectedDate) return []
    const dayInfo = calendarDays.find((day) =>
      isSameDay(day.date, selectedDate),
    )
    return dayInfo?.schedules || []
  }, [selectedDate, calendarDays])

  const calendarSectionRef = useRef<HTMLDivElement>(null)
  const [calendarHeight, setCalendarHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      if (!calendarSectionRef.current) return
      setCalendarHeight(calendarSectionRef.current.offsetHeight)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [calendarDays])

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
    setSelectedDate(null)
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  // FIXME: 스켈레톤 UI, 빈 데이터 UI 추가
  if (!schedules) return null

  return (
    <Box display="flex" flexDirection="column">
      {/* 월 이동 헤더 */}
      <Box display="flex" alignItems="center" gap="4px" py="12px">
        <IconButton
          variant="ghost"
          size="md"
          colorPalette="grey"
          onClick={handlePrevMonth}
        >
          <CaretLeftIcon size="20px" />
        </IconButton>
        <Text textStyle="cat-heading-2" color="grey.10">
          {format(currentMonth, 'yyyy년 MM월', { locale: ko })}
        </Text>
        <IconButton
          variant="ghost"
          size="md"
          colorPalette="grey"
          onClick={handleNextMonth}
        >
          <CaretRightIcon size="20px" />
        </IconButton>
      </Box>

      {/* 캘린더 & 상세 일정 목록 */}
      <Box display="flex" flexFlow="column nowrap" gap="40px">
        {/* 캘린더 */}
        <Box ref={calendarSectionRef} display="flex" flexFlow="column nowrap">
          {/* 요일 헤더 */}
          <Box position="relative" display="flex">
            {DAYS.map((day) => {
              const isSunday = day === '일'

              return (
                <Text
                  key={day}
                  flex="1"
                  p="4px 6px"
                  textStyle="pre-caption-3"
                  color={isSunday ? 'primary.4' : 'grey.10'}
                  textAlign="center"
                >
                  {day}
                </Text>
              )
            })}
            <Box
              position="absolute"
              bottom="0"
              w="full"
              h="1.5px"
              bgColor="grey.10"
            />
          </Box>

          {/* 캘린더 그리드 */}
          <Box
            as="ul"
            display="grid"
            gridTemplateColumns="repeat(7, 1fr)"
            gap="0"
            w="100%"
          >
            {/* 빈칸 (첫 주 시작 전) */}
            {calendarDays.length > 0 &&
              Array.from({ length: calendarDays[0].dayOfWeek }, (_, i) => (
                <Box
                  as="li"
                  key={`empty-${i}`}
                  aspectRatio={['1/1', '1/2', '1/1']}
                  borderBottom="1px solid"
                  borderBottomColor="border.basic.1"
                />
              ))}

            {/* 실제 달력 날짜 */}
            {calendarDays.map((dayInfo, i) => {
              const hasFourOrMoreSchedules = dayInfo.schedules.length >= 4
              const moreSchedulesCount = dayInfo.schedules.length - 3

              return (
                <Box
                  as="li"
                  key={i}
                  aspectRatio={['1/1', '1/2', '1/1']}
                  p={['6px', '10px']}
                  display="flex"
                  flexFlow="column nowrap"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom="1px solid"
                  borderBottomColor="border.basic.1"
                  bgColor="grey.0"
                  cursor="pointer"
                  onClick={() => handleDateClick(dayInfo.date)}
                  _hover={{
                    bgColor: 'background.basic.2',
                  }}
                  overflow="hidden"
                >
                  <Text
                    w="28px"
                    h="28px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textStyle="cat-body-3"
                    color="grey.10"
                    flexShrink={0}
                    {...(dayInfo.isSunday && { color: 'accent.red2' })}
                    {...(dayInfo.isToday && {
                      bgColor: 'primary.4',
                      rounded: 'full',
                      color: 'common-white',
                    })}
                  >
                    {dayInfo.day}
                  </Text>

                  <Box
                    flex="1"
                    w="100%"
                    display={['none', 'flex']}
                    flexFlow="column nowrap"
                    justifyContent="flex-end"
                    gap="2px"
                  >
                    {dayInfo.schedules.slice(0, 3).map((schedule) => (
                      <Box
                        key={schedule.id}
                        p="1px 4px"
                        display="flex"
                        alignItems="center"
                        gap="4px"
                        bgColor="primary.1"
                        rounded="2px"
                        minH="16px"
                      >
                        <Box
                          w="3px"
                          h="3px"
                          bgColor="primary.3"
                          rounded="full"
                          flexShrink={0}
                        />
                        <Text
                          textStyle="pre-caption-3"
                          color="grey.10"
                          lineClamp="1"
                          fontSize="10px"
                        >
                          {schedule.title}
                        </Text>
                      </Box>
                    ))}

                    {hasFourOrMoreSchedules && (
                      <Text
                        p="2px 6px"
                        textStyle="pre-caption-3"
                        color="grey.8"
                        fontSize="10px"
                      >
                        더보기 ({moreSchedulesCount}개)
                      </Text>
                    )}
                  </Box>

                  <Box display={['flex', 'none']} justifyContent="flex-end">
                    {dayInfo.schedules.length > 0 && (
                      <Box w="4px" h="4px" bgColor="primary.3" rounded="full" />
                    )}
                  </Box>
                </Box>
              )
            })}

            {/* 빈칸 (마지막 주 끝난 후) */}
            {calendarDays.length > 0 &&
              Array.from(
                {
                  length: 6 - calendarDays[calendarDays.length - 1].dayOfWeek,
                },
                (_, i) => (
                  <Box
                    as="li"
                    key={`empty-end-${i}`}
                    aspectRatio={['1/1', '1/2', '1/1']}
                    borderBottom="1px solid"
                    borderBottomColor="border.basic.1"
                  />
                ),
              )}
          </Box>
        </Box>

        {/* 선택된 날짜의 상세 일정 목록 */}
        <Box
          position="relative"
          flex="1"
          pt="24px"
          display="flex"
          flexFlow="column nowrap"
          h={calendarHeight ? `${calendarHeight}px` : 'auto'}
          overflow="hidden"
        >
          <Box w="full" h="1.5px" bgColor="grey.10" flexShrink={0} />
          <Box
            as="ul"
            flex="1"
            display="flex"
            flexFlow="column nowrap"
            overflowY="auto"
          >
            {selectedDaySchedules.length > 0 ?
              selectedDaySchedules.map((schedule) => (
                <Box
                  as="li"
                  key={schedule.id}
                  p="16px 12px"
                  display="flex"
                  gap="12px"
                  borderBottom="1px solid"
                  borderBottomColor="border.basic.1"
                >
                  <Text w="36px" textStyle="pre-body-5" color="primary.4">
                    {format(parseISO(schedule.scheduledAt), 'M.d')}
                  </Text>
                  <Box
                    display="flex"
                    flexFlow="column nowrap"
                    gap="8px"
                    flex="1"
                  >
                    <Text textStyle="pre-body-6" color="grey.10">
                      {schedule.title}
                    </Text>
                    <Box display="flex" gap="8px" alignItems="center">
                      {schedule.startTime && schedule.endTime ?
                        <Badge size="md" variant="subtle" colorPalette="grey">
                          {schedule.startTime.slice(0, 5)}~
                          {schedule.endTime.slice(0, 5)}
                        </Badge>
                      : <Badge size="md" variant="subtle" colorPalette="grey">
                          하루종일
                        </Badge>
                      }
                      {schedule.location && (
                        <Badge size="md" variant="subtle" colorPalette="grey">
                          {schedule.location}
                        </Badge>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))
            : <Box
                p="36px 12px"
                display="flex"
                flexFlow="column nowrap"
                gap="10px"
                justifyContent="center"
                alignItems="center"
                borderBottom="1px solid"
                borderBottomColor="border.basic.1"
              >
                <AboutEventScheduleCDoveIcon w="64px" h="64px" />
                <Text textStyle="pre-body-6" color="grey.6">
                  등록된 일정이 없습니다.
                </Text>
              </Box>
            }
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AboutEventSchedulePage
