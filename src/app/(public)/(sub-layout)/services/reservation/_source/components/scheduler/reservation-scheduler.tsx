'use client'

import { Box } from '@chakra-ui/react/box'

import {
  CatechismRoomGroupedType,
  RoomReservationType,
} from '@/generated/apis/@types/data-contracts'

import BuildingReservationSection from './building-reservation-section'

interface ReservationSchedulerProps {
  rooms: CatechismRoomGroupedType[]
  reservations: RoomReservationType[]
}

const ReservationScheduler: React.FC<ReservationSchedulerProps> = ({
  rooms,
  reservations,
}) => {
  return (
    <Box w="full" bg="common-white">
      <Box minW="full">
        <Box display="flex" flexDirection="column" gap="24px">
          {rooms.map((roomGroup, index) => (
            <BuildingReservationSection
              key={index}
              roomGroup={roomGroup}
              reservations={reservations}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ReservationScheduler
