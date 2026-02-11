'use client'

import { Box } from '@chakra-ui/react/box'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { Input } from '@chakra-ui/react/input'
import { Text } from '@chakra-ui/react/text'

import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'

import { RoomReservationFormDataType } from '../../../hooks/useRoomReservationForm'
import { Room } from '../scheduler.types'
import RoomRevervationFormViewRecurring from './room-revervation-form-view-recurring'
import TimeSlotSelector from './time-slot-selector'

interface RoomReservationFormViewProps {
  room: Room
  date: string
  initialTime: string
  reserverName: string
}

const RoomReservationFormView: React.FC<RoomReservationFormViewProps> = ({
  room,
  date,
  initialTime,
  reserverName,
}) => {
  const { register, control, setValue } =
    useFormContext<RoomReservationFormDataType>()
  const { errors } = useFormState({ control })

  const [startTime, endTime, isRecurring] = useWatch({
    control,
    name: ['startTime', 'endTime', 'isRecurring'],
  })

  const calculateDuration = () => {
    if (!startTime || !endTime) return '0시간'

    const [startHour] = startTime.split(':').map(Number)
    const [endHour] = endTime.split(':').map(Number)

    const duration = endHour - startHour

    if (duration === 0) return '0.5시간'
    return `${duration}시간`
  }

  const reservationInfos = [
    {
      label: '예약자명',
      value: reserverName,
    },
    {
      label: '예약 날짜',
      value: date,
    },
    {
      label: '예약 시간',
      value: `${startTime} ~ ${endTime} (${calculateDuration()})`,
    },
    {
      label: '예약 교리실',
      value: `${room.building} ${room.floor} ${room.name}`,
    },
  ]

  return (
    <Box display="flex" flexDirection="column">
      <FormHelper message={{ error: errors.title?.message }}>
        <Box py="10px" w="full" display="flex" gap="10px">
          <Box w="80px" display="flex" alignItems="center">
            <Text textStyle="pre-body-6" color="grey.8">
              제목
            </Text>
          </Box>
          <Input
            placeholder="제목"
            size="lg"
            variant="outline"
            colorPalette="grey"
            maxLength={50}
            {...register('title')}
          />
        </Box>
      </FormHelper>

      <FormHelper message={{ error: errors.groupName?.message }}>
        <Box py="10px" w="full" display="flex" gap="10px">
          <Box w="80px" display="flex" alignItems="center">
            <Text textStyle="pre-body-6" color="grey.8">
              사용단체명
            </Text>
          </Box>
          <Input
            placeholder="사용단체명"
            size="lg"
            variant="outline"
            colorPalette="grey"
            maxLength={10}
            {...register('groupName')}
          />
        </Box>
      </FormHelper>

      <Box display="flex" flexDirection="column">
        {reservationInfos.map((info) => (
          <Box key={info.label} py="10px" w="full" display="flex" gap="10px">
            <Box w="80px" display="flex" alignItems="center">
              <Text textStyle="pre-body-6" color="grey.8">
                {info.label}
              </Text>
            </Box>
            <Text textStyle="pre-body-4" color="grey.10">
              {info.value}
            </Text>
          </Box>
        ))}
      </Box>

      <Box my="16px" w="full" overflowX="auto">
        <FormHelper
          message={{
            error: errors.startTime?.message || errors.endTime?.message,
          }}
        >
          <TimeSlotSelector
            initialStartTime={initialTime}
            onSelectionChange={(start, end) => {
              setValue('startTime', start, { shouldValidate: true })
              setValue('endTime', end, { shouldValidate: true })
            }}
          />
        </FormHelper>
      </Box>

      <Controller
        name="isRecurring"
        control={control}
        render={({ field: { value, onChange, name } }) => (
          <Checkbox.Root
            name={name}
            checked={value}
            onCheckedChange={(details) => {
              const checked = details.checked === true
              onChange(checked)
            }}
            size="md"
            variant="solid"
            colorPalette="grey"
            gap="8px"
            py="16px"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label textStyle="pre-body-4" color="grey.10">
              일정 반복
            </Checkbox.Label>
          </Checkbox.Root>
        )}
      />

      {isRecurring && <RoomRevervationFormViewRecurring />}
    </Box>
  )
}

export default RoomReservationFormView
