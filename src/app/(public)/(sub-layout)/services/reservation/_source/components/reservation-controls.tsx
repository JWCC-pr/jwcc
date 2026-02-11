'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button, IconButton } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

import { addDays, format, isSameDay, startOfToday, subDays } from 'date-fns'
import { ko } from 'date-fns/locale'

import DatePicker from '@/components/ui/date-picker'

const NOW = startOfToday()

const ReservationControls: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(NOW)

  const handlePrevDay = () => {
    const prevDate = subDays(selectedDate, 1)
    if (prevDate < NOW) return
    setSelectedDate(prevDate)
  }

  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1))
  }

  const handleToday = () => {
    setSelectedDate(NOW)
  }

  const isToday = isSameDay(selectedDate, NOW)

  return (
    <Box display="flex" gap="16px" alignItems="center">
      <Text textStyle="pre-heading-2" color="grey.10">
        {format(selectedDate, 'yyyy년 MM월 dd일 (EEE)', { locale: ko })}
      </Text>

      <Box display="flex" gap="6px">
        <IconButton
          size="md"
          variant="outline"
          colorPalette="grey"
          onClick={handlePrevDay}
          disabled={isToday}
        >
          <CaretLeftIcon size="20px" />
        </IconButton>
        <IconButton
          size="md"
          variant="outline"
          colorPalette="grey"
          onClick={handleNextDay}
        >
          <CaretRightIcon size="20px" />
        </IconButton>
      </Box>

      <DatePicker value={selectedDate} onChange={setSelectedDate} />

      <Button
        size="md"
        variant="outline"
        colorPalette="grey"
        onClick={handleToday}
        disabled={isToday}
      >
        오늘
      </Button>
    </Box>
  )
}

export default ReservationControls
