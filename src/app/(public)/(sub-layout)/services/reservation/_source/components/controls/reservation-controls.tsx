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
    <Box
      mb="20px"
      display="flex"
      gap="16px"
      flexFlow={['column', 'row']}
      alignItems={['flex-start', 'center']}
    >
      <Text flexShrink="0" textStyle="pre-heading-2" color="grey.10">
        {format(selectedDate, 'yyyy년 MM월 dd일 (EEE)', { locale: ko })}
      </Text>

      <Box
        display="flex"
        gap="16px"
        justifyContent={['space-between', 'flex-start']}
        width="100%"
      >
        <Box display="flex" gap="6px">
          <IconButton
            size="md"
            variant="outline"
            colorPalette="grey"
            onClick={handlePrevDay}
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

        <Box display="flex" gap="16px">
          <DatePicker
            value={selectedDate}
            onChange={(date) => date && updateDate(date)}
            variant="icon"
            allowPastDates
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
      </Box>
    </Box>
  )
}

export default ReservationControls
