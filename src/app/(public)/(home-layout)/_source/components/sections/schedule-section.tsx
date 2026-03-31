'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { ArrowRightIcon } from '@phosphor-icons/react'

import { format } from 'date-fns/format'

import { ROUTES } from '@/constants/routes'
import { useScheduleListQuery } from '@/generated/apis/Schedule/Schedule.query'
import { generateCalendarDays } from '@/utils/calendar/generate-calendar-days'

import DailyScheduleList from './schedule-section/daily-schedule-list'
import MonthCalendar from './schedule-section/month-calendar'

export type { CalendarDay } from '@/utils/calendar/generate-calendar-days'

const ScheduleSection: React.FC = () => {
  const [today, setToday] = useState(() => new Date())
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1

  const [selectedDate, setSelectedDate] = useState<Date>(today)

  // SSG 빌드 시점이 아닌 클라이언트의 실제 오늘 날짜를 사용
  useEffect(() => {
    const now = new Date()
    setToday(now)
    setSelectedDate(now)
  }, [])

  const { data: schedules } = useScheduleListQuery({
    variables: {
      query: {
        year: currentYear.toString(),
        month: currentMonth.toString(),
      },
    },
  })

  const calendarDays = useMemo(
    () => generateCalendarDays(currentYear, currentMonth, schedules, today),
    [schedules, currentYear, currentMonth, today],
  )

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
          href={ROUTES.NEWS_EVENT_SCHEDULE}
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
          {format(today, 'yyyy년 MM월')}
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
