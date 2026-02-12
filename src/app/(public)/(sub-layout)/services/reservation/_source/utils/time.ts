import { addMinutes, differenceInMinutes, format, parse } from 'date-fns'

/**
 * 시간 문자열(HH:mm:ss)에서 초단위를 제외한 HH:mm 형식을 반환합니다.
 */
export const formatTimeWithoutSeconds = (timeStr: string) => {
  return timeStr.slice(0, 5)
}

/**
 * 시간 문자열(HH:mm)에 특정 분을 더하여 반환합니다.
 */
export const addMinutesToTimeStr = (timeStr: string, minutes: number) => {
  if (!timeStr || timeStr.length < 5) return timeStr

  try {
    const date = parse(timeStr.slice(0, 5), 'HH:mm', new Date())
    if (isNaN(date.getTime())) return timeStr
    return format(addMinutes(date, minutes), 'HH:mm')
  } catch (error) {
    console.error('addMinutesToTimeStr error:', error)
    return timeStr
  }
}

/**
 * 시작 시간과 종료 시간 사이의 기간을 'n시간' 단위로 계산하여 반환합니다.
 * 30분 단위는 0.5로 표시됩니다.
 */
export const calculateReservationDuration = (
  startAt: string,
  endAt: string,
) => {
  const start = parse(
    startAt,
    startAt.length === 5 ? 'HH:mm' : 'HH:mm:ss',
    new Date(),
  )
  const end = parse(
    endAt,
    endAt.length === 5 ? 'HH:mm' : 'HH:mm:ss',
    new Date(),
  )

  const diffMinutes = differenceInMinutes(end, start)
  const diffHours = diffMinutes / 60

  return `${diffHours}시간`
}

/**
 * 시간 정보를 기반으로 고유한 키를 생성합니다. (HH:mm 형식)
 */
export const formatTimeKey = (hour: number, minute: number) => {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}

/**
 * 시간 정보를 기반으로 레이블용 시간 문자열을 생성합니다. (formatTimeKey와 동일하지만 명칭상 구분)
 */
export const formatTime = (hour: number, minute: number) => {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}
