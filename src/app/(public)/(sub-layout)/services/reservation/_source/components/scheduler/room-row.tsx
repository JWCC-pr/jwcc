'use client'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { SCHEDULER_CONSTANTS } from './scheduler.constants'
import { Room } from './scheduler.types'

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  return [
    { hour: i, minute: 0 },
    { hour: i, minute: 30 },
  ]
}).flat()

interface RoomRowProps {
  room: Room
  onSlotClick?: (room: Room, startTime: string) => void
}

const RoomRow = ({ room, onSlotClick }: RoomRowProps) => {
  const { COL_WIDTH, COL_HEIGHT, ROOM_COL_WIDTH, ROW_HEIGHT } =
    SCHEDULER_CONSTANTS

  const formatTimeKey = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }

  return (
    <Box
      display="flex"
      height={`${ROW_HEIGHT}px`}
      borderBottom="1px solid"
      borderColor="border.basic.1"
    >
      <Box
        position="sticky"
        left="0"
        zIndex="1"
        display="flex"
        className="sticky-column"
        bg="common-white"
        transition="background-color 0.2s"
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
          <Text textStyle="pre-body-4" color="grey.10">
            {room.floor}
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
          <Text textStyle="pre-body-4" color="grey.10">
            {room.name}
          </Text>
        </Box>
      </Box>

      <Box display="flex" position="relative">
        {timeSlots.map((time) => {
          const timeKey = formatTimeKey(time.hour, time.minute)
          // 예약 확인 로직은 나중에 복잡해질 수 있음 (범위 체크 등)
          // 지금은 빈 컬럼으로 두기

          return (
            <Box
              key={timeKey}
              minW={`${COL_WIDTH}px`}
              minH={`${COL_HEIGHT}px`}
              p="6px 12px"
              borderRight="1px solid"
              borderColor="border.basic.1" // 연한 그리드 선
              _hover={{ bg: 'grey.50', cursor: 'pointer' }}
              onClick={() => onSlotClick?.(room, timeKey)}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default RoomRow
