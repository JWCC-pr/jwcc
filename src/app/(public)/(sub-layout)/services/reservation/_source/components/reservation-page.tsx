'use client'

import { useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Heading } from '@chakra-ui/react/heading'

import { format } from 'date-fns'

import { useCatechismRoomListQuery } from '@/generated/apis/CatechismRoom/CatechismRoom.query'
import { useRoomReservationListQuery } from '@/generated/apis/RoomReservation/RoomReservation.query'

import ReservationControls from './controls/reservation-controls'
import ReservationScheduler from './scheduler/reservation-scheduler'

const NOW = new Date()

const ReservationPage: React.FC = () => {
  const searchParams = useSearchParams()
  const date = format(searchParams.get('date') || NOW, 'yyyy-MM-dd')

  const { data: rooms } = useCatechismRoomListQuery({})
  const { data: reservation } = useRoomReservationListQuery({
    variables: {
      query: {
        date,
      },
    },
  })

  if (!rooms) return null

  return (
    <Box display="flex" flexDirection="column" bg="common-white">
      {/* 상단 헤더 및 컨트롤 영역 */}
      <ReservationControls />

      {/* 메인 스케줄러 그리드 영역 */}
      <Box flex="1" overflow="hidden">
        <ReservationScheduler
          rooms={rooms ?? []}
          reservations={reservation?.results ?? []}
        />
      </Box>
    </Box>
  )
}

export default ReservationPage
