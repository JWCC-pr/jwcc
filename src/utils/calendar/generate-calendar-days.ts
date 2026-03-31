import { isSameDay, parseISO } from 'date-fns'
import { format } from 'date-fns/format'
import { getDay } from 'date-fns/getDay'
import { getDaysInMonth } from 'date-fns/getDaysInMonth'
import { ko } from 'date-fns/locale'

import type { ScheduleType } from '@/generated/apis/@types/data-contracts'

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

/**
 * 해당 월의 모든 날짜 정보를 생성하는 순수 함수.
 * `today` 파라미터를 통해 오늘 날짜를 외부에서 주입받아 SSG 빌드 시점 고정 문제를 방지한다.
 */
export function generateCalendarDays(
  year: number,
  month: number,
  schedules: ScheduleType[] | undefined,
  today: Date,
): CalendarDay[] {
  const date = new Date(year, month - 1, 1)
  const daysInMonth = getDaysInMonth(date)

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1
    const dayDate = new Date(year, month - 1, day)
    const dayOfWeek = getDay(dayDate)
    const dayName = format(dayDate, 'EEE', { locale: ko })

    const daySchedules = (
      schedules?.filter((schedule) => {
        const scheduleDate = parseISO(schedule.scheduledAt)
        return isSameDay(scheduleDate, dayDate)
      }) || []
    ).sort((a, b) => {
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
      isToday: isSameDay(dayDate, today),
      isSunday: dayOfWeek === 0,
    }
  })
}
