'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { ArrowRightIcon } from '@phosphor-icons/react'

import { isSameDay, parseISO } from 'date-fns'
import { format } from 'date-fns/format'
import { getDay } from 'date-fns/getDay'
import { getDaysInMonth } from 'date-fns/getDaysInMonth'
import { isToday } from 'date-fns/isToday'
import { ko } from 'date-fns/locale'

import { ROUTES } from '@/constants/routes'
import type { ScheduleType } from '@/generated/apis/@types/data-contracts'
import { useScheduleListQuery } from '@/generated/apis/Schedule/Schedule.query'

import DailyScheduleList from './schedule-section/daily-schedule-list'
import MonthCalendar from './schedule-section/month-calendar'

export interface CalendarDay {
  day: number
  dayOfWeek: number
  dayName: string
  hasSchedules: boolean
  date: Date
  schedules: ScheduleType[]
  isToday: boolean
  isSunday: boolean
}

const TODAY = new Date()
const CURRENT_YEAR = TODAY.getFullYear()
const CURRENT_MONTH = TODAY.getMonth() + 1

const ScheduleSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(TODAY)

  const { data: schedules } = useScheduleListQuery({
    variables: {
      query: {
        year: CURRENT_YEAR.toString(),
        month: CURRENT_MONTH.toString(),
      },
    },
  })

  // 해당 월의 모든 날짜 정보 생성
  const calendarDays: CalendarDay[] = useMemo(() => {
    const date = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, 1)
    const daysInMonth = getDaysInMonth(date)

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      const dayDate = new Date(CURRENT_YEAR, CURRENT_MONTH - 1, day)
      /** 0=일요일, 1=월요일, ..., 6=토요일 */
      const dayOfWeek = getDay(dayDate)
      /** 월, 화, 수, 목, 금, 토, 일 */
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
  }, [schedules])

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
  }, [])

  return (
    <Box
      as="section"
      w="100%"
      maxW="1280px"
      mx="auto"
      h="100vh"
      p={['64px 20px', '64px 40px']}
      display="flex"
      flexFlow="column nowrap"
      justifyContent="center"
      alignItems="center"
      gap={['24px', '40px']}
    >
      <Box py="10px" w="full" display="flex" alignItems="center" gap="10px">
        <Text flex="1" textStyle="pre-heading-1" color="grey.10">
          본당 일정 안내
        </Text>
        <Link
          href={ROUTES.ABOUT_EVENT_SCHEDULE}
          _hover={{ textDecoration: 'none' }}
        >
          <Button variant="ghost" size="md" colorPalette="grey">
            더 보기
            <ArrowRightIcon size="20px" />
          </Button>
        </Link>
      </Box>

      <Box w="full" display="flex" flexFlow="column nowrap">
        <Text py="12px" textStyle="cat-heading-3" color="grey.10">
          {format(TODAY, 'yyyy년 MM월')}
        </Text>

        <Box
          display="flex"
          flexFlow={['column nowrap', 'row nowrap']}
          gap={['10px', '40px']}
          alignItems="flex-start"
        >
          <MonthCalendar
            calendarSectionRef={calendarSectionRef}
            calendarDays={calendarDays}
            selectedDate={selectedDate}
            onDateClick={setSelectedDate}
          />

          <DailyScheduleList
            calendarHeight={calendarHeight}
            calendarDays={calendarDays}
            selectedDate={selectedDate}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default ScheduleSection
