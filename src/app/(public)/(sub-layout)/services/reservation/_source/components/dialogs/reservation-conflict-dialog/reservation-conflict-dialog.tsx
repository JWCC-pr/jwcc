import { useMemo } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

import AlertDialog from '@/components/dialogs/alert-dialog'

import {
  calculateReservationDuration,
  formatTimeWithoutSeconds,
} from '../../../utils/time'

interface ReservationConflictDialogProps {
  open: boolean
  onClose: () => void

  conflictData?: {
    date: string
    startAt: string
    endAt: string
    building: string
    location: string
    name: string
  }
}

const ReservationConflictDialog: React.FC<ReservationConflictDialogProps> = ({
  open,
  onClose,
  conflictData,
}) => {
  const items = useMemo(() => {
    if (!conflictData) return []

    return [
      {
        label: '예약 날짜',
        value: format(parseISO(conflictData.date), 'yyyy년 MM월 dd일 (EEE)', {
          locale: ko,
        }),
      },
      {
        label: '예약 시간',
        value: `${formatTimeWithoutSeconds(conflictData.startAt)} - ${formatTimeWithoutSeconds(conflictData.endAt)} (${calculateReservationDuration(conflictData.startAt, conflictData.endAt)})`,
      },
      {
        label: '예약 장소',
        value: `${conflictData.building} ${conflictData.location} ${conflictData.name}`,
      },
    ]
  }, [conflictData])

  return (
    <AlertDialog
      size="sm"
      open={open}
      title="예약 불가"
      description={
        <Box display="flex" flexDirection="column" gap="12px">
          <Text textStyle="pre-body-6" color="grey.7">
            이미 다른 일정이 등록되어 있어
            <br />
            예약이 불가합니다.
          </Text>

          <Box
            p="10px"
            rounded="4px"
            bgColor="background.basic.2"
            display="flex"
            flexFlow="column nowrap"
            gap="4px"
          >
            {items.map((item) => (
              <Box
                key={item.label}
                display="flex"
                flexFlow="row nowrap"
                gap="10px"
                alignItems="center"
              >
                <Text w="64px" textStyle="pre-body-6" color="grey.7">
                  {item.label}
                </Text>
                <Text textStyle="pre-body-6" color="grey.10">
                  {item.value}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      }
      buttons={{
        actionProps: {
          text: '확인',
          onClick: onClose,
        },
      }}
    />
  )
}

export default ReservationConflictDialog
