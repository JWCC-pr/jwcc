'use client'

import React, { useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { toaster } from '@/components/ui/toaster'
import {
  CatechismRoomItemType,
  RoomReservationType,
} from '@/generated/apis/@types/data-contracts'
import useMe from '@/hooks/useMe'

import { SCHEDULER_CONFIG } from '../../constants/scheduler'
import { useRoomReservation } from '../../hooks/useRoomReservation'
import ReservationCreateDialog from '../dialogs/reservation-create-dialog/reservation-create-dialog'
import ReservationDetailDialog from '../dialogs/reservation-detail-dialog/reservation-detail-dialog'
import TimeSlotItem from './time-slot-item'

interface RoomReservationRowProps {
  room: CatechismRoomItemType
  reservations: RoomReservationType[]
}

const RoomReservationRow: React.FC<RoomReservationRowProps> = ({
  room,
  reservations,
}) => {
  const { isGroupLeader } = useMe()
  const { COL_WIDTH, COL_HEIGHT, ROOM_COL_WIDTH, ROW_HEIGHT } = SCHEDULER_CONFIG

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedTimeKey, setSelectedTimeKey] = useState('')

  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedReservationId, setSelectedReservationId] = useState<
    number | undefined
  >()

  const { roomReservations, processedSlots } = useRoomReservation({
    roomId: room.roomId,
    reservations,
  })

  const handleSlotClick = (
    timeKey: string,
    isReserved: boolean,
    reservationId?: number,
  ) => {
    if (isReserved) {
      setSelectedReservationId(reservationId)
      setDetailDialogOpen(true)
    } else {
      setSelectedTimeKey(timeKey)
      setCreateDialogOpen(true)
    }
  }

  return (
    <>
      <Box
        display="flex"
        height={`${ROW_HEIGHT}px`}
        borderBottom="1px solid"
        borderColor="border.basic.1"
      >
        {/* Sticky Room Info */}
        <Box
          position="sticky"
          left="0"
          zIndex="2"
          display="flex"
          className="sticky-column"
          bg="common-white"
          transition="background-color 0.2s"
        >
          <Box
            minW={`${COL_WIDTH}px`}
            minH={`${COL_HEIGHT}px`}
            p="6px 12px"
            display="flex"
            alignItems="center"
            borderRight="1px solid"
            borderColor="border.basic.1"
          >
            <Text textStyle="pre-body-4" color="grey.10">
              {room.location}
            </Text>
          </Box>

          <Box
            minW={`${ROOM_COL_WIDTH}px`}
            minH={`${COL_HEIGHT}px`}
            p="6px 12px"
            display="flex"
            alignItems="center"
            borderRight="1px solid"
            borderColor="border.basic.1"
          >
            <Text textStyle="pre-body-4" color="grey.10">
              {room.name}
            </Text>
          </Box>
        </Box>

        {/* Time Slots Grid */}
        <Box display="flex" position="relative">
          {processedSlots.map((slot) => (
            <Box
              key={slot.timeKey}
              onClick={() => {
                if (!isGroupLeader) {
                  toaster.create({
                    type: 'error',
                    title: '단체장만 예약 가능합니다.',
                  })
                  return
                }

                handleSlotClick(
                  slot.timeKey,
                  slot.isReserved,
                  slot.reservation?.id,
                )
              }}
            >
              <TimeSlotItem
                isReserved={slot.isReserved}
                isStart={slot.isStart}
                isMine={slot.isMine}
                reservation={slot.reservation}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Dialogs */}
      <ReservationCreateDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        room={room}
        roomReservations={roomReservations}
        initialTime={selectedTimeKey}
      />

      <ReservationDetailDialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        reservationId={selectedReservationId}
        roomReservations={roomReservations}
      />
    </>
  )
}

export default React.memo(RoomReservationRow)
