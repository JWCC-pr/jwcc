'use client'

import { Badge } from '@chakra-ui/react/badge'
import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { isSameDay } from 'date-fns'
import { format } from 'date-fns/format'

import type { CalendarDay } from '../schedule-section'

interface DailyScheduleListProps {
  calendarHeight: number
  calendarDays: CalendarDay[]
  selectedDate: Date
}

const DailyScheduleList: React.FC<DailyScheduleListProps> = ({
  calendarHeight,
  calendarDays,
  selectedDate,
}) => {
  return (
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
        {(() => {
          const selectedDayInfo = calendarDays.find((dayInfo) =>
            isSameDay(dayInfo.date, selectedDate),
          )

          if (!selectedDayInfo || !selectedDayInfo.hasSchedules) {
            return (
              <Box
                p="24px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flex="1"
              >
                <Text textStyle="pre-body-5" color="grey.7">
                  해당 날짜에 일정이 없습니다.
                </Text>
              </Box>
            )
          }

          return selectedDayInfo.schedules.map((schedule, i) => (
            <Box
              as="li"
              key={schedule.id || i}
              p="16px 12px"
              display="flex"
              gap="12px"
              borderBottom="1px solid"
              borderBottomColor="border.basic.1"
            >
              <Text w="36px" textStyle="pre-body-5" color="primary.4">
                {format(selectedDayInfo.date, 'M.d')}
              </Text>
              <Box display="flex" flexFlow="column nowrap" gap="8px">
                <Text textStyle="pre-body-6" color="grey.10">
                  {schedule.title}
                </Text>

                <Badge size="md" variant="subtle" colorPalette="grey">
                  {schedule.startTime && schedule.endTime ?
                    `${schedule.startTime.slice(0, 5)}~${schedule.endTime.slice(0, 5)}`
                  : '하루종일'}
                </Badge>
              </Box>
            </Box>
          ))
        })()}
      </Box>

      <Box
        position="absolute"
        bottom="0"
        w="full"
        h="60px"
        bg="linear-gradient(0deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)"
        display="flex"
        alignItems="flex-end"
      >
        <Box w="full" h="1px" bgColor="border.basic.1" />
      </Box>
    </Box>
  )
}

export default DailyScheduleList
