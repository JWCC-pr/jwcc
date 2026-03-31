import { generateCalendarDays } from '../generate-calendar-days'

describe('generateCalendarDays', () => {
  it('해당 월의 정확한 일수만큼 CalendarDay를 생성한다', () => {
    const today = new Date(2026, 2, 31) // 2026-03-31
    const days = generateCalendarDays(2026, 3, undefined, today)

    expect(days).toHaveLength(31) // 3월은 31일
    expect(days[0].day).toBe(1)
    expect(days[30].day).toBe(31)
  })

  it('today 파라미터와 동일한 날짜만 isToday가 true이다', () => {
    const today = new Date(2026, 2, 31) // 2026-03-31
    const days = generateCalendarDays(2026, 3, undefined, today)

    const todayDays = days.filter((d) => d.isToday)
    expect(todayDays).toHaveLength(1)
    expect(todayDays[0].day).toBe(31)
  })

  it('빌드 시점(3/27)이 아닌 실제 오늘(3/31)을 전달하면 31일이 isToday이다', () => {
    const buildDate = new Date(2026, 2, 27) // 빌드 시점
    const realToday = new Date(2026, 2, 31) // 실제 오늘

    const daysWithBuildDate = generateCalendarDays(2026, 3, undefined, buildDate)
    const daysWithRealToday = generateCalendarDays(
      2026,
      3,
      undefined,
      realToday,
    )

    // 빌드 시점 날짜로 생성하면 27일이 isToday
    expect(daysWithBuildDate.find((d) => d.isToday)?.day).toBe(27)
    expect(daysWithBuildDate[30].isToday).toBe(false)

    // 실제 오늘 날짜로 생성하면 31일이 isToday
    expect(daysWithRealToday.find((d) => d.isToday)?.day).toBe(31)
    expect(daysWithRealToday[26].isToday).toBe(false) // 27일은 아님
  })

  it('일요일은 isSunday가 true이다', () => {
    const today = new Date(2026, 2, 31)
    const days = generateCalendarDays(2026, 3, undefined, today)

    // 2026년 3월 1일은 일요일
    expect(days[0].isSunday).toBe(true)
    expect(days[0].dayOfWeek).toBe(0)

    // 3월 2일(월요일)은 일요일이 아님
    expect(days[1].isSunday).toBe(false)
  })

  it('스케줄이 있는 날짜는 hasSchedules가 true이다', () => {
    const today = new Date(2026, 2, 31)
    const schedules = [
      {
        id: 1,
        scheduledAt: '2026-03-15',
        title: '테스트 일정',
        startTime: '10:00:00',
        endTime: '11:00:00',
      },
    ] as any

    const days = generateCalendarDays(2026, 3, schedules, today)

    expect(days[14].hasSchedules).toBe(true) // 15일
    expect(days[14].schedules).toHaveLength(1)
    expect(days[0].hasSchedules).toBe(false) // 1일
  })

  it('같은 날짜의 스케줄은 시간순으로 정렬된다 (하루종일 일정이 먼저)', () => {
    const today = new Date(2026, 2, 31)
    const schedules = [
      {
        id: 1,
        scheduledAt: '2026-03-15',
        title: '오후 일정',
        startTime: '14:00:00',
        endTime: '15:00:00',
      },
      {
        id: 2,
        scheduledAt: '2026-03-15',
        title: '하루종일',
        startTime: null,
        endTime: null,
      },
      {
        id: 3,
        scheduledAt: '2026-03-15',
        title: '오전 일정',
        startTime: '09:00:00',
        endTime: '10:00:00',
      },
    ] as any

    const days = generateCalendarDays(2026, 3, schedules, today)
    const march15 = days[14]

    expect(march15.schedules[0].title).toBe('하루종일')
    expect(march15.schedules[1].title).toBe('오전 일정')
    expect(march15.schedules[2].title).toBe('오후 일정')
  })

  it('today가 다른 월이면 해당 월에 isToday인 날짜가 없다', () => {
    const today = new Date(2026, 3, 1) // 4월 1일
    const days = generateCalendarDays(2026, 3, undefined, today)

    expect(days.every((d) => !d.isToday)).toBe(true)
  })
})
