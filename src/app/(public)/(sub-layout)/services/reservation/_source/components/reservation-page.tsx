'use client'

import { Box } from '@chakra-ui/react/box'
import { Heading } from '@chakra-ui/react/heading'

import { useCatechismRoomListQuery } from '@/generated/apis/CatechismRoom/CatechismRoom.query'

import ReservationControls from './reservation-controls'
import ReservationScheduler from './scheduler/reservation-scheduler'
import { BuildingGroup } from './scheduler/scheduler.types'

// Mock Data
const MOCK_BUILDINGS: BuildingGroup[] = [
  {
    buildingName: '교육관',
    rooms: [
      {
        id: 'edu-b2-201',
        name: 'EB201호',
        floor: '지하 2층',
        building: '교육관',
      },
      {
        id: 'edu-b2-202',
        name: 'EB202호',
        floor: '지하 2층',
        building: '교육관',
      },
      {
        id: 'edu-b2-203',
        name: 'EB203호',
        floor: '지하 2층',
        building: '교육관',
      },
      {
        id: 'edu-b2-204',
        name: 'EB204호',
        floor: '지하 2층',
        building: '교육관',
      },
      {
        id: 'edu-b2-205',
        name: 'EB205호',
        floor: '지하 2층',
        building: '교육관',
      },
      {
        id: 'edu-b2-206',
        name: 'EB206호',
        floor: '지하 2층',
        building: '교육관',
      },
      {
        id: 'edu-b2-207',
        name: 'EB207호',
        floor: '지하 2층',
        building: '교육관',
      },
      {
        id: 'edu-b2-208',
        name: 'EB208호',
        floor: '지하 2층',
        building: '교육관',
      },
      { id: 'edu-2f-201', name: 'E201호', floor: '2층', building: '교육관' },
      { id: 'edu-2f-202', name: 'E202호', floor: '2층', building: '교육관' },
      { id: 'edu-2f-203', name: 'E203호', floor: '2층', building: '교육관' },
    ],
  },
  {
    buildingName: '체육관',
    rooms: [{ id: 'gym-1f-k', name: 'K룸', floor: '1층', building: '체육관' }],
  },
]

const ReservationPage: React.FC = () => {
  const { data } = useCatechismRoomListQuery()

  return (
    <Box display="flex" flexDirection="column" bg="common-white">
      <Box p="24px 20px 0">
        <Heading color="grey.800" textStyle="pre-heading-2" mb="24px">
          교리실 예약
        </Heading>

        <ReservationControls />
      </Box>

      <Box flex="1" overflow="hidden" p="24px 20px">
        <ReservationScheduler buildings={MOCK_BUILDINGS} />
      </Box>
    </Box>
  )
}

export default ReservationPage
