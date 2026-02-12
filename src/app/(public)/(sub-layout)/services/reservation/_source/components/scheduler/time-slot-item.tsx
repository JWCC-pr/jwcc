'use client'

import React from 'react'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { RoomReservationType } from '@/generated/apis/@types/data-contracts'

import { SCHEDULER_CONFIG } from '../../constants/scheduler'

interface TimeSlotItemProps {
  isReserved: boolean
  isStart?: boolean
  isMine?: boolean
  reservation?: RoomReservationType
}

const getStylesMapping = (options: {
  isReserved: boolean
  isMine?: boolean
  isStart?: boolean
}) => {
  if (!options.isReserved) {
    return {
      box: {
        bg: 'common-white',
        borderRight: '1px solid',
        borderRightColor: 'border.basic.1',
      },
      titleText: {},
      subText: {},
      indicatorColor: undefined,
    }
  }

  if (options.isMine) {
    if (options.isStart) {
      return {
        box: {
          bg: 'primary.1',
          borderRight: '1px solid',
          borderRightColor: 'primary.1',
        },
        titleText: { color: 'primary.4' },
        subText: { color: 'primary.3' },
        indicatorColor: 'primary.3',
      }
    }
    return {
      box: {
        bg: 'primary.1',
        borderRight: '1px solid',
        borderRightColor: 'primary.1',
      },
      titleText: {},
      subText: {},
      indicatorColor: undefined,
    }
  }

  if (options.isStart) {
    return {
      box: {
        bg: 'background.basic.2',
        borderRight: '1px solid',
        borderRightColor: 'background.basic.2',
      },
      titleText: { color: 'grey.10' },
      subText: { color: 'grey.transparent.4' },
      indicatorColor: 'grey.3',
    }
  }

  return {
    box: {
      bg: 'background.basic.2',
      borderRight: '1px solid',
      borderRightColor: 'background.basic.2',
    },
    titleText: {},
    subText: {},
    indicatorColor: undefined,
  }
}

const TimeSlotItem: React.FC<TimeSlotItemProps> = ({
  isReserved,
  isStart,
  isMine,
  reservation,
}) => {
  const { COL_WIDTH, COL_HEIGHT } = SCHEDULER_CONFIG

  const timeRange =
    reservation ?
      `${reservation.startAt.slice(0, 5)}~${reservation.endAt.slice(0, 5)}`
    : ''

  const styles = getStylesMapping({ isReserved, isMine, isStart })

  return (
    <Box
      w={`${COL_WIDTH}px`}
      minH={`${COL_HEIGHT}px`}
      h="full"
      px="12px"
      cursor="pointer"
      _hover={{ bgColor: 'background.basic.3' }}
      position="relative"
      overflow="hidden"
      {...styles.box}
    >
      {isStart && styles.indicatorColor && (
        <Box
          position="absolute"
          left="0"
          top="0"
          w="4px"
          h="full"
          bg={styles.indicatorColor}
        />
      )}
      {isStart && reservation && (
        <Box
          h="full"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Text textStyle="pre-body-5" lineClamp="1" {...styles.titleText}>
            {reservation.title}
          </Text>
          <Text textStyle="pre-caption-2" lineClamp="1" {...styles.subText}>
            {reservation.organizationName || '-'}
          </Text>
          <Text textStyle="pre-caption-3" lineClamp="1" {...styles.subText}>
            {timeRange}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default React.memo(TimeSlotItem)
