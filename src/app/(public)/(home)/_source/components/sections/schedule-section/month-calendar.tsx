'use client'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import type { CalendarDay } from '../schedule-section'

const DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const

interface MonthCalendarProps {
  calendarSectionRef: React.RefObject<HTMLDivElement | null>
  calendarDays: CalendarDay[]
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({
  calendarSectionRef,
  calendarDays,
}) => {
  return (
    <Box
      ref={calendarSectionRef}
      w="480px"
      display="flex"
      flexFlow="column nowrap"
    >
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
      <Box as="ul" display="grid" gridTemplateColumns="repeat(7, 1fr)">
        {/* 빈칸 */}
        {calendarDays.length > 0 &&
          Array.from({ length: calendarDays[0].dayOfWeek }, (_, i) => (
            <Box
              as="li"
              key={`empty-${i}`}
              aspectRatio="1/1"
              borderBottom="1px solid"
              borderBottomColor="border.basic.1"
            />
          ))}
        {/* 실제 달력 */}
        {calendarDays.map((dayInfo, i) => {
          return (
            <Box
              as="li"
              key={i}
              p="10px"
              display="flex"
              flexFlow="column nowrap"
              justifyContent="center"
              alignItems="center"
              borderBottom="1px solid"
              borderBottomColor="border.basic.1"
              aspectRatio="1/1"
              bgColor={dayInfo.hasSchedules ? 'primary.1' : 'transparent'}
            >
              <Text
                w="28px"
                aspectRatio="1/1"
                display="flex"
                justifyContent="center"
                alignItems="center"
                textStyle="cat-body-3"
                color="grey.10"
                {...(dayInfo.isSunday && { color: 'accent.red2' })}
                {...(dayInfo.isToday && {
                  bgColor: 'primary.4',
                  rounded: 'full',
                  color: 'common-white',
                })}
              >
                {dayInfo.day}
              </Text>
              <Box flex="1" display="flex" alignItems="flex-end">
                {dayInfo.hasSchedules && (
                  <Box
                    w="6px"
                    h="6px"
                    bgColor="primary.3"
                    borderRadius="full"
                  />
                )}
              </Box>
            </Box>
          )
        })}
        {/* 빈칸 */}
        {calendarDays.length > 0 &&
          Array.from(
            {
              length: 6 - calendarDays[calendarDays.length - 1].dayOfWeek,
            },
            (_, i) => (
              <Box
                as="li"
                key={`empty-end-${i}`}
                aspectRatio="1/1"
                borderBottom="1px solid"
                borderBottomColor="border.basic.1"
              />
            ),
          )}
      </Box>
    </Box>
  )
}

export default MonthCalendar
