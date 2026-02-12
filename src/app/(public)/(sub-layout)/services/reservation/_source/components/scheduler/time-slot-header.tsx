'use client'

import React from 'react'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { SCHEDULER_CONFIG } from '../../constants/scheduler'
import { formatTime } from '../../utils/time'

/** 30분 단위 시간 배열 생성 (00:00 ~ 24:00) */
const TIME_LABELS = Array.from({ length: 24 }, (_, i) => [
  { hour: i, minute: 0 },
  { hour: i, minute: 30 },
]).flat()

const TimeSlotHeader: React.FC = () => {
  const { COL_WIDTH, COL_HEIGHT, ROOM_COL_WIDTH, HEADER_HEIGHT } =
    SCHEDULER_CONFIG

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
          zIndex="docked"
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

        <Box display="flex">
          {TIME_LABELS.map((time, index) => (
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

export default TimeSlotHeader
