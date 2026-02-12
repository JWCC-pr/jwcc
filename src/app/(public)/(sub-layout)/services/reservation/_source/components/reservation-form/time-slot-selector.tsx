'use client'

import React from 'react'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { RoomReservationType } from '@/generated/apis/@types/data-contracts'

import { SCHEDULER_CONFIG } from '../../constants/scheduler'
import { useTimeSlotSelection } from '../../hooks/useTimeSlotSelection'

interface TimeSlotSelectorProps {
  initialStartTime?: string
  initialEndTime?: string
  roomReservations: RoomReservationType[]
  excludeReservationId?: number
  onSelectionChange: (start: string, end: string) => void
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  initialStartTime,
  initialEndTime,
  roomReservations,
  excludeReservationId,
  onSelectionChange,
}) => {
  const { COL_WIDTH, COL_HEIGHT, ROW_HEIGHT } = SCHEDULER_CONFIG

  const { timeSlots, handleSlotClick, isSelected } = useTimeSlotSelection({
    initialStartTime,
    initialEndTime,
    roomReservations,
    excludeReservationId,
    onSelectionChange,
  })

  return (
    <Box w="fit-content" border="1px solid" borderColor="border.basic.1">
      {/* 시간 레이블 (헤더) */}
      <Box
        display="flex"
        height={`${COL_HEIGHT}px`}
        borderBottom="1px solid"
        borderColor="border.basic.1"
      >
        {timeSlots.map((slot) => (
          <Box
            key={`header-${slot.label}`}
            minW={`${COL_WIDTH}px`}
            h="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRight="1px solid"
            borderColor="border.basic.1"
          >
            <Text textStyle="pre-caption-1" color="grey.8">
              {slot.label}
            </Text>
          </Box>
        ))}
      </Box>

      {/* 선택 그리드 */}
      <Box display="flex">
        {timeSlots.map((slot) => {
          const selected = isSelected(slot.index)
          return (
            <Box
              key={`cell-${slot.label}`}
              minW={`${COL_WIDTH}px`}
              height={`${ROW_HEIGHT}px`}
              onClick={() => handleSlotClick(slot.index)}
              cursor={slot.isReserved ? 'not-allowed' : 'pointer'}
              bg={
                slot.isReserved ? 'background.basic.2'
                : selected ?
                  'primary.4'
                : 'common-white'
              }
              borderRight="1px solid"
              borderColor={selected ? 'primary.4' : 'border.basic.1'}
              _hover={
                !slot.isReserved ?
                  { bg: selected ? 'primary.4' : 'background.basic.3' }
                : {}
              }
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default React.memo(TimeSlotSelector)
