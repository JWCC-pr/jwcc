import { isSameDay } from 'date-fns'

import { generateCalendarDays } from '../generate-calendar-days'

/**
 * MonthCalendar 컴포넌트의 하이라이트 로직을 시뮬레이션하는 테스트.
 *
 * MonthCalendar는 다음과 같이 동작한다:
 * 1. SSR: clientToday = null → isToday는 항상 false (하이라이트 없음)
 * 2. 클라이언트 마운트 후: clientToday = new Date() → 올바른 날짜에 하이라이트
 *
 * 이 테스트는 컴포넌트의 렌더링 로직을 순수 함수로 추출하여 검증한다.
 */

/** MonthCalendar의 isToday 계산 로직과 동일 */
function computeIsToday(
  dayDate: Date,
  clientToday: Date | null,
): boolean {
  return clientToday !== null && isSameDay(dayDate, clientToday)
}

describe('캘린더 오늘 날짜 하이라이트', () => {
  describe('SSR (빌드 시점) 시뮬레이션', () => {
    it('clientToday가 null이면 어떤 날짜도 하이라이트 되지 않는다', () => {
      const clientToday = null // SSR: useEffect 실행 전
      const buildDate = new Date(2026, 2, 27)
      const days = generateCalendarDays(2026, 3, undefined, buildDate)

      const highlightedDays = days.filter((d) =>
        computeIsToday(d.date, clientToday),
      )
      expect(highlightedDays).toHaveLength(0)
    })
  })

  describe('클라이언트 마운트 후 시뮬레이션', () => {
    it('clientToday가 3/31이면 31일만 하이라이트 된다', () => {
      const clientToday = new Date(2026, 2, 31) // useEffect 실행 후
      const buildDate = new Date(2026, 2, 27) // 빌드 시점 (calendarDays 생성에 사용)
      const days = generateCalendarDays(2026, 3, undefined, buildDate)

      const highlightedDays = days.filter((d) =>
        computeIsToday(d.date, clientToday),
      )
      expect(highlightedDays).toHaveLength(1)
      expect(highlightedDays[0].day).toBe(31)
    })

    it('빌드 시점(3/27)은 하이라이트 되지 않는다', () => {
      const clientToday = new Date(2026, 2, 31)
      const buildDate = new Date(2026, 2, 27)
      const days = generateCalendarDays(2026, 3, undefined, buildDate)

      const day27 = days.find((d) => d.day === 27)!
      expect(computeIsToday(day27.date, clientToday)).toBe(false)
    })

    it('calendarDays.isToday가 빌드 날짜여도 clientToday로 올바르게 덮어쓴다', () => {
      const buildDate = new Date(2026, 2, 27)
      const clientToday = new Date(2026, 2, 31)
      const days = generateCalendarDays(2026, 3, undefined, buildDate)

      // calendarDays의 isToday는 빌드 시점 기준 (27일이 true)
      expect(days[26].isToday).toBe(true) // day 27 (index 26)
      expect(days[30].isToday).toBe(false) // day 31 (index 30)

      // 하지만 MonthCalendar의 computeIsToday는 clientToday 기준 (31일이 true)
      expect(computeIsToday(days[26].date, clientToday)).toBe(false) // 27일: 하이라이트 X
      expect(computeIsToday(days[30].date, clientToday)).toBe(true) // 31일: 하이라이트 O
    })

    it('매월 1일에도 정확히 하이라이트 된다', () => {
      const clientToday = new Date(2026, 3, 1) // 4월 1일
      const days = generateCalendarDays(2026, 4, undefined, clientToday)

      const highlightedDays = days.filter((d) =>
        computeIsToday(d.date, clientToday),
      )
      expect(highlightedDays).toHaveLength(1)
      expect(highlightedDays[0].day).toBe(1)
    })

    it('월말에도 정확히 하이라이트 된다 (2월 28일)', () => {
      const clientToday = new Date(2026, 1, 28) // 2월 28일
      const days = generateCalendarDays(2026, 2, undefined, clientToday)

      const highlightedDays = days.filter((d) =>
        computeIsToday(d.date, clientToday),
      )
      expect(highlightedDays).toHaveLength(1)
      expect(highlightedDays[0].day).toBe(28)
    })
  })
})
