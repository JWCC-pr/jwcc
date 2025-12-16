'use client'

import { Badge } from '@chakra-ui/react/badge'
import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import type { CalendarDay } from '../schedule-section'

interface DailyScheduleListProps {
  calendarHeight: number
  calendarDays: CalendarDay[]
}

const DailyScheduleList: React.FC<DailyScheduleListProps> = ({
  calendarHeight,
  calendarDays,
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
        {calendarDays
          .filter((dayInfo) => dayInfo.hasSchedules)
          .map((dayInfo, i) => {
            const schedule = dayInfo.schedules[0]

            return (
              <Box
                as="li"
                key={i}
                p="16px 12px"
                display="flex"
                gap="12px"
                borderBottom="1px solid"
                borderBottomColor="border.basic.1"
              >
                <Text w="36px" textStyle="pre-body-5" color="primary.4">
                  {format(dayInfo.date, 'yy.d')}
                </Text>
                <Box display="flex" flexFlow="column nowrap" gap="8px">
                  <Text textStyle="pre-body-6" color="grey.10">
                    {schedule.content}
                  </Text>
                  <Badge size="md" variant="subtle" colorPalette="grey">
                    {schedule.startTime}~{schedule.endTime}
                  </Badge>
                </Box>
              </Box>
            )
          })}
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
