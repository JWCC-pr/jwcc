'use client'

import { Box } from '@chakra-ui/react/box'

import BuildingSection from './building-section'
import { BuildingGroup } from './scheduler.types'

interface ReservationSchedulerProps {
  buildings: BuildingGroup[]
}

const ReservationScheduler: React.FC<ReservationSchedulerProps> = ({
  buildings,
}) => {
  return (
    <Box w="full" bg="common-white">
      <Box minW="full">
        <Box>
          {buildings.map((building, index) => (
            <BuildingSection key={index} group={building} />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ReservationScheduler
