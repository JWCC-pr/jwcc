import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import MassTime from './mass-time'

/**
 * 1. `default`: 기본 미사시간
 * 2. `accent`: 특별 미사시간
 * 3. `middle-high`: 중고등부 미사시간
 * 4. `parish-mass`: 교중미사 미사시간
 * 5. `elementary`: 초등부 미사시간
 * 6. `young-adult`: 청년 미사시간
 */
export type MassTimeType =
  | 'default'
  | 'accent'
  | 'middle-high'
  | 'parish-mass'
  | 'elementary'
  | 'young-adult'

interface MassTime {
  monday: {
    times: { type: MassTimeType; time: string }[]
  }
  tuesday: {
    times: { type: MassTimeType; time: string }[]
  }
  wednesday: {
    times: { type: MassTimeType; time: string }[]
  }
  thursday: {
    times: { type: MassTimeType; time: string }[]
  }
  friday: {
    times: { type: MassTimeType; time: string }[]
  }
  saturday: {
    times: { type: MassTimeType; time: string }[]
  }
  sunday: {
    times: { type: MassTimeType; time: string }[]
  }
}
const massTime: MassTime = {
  monday: { times: [{ type: 'default', time: '6:00' }] },
  tuesday: {
    times: [
      { type: 'default', time: '6:00' },
      { type: 'default', time: '10:00' },
      { type: 'default', time: '19:00' },
    ],
  },
  wednesday: {
    times: [
      { type: 'default', time: '6:00' },
      { type: 'default', time: '10:00' },
      { type: 'default', time: '19:00' },
    ],
  },
  thursday: {
    times: [
      { type: 'default', time: '6:00' },
      { type: 'default', time: '10:00' },
      { type: 'default', time: '19:00' },
    ],
  },
  friday: {
    times: [
      { type: 'default', time: '6:00' },
      { type: 'default', time: '10:00' },
      { type: 'default', time: '19:00' },
    ],
  },
  saturday: {
    times: [
      { type: 'default', time: '6:00' },
      { type: 'accent', time: '18:00' },
    ],
  },
  sunday: {
    times: [
      { type: 'accent', time: '6:00' },
      { type: 'accent', time: '9:00' },
      { type: 'middle-high', time: '10:00*' },
      { type: 'parish-mass', time: '11:00*' },
      { type: 'elementary', time: '16:00*' },
      { type: 'young-adult', time: '18:00*' },
      { type: 'accent', time: '20:00' },
    ],
  },
} as const

const weekdayMassMap = {
  monday: '월',
  tuesday: '화',
  wednesday: '수',
  thursday: '목',
  friday: '금',
  saturday: '토',
  sunday: '일',
}

const MASS_CATEGORIES = [
  { label: '초등부', value: 'accent.green2' },
  { label: '중고등부', value: 'accent.violet2' },
  { label: '청년', value: 'accent.blue2' },
  { label: '교중 미사', value: 'primary.4' },
]

interface MassSectionProps {
  hasTitlePadding?: boolean
}

const MassSection: React.FC<MassSectionProps> = ({
  hasTitlePadding = true,
}) => {
  return (
    <Box
      flex="1"
      display="flex"
      flexFlow="column nowrap"
      gap={['24px', '24px', '9px']}
    >
      <Text
        py={hasTitlePadding ? '10px' : '0'}
        textStyle="pre-heading-1"
        color="grey.10"
      >
        미사시간 안내
      </Text>

      <Box display="flex" flexFlow="column nowrap" gap="12px">
        <Box
          as="ul"
          display="flex"
          gap="8px 20px"
          flexFlow="row wrap"
          justifyContent={['flex-start', 'flex-end']}
        >
          {MASS_CATEGORIES.map((category) => (
            <Box
              as="li"
              key={category.value}
              display="flex"
              alignItems="center"
              gap="6px"
            >
              <Box w="12px" h="12px" bgColor={category.value} rounded="full" />
              <Text textStyle="pre-body-6" color="grey.7">
                {category.label}
              </Text>
            </Box>
          ))}
          <Box as="li" display="flex" alignItems="center" gap="6px">
            <Text color="grey.7" textStyle="pre-heading-6">
              *
            </Text>
            <Text textStyle="pre-body-6" color="grey.7">
              주일 미사
            </Text>
          </Box>
        </Box>

        <Box display="flex" flexFlow="column nowrap">
          <Box w="full" h="1.5px" bgColor="grey.10" />
          <Box as="ul" display="flex" flexFlow="column">
            {Object.entries(massTime).map(
              ([key, value]: [
                string,
                { times: { type: MassTimeType; time: string }[] },
              ]) => {
                const isSunday = key === 'sunday'

                return (
                  <Box
                    key={key}
                    as="li"
                    minH="56px"
                    display="flex"
                    alignItems="stretch"
                    gap="10px"
                    borderBottom="1px solid"
                    borderBottomColor="border.basic.1"
                  >
                    <Text
                      w="40px"
                      px="10px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      textStyle="pre-body-3"
                      color="grey.10"
                      bgColor="background.basic.2"
                      {...(isSunday && {
                        bgColor: 'primary.1',
                        color: 'primary.4',
                      })}
                    >
                      {weekdayMassMap[key as keyof typeof weekdayMassMap]}
                    </Text>
                    <Box
                      flex="1"
                      py="10px"
                      display="flex"
                      gap="6px"
                      flexWrap="wrap"
                    >
                      {value.times.map((time) => (
                        <MassTime
                          key={time.time}
                          type={time.type}
                          time={time.time}
                        />
                      ))}
                    </Box>
                  </Box>
                )
              },
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default MassSection
