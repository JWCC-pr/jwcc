'use client'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { formatTime } from '../../utils/format-time'
import { SCHEDULER_CONSTANTS } from './scheduler.constants'

/** 30분 단위 시간 배열 생성 (00:00 ~ 24:00) */
const timeLabels = Array.from({ length: 24 }, (_, i) => {
  return [
    {
      hour: i,
      minute: 0,
    },
    {
      hour: i,
      minute: 30,
    },
  ]
}).flat()

const SchedulerHeader: React.FC = () => {
  const { COL_WIDTH, COL_HEIGHT, ROOM_COL_WIDTH, HEADER_HEIGHT } =
    SCHEDULER_CONSTANTS

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1"
      borderBottom="1px solid"
      borderColor="border.basic.1"
      height={`${HEADER_HEIGHT}px`}
      minW="fit-content"
    >
      <Box height="100%" display="flex">
        <Box
          position="sticky"
          left={0}
          zIndex={40}
          bg="common-white"
          display="flex"
        >
          <Box
            minW={`${COL_WIDTH}px`}
            minH={`${COL_HEIGHT}px`}
            p="6px 12px"
            display="flex"
            alignItems="center"
            borderRight="1px solid"
            borderColor="border.basic.1"
          >
            <Text textStyle="pre-caption-1" color="grey.9">
              층
            </Text>
          </Box>
          <Box
            minW={`${ROOM_COL_WIDTH}px`}
            minH={`${COL_HEIGHT}px`}
            p="6px 12px"
            display="flex"
            alignItems="center"
            borderRight="1px solid"
            borderColor="border.basic.1"
          >
            <Text textStyle="pre-caption-1" color="grey.9">
              교리실명
            </Text>
          </Box>
        </Box>

        {/* Scrollable Time Labels */}
        <Box display="flex">
          {timeLabels.map((time, index) => (
            <Box
              key={index}
              minW={`${COL_WIDTH}px`}
              minH={`${COL_HEIGHT}px`}
              p="6px 12px"
              display="flex"
              alignItems="center"
              borderRight="1px solid"
              borderColor="border.basic.1"
            >
              <Text textStyle="pre-caption-1" color="grey.8">
                {formatTime(time.hour, time.minute)}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default SchedulerHeader
