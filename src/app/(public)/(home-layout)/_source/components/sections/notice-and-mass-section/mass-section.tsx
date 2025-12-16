import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import MassTime from './mass-time'

/**
 * FIXME: API
 *
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

/** FIXME: API */
interface Mock {
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
const times = [
  { type: 'default', time: '9:00' } as const,
  { type: 'accent', time: '10:00' } as const,
  { type: 'middle-high', time: '11:00' } as const,
  { type: 'parish-mass', time: '12:00' } as const,
  { type: 'elementary', time: '13:00' } as const,
  { type: 'young-adult', time: '14:00' } as const,
  { type: 'default', time: '15:00' } as const,
]
/** FIXME: API */
const mock: Mock = {
  monday: { times: times.slice(0, 1) },
  tuesday: { times: times.slice(0, 2) },
  wednesday: { times: times.slice(0, 3) },
  thursday: { times: times.slice(0, 4) },
  friday: { times: times.slice(0, 5) },
  saturday: { times: times.slice(0, 6) },
  sunday: { times: times.slice(0, 7) },
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

const MassSection: React.FC = () => {
  return (
    <Box flex="1" display="flex" flexFlow="column nowrap" gap="9px">
      <Text py="10px" textStyle="pre-heading-1" color="grey.10">
        미사시간 안내
      </Text>

      <Box display="flex" flexFlow="column nowrap" gap="12px">
        <Box as="ul" display="flex" gap="24px" justifyContent="flex-end">
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
            {Object.entries(mock).map(
              ([key, value]: [
                string,
                { times: { type: MassTimeType; time: string }[] },
              ]) => {
                const isSunday = key === 'sunday'

                return (
                  <Box
                    key={key}
                    as="li"
                    h="56px"
                    display="flex"
                    alignItems="center"
                    gap="10px"
                    borderBottom="1px solid"
                    borderBottomColor="border.basic.1"
                  >
                    <Text
                      px="10px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      h="full"
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
                    <Box flex="1" py="10px" display="flex" gap="6px">
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
