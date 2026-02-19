'use client'

import { useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { Input } from '@chakra-ui/react/input'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import {
  CatechismRoomItemType,
  RoomReservationType,
} from '@/generated/apis/@types/data-contracts'
import useMe from '@/hooks/useMe'

import { RoomReservationFormDataType } from '../../hooks/useRoomReservationForm'
import { calculateReservationDuration } from '../../utils/time'
import RecurringFormView from './recurring-form-view'
import TimeSlotSelector from './time-slot-selector'

interface ReservationFormViewProps {
  room: CatechismRoomItemType
  roomReservations: RoomReservationType[]
  excludeReservationId?: number
  isEditMode?: boolean
}

const ReservationFormView: React.FC<ReservationFormViewProps> = ({
  room,
  roomReservations,
  excludeReservationId,
  isEditMode,
}) => {
  const { data: me, isAdmin } = useMe()
  const searchParams = useSearchParams()

  const date = searchParams.get('date') ?? format(new Date(), 'yyyy-MM-dd')

  const { register, control, setValue } =
    useFormContext<RoomReservationFormDataType>()

  const [startAt, endAt, isRecurring] = useWatch({
    control,
    name: ['startAt', 'endAt', 'isRecurring'],
  })

  // 예약 기간 계산 (n시간 형식)
  const duration = calculateReservationDuration(startAt, endAt)

  const reservationInfos = [
    { label: '예약자명', value: me?.name },
    { label: '예약 날짜', value: date },
    {
      label: '예약 시간',
      value: `${startAt} ~ ${endAt} (${duration})`,
    },
    { label: '예약 교리실', value: `${room.location} ${room.name}` },
  ]

  return (
    <Box display="flex" flexDirection="column">
      {/* 제목 입력 */}
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

      {/* 사용단체명 입력 */}
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
          maxLength={50}
          {...register('organizationName')}
        />
      </Box>

      {/* 예약 기본 정보 (읽기 전용) */}
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

      {/* 시간 선택 슬롯 그리드 */}
      <Box my="16px" w="full" overflowX="auto">
        <TimeSlotSelector
          initialStartTime={startAt}
          initialEndTime={endAt}
          roomReservations={roomReservations}
          excludeReservationId={excludeReservationId}
          onSelectionChange={(start, end) => {
            setValue('startAt', start, { shouldValidate: true })
            setValue('endAt', end, { shouldValidate: true })
          }}
        />
      </Box>

      {/* 일정 반복 토글 */}
      {isAdmin && (
        <Controller
          name="isRecurring"
          control={control}
          render={({ field: { value, onChange, name } }) => (
            <Checkbox.Root
              disabled={isEditMode}
              name={name}
              checked={value}
              onCheckedChange={(details) => onChange(details.checked === true)}
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
      )}

      {/* 반복 설정 폼 (활성화 시 노출) */}
      {isRecurring && <RecurringFormView />}
    </Box>
  )
}

export default ReservationFormView
