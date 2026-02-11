'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import RoomReservationDialog from './room-reservation-dialog/room-reservation-dialog'
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
}

const RoomRow = ({ room }: RoomRowProps) => {
  const { COL_WIDTH, COL_HEIGHT, ROOM_COL_WIDTH, ROW_HEIGHT } =
    SCHEDULER_CONSTANTS

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTimeKey, setSelectedTimeKey] = useState<string>('')

  const formatTimeKey = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }

  const handleSlotClick = (room: Room, timeKey: string) => {
    setSelectedTimeKey(timeKey)
    setDialogOpen(true)
  }

  const getCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()]
    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`
  }

  return (
    <>
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

            return (
              <Box
                key={timeKey}
                minW={`${COL_WIDTH}px`}
                minH={`${COL_HEIGHT}px`}
                p="6px 12px"
                borderRight="1px solid"
                borderColor="border.basic.1"
                _hover={{ bg: 'grey.50', cursor: 'pointer' }}
                onClick={() => handleSlotClick(room, timeKey)}
              />
            )
          })}
        </Box>
      </Box>

      <RoomReservationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        room={room}
        date={getCurrentDate()}
        initialTime={selectedTimeKey}
        reserverName="정아인" // TODO: Get from user context
      />
    </>
  )
}

export default RoomRow
