'use client'

import { useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import RoomRow from './room-row'
import SchedulerHeader from './scheduler-header'
import { BuildingGroup } from './scheduler.types'

interface BuildingSectionProps {
  group: BuildingGroup
}

const BuildingSection: React.FC<BuildingSectionProps> = ({ group }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    if (scrollRef.current) {
      setIsScrolled(scrollRef.current.scrollLeft > 0)
    }
  }

  return (
    <Box mb="40px">
      <Text textStyle="pre-heading-3" color="grey.800" mb="12px">
        {group.buildingName}
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
            <SchedulerHeader />
            {group.rooms.map((room) => (
              <RoomRow key={room.id} room={room} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BuildingSection
