'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button, IconButton } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

import {
  addDays,
  format,
  isSameDay,
  isValid,
  parse,
  startOfToday,
  subDays,
} from 'date-fns'
import { ko } from 'date-fns/locale'

import DatePicker from '@/components/ui/date-picker'

const TODAY = startOfToday()

const ReservationControls: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const dateParam = searchParams.get('date')
  const selectedDate =
    dateParam && isValid(parse(dateParam, 'yyyy-MM-dd', TODAY)) ?
      parse(dateParam, 'yyyy-MM-dd', TODAY)
    : TODAY

  const updateDate = (date: Date) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('date', format(date, 'yyyy-MM-dd'))
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handlePrevDay = () => {
    const prevDate = subDays(selectedDate, 1)
    if (prevDate < TODAY) return
    updateDate(prevDate)
  }

  const handleNextDay = () => {
    updateDate(addDays(selectedDate, 1))
  }

  const handleToday = () => {
    updateDate(TODAY)
  }

  const isToday = isSameDay(selectedDate, TODAY)

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

      <DatePicker
        value={selectedDate}
        onChange={(date) => date && updateDate(date)}
        variant="icon"
      />

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
