'use client'

import { useMemo, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { formatTime } from '../../../utils/format-time'
import { SCHEDULER_CONSTANTS } from '../scheduler.constants'

interface TimeSlotSelectorProps {
  onSelectionChange: (startTime: string, endTime: string) => void
  initialStartTime?: string
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  onSelectionChange,
  initialStartTime,
}) => {
  const { COL_WIDTH, COL_HEIGHT, ROW_HEIGHT } = SCHEDULER_CONSTANTS

  // Generate 00:00 to 23:30 in 30-minute increments (48 total slots)
  const timeSlots = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        const hour = Math.floor(i / 2)
        const minute = (i % 2) * 30
        return {
          hour,
          minute,
          label: formatTime(hour, minute),
          index: i,
        }
      }),
    [],
  )

  const [firstClick, setFirstClick] = useState<number | null>(
    initialStartTime ?
      timeSlots.findIndex((slot) => slot.label === initialStartTime)
    : null,
  )
  const [secondClick, setSecondClick] = useState<number | null>(null)

  const handleSlotClick = (index: number) => {
    if (firstClick === null) {
      // First click - set start
      setFirstClick(index)
      setSecondClick(null)
      onSelectionChange(timeSlots[index].label, timeSlots[index].label)
    } else if (secondClick === null) {
      // Second click - create range
      const start = Math.min(firstClick, index)
      const end = Math.max(firstClick, index)
      setFirstClick(start)
      setSecondClick(end)
      onSelectionChange(timeSlots[start].label, timeSlots[end].label)
    } else {
      // Third click - reset and start new selection
      setFirstClick(index)
      setSecondClick(null)
      onSelectionChange(timeSlots[index].label, timeSlots[index].label)
    }
  }

  const isSelected = (index: number) => {
    if (firstClick === null) return false
    if (secondClick === null) return index === firstClick
    const start = Math.min(firstClick, secondClick)
    const end = Math.max(firstClick, secondClick)
    return index >= start && index <= end
  }

  return (
    <Box>
      {/* Header Row - Time Labels */}
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
            minH={`${COL_HEIGHT}px`}
            p="6px 12px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRight="1px solid"
            borderColor="border.basic.1"
            bg="grey.1"
          >
            <Text textStyle="pre-caption-1" color="grey.8">
              {slot.label}
            </Text>
          </Box>
        ))}
      </Box>

      <Box display="flex" borderBottom="1px solid" borderColor="border.basic.1">
        {timeSlots.map((slot) => (
          <Box
            key={`cell-${slot.label}`}
            minW={`${COL_WIDTH}px`}
            minH={`${ROW_HEIGHT}px`}
            p="6px 12px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRight="1px solid"
            borderColor="border.basic.1"
            bg={isSelected(slot.index) ? 'primary.4' : 'common-white'}
            cursor="pointer"
            onClick={() => handleSlotClick(slot.index)}
            transition="all 0.2s"
            _hover={{
              bg: isSelected(slot.index) ? 'primary.5' : 'grey.50',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default TimeSlotSelector
