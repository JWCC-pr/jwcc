'use client'

import { useEffect, useMemo, useState } from 'react'

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
  startOfDay,
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
  isSelected: boolean
}

const AboutEventSchedulePage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => startOfDay(new Date()))
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => startOfDay(new Date()))

  // SSG 빌드 시점이 아닌 클라이언트의 실제 오늘 날짜를 사용
  useEffect(() => {
    const now = startOfDay(new Date())
    setCurrentMonth(now)
    setSelectedDate(now)
  }, [])

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
      const dayDate = startOfDay(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
      )
      const dayOfWeek = getDay(dayDate)
      const dayName = format(dayDate, 'EEE', { locale: ko })

      // 해당 날짜의 일정 필터링 및 시간순 정렬
      const daySchedules = (
        schedules?.filter((schedule) => {
          const scheduleDate = parseISO(schedule.scheduledAt)
          return isSameDay(scheduleDate, dayDate)
        }) || []
      ).sort((a, b) => {
        // startTime이 없는(하루종일) 일정을 앞에 배치
        if (!a.startTime && !b.startTime) return 0
        if (!a.startTime) return -1
        if (!b.startTime) return 1
        return a.startTime.localeCompare(b.startTime)
      })

      return {
        day,
        dayOfWeek,
        dayName,
        date: dayDate,
        schedules: daySchedules,
        hasSchedules: daySchedules.length > 0,
        isToday: isToday(dayDate),
        isSunday: dayOfWeek === 0,
        isSelected: selectedDate ? isSameDay(dayDate, selectedDate) : false,
      }
    })
  }, [currentMonth, schedules, selectedDate])

  // 선택된 날짜의 일정 목록
  const selectedDaySchedules = useMemo(() => {
    if (!selectedDate) return []

    const dayInfo = calendarDays.find((day) =>
      isSameDay(day.date, selectedDate),
    )
    return dayInfo?.schedules || []
  }, [selectedDate, calendarDays])

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
    setSelectedDate(null)
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(startOfDay(date))
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
        <Box display="flex" flexFlow="column nowrap">
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
            display="grid"
            gridTemplateColumns="repeat(7, 1fr)"
            gap="0"
            w="100%"
          >
            {/* 빈칸 (첫 주 시작 전) */}
            {calendarDays.length > 0 &&
              Array.from({ length: calendarDays[0].dayOfWeek }, (_, i) => (
                <Box
                  as="button"
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
                  as="button"
                  key={i}
                  aspectRatio={['1/1', '1/2', '1/1']}
                  p={['6px', '10px']}
                  display="flex"
                  flexFlow="column nowrap"
                  alignItems="center"
                  borderBottom="1px solid"
                  borderBottomColor="border.basic.1"
                  bgColor={dayInfo.isSelected ? 'background.basic.2' : 'grey.0'}
                  cursor="pointer"
                  onClick={() => handleDateClick(dayInfo.date)}
                  _hover={{
                    bgColor: 'background.basic.2',
                  }}
                  overflow="hidden"
                >
                  <Text
                    w={['18px', '28px']}
                    h={['18px', '28px']}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textStyle={['cat-caption-2', 'cat-body-3']}
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
                    w="100%"
                    display={['none', 'flex']}
                    flexFlow="column nowrap"
                    justifyContent="flex-end"
                    gap="2px"
                  >
                    {dayInfo.schedules.slice(0, 3).map((schedule) => (
                      <Box
                        key={schedule.id}
                        p="2px 6px"
                        display="flex"
                        alignItems="center"
                        gap="6px"
                        bgColor="primary.1"
                        rounded="4px"
                        minH="16px"
                      >
                        <Box
                          w="4px"
                          h="4px"
                          bgColor="primary.3"
                          rounded="full"
                          flexShrink={0}
                        />
                        <Text
                          flex="1"
                          minW="0"
                          textAlign="left"
                          textStyle="pre-caption-3"
                          color="grey.10"
                          truncate
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
                    as="button"
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
