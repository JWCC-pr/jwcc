'use client'

import { useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import {
  CatechismRoomGroupedType,
  RoomReservationType,
} from '@/generated/apis/@types/data-contracts'

import RoomReservationRow from './room-reservation-row'
import TimeSlotHeader from './time-slot-header'

interface BuildingReservationSectionProps {
  roomGroup: CatechismRoomGroupedType
  reservations: RoomReservationType[]
}

const BuildingReservationSection: React.FC<BuildingReservationSectionProps> = ({
  roomGroup,
  reservations,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollLeft > 0)
    }
  }

  return (
    <Box>
      <Text textStyle="pre-heading-3" color="grey.800" my="12px">
        {roomGroup.building}
      </Text>

      <Box display="flex" flexFlow="column">
        <Box h="1.5px" bg="grey.10" />
        <Box
          ref={scrollRef}
          overflowX="auto"
          overflowY="hidden"
          onScroll={handleScroll}
          position="relative"
          css={{
            '& .sticky-column': {
              backgroundColor: 'var(--chakra-colors-common-white)',
              transition: 'background-color 0.2s',
              ...(isScrolled && {
                boxShadow:
                  '20px 0 80px 0 rgba(27, 28, 29, 0.04), 4px 0 10px 0 rgba(27, 28, 29, 0.04)',
              }),
            },
          }}
        >
          <Box minW="fit-content">
            <TimeSlotHeader />
            {roomGroup.rooms.map((room) => (
              <RoomReservationRow
                key={room.roomId}
                room={room}
                reservations={reservations}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BuildingReservationSection
