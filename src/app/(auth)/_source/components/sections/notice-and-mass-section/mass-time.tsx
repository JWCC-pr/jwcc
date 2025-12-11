import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import type { MassTimeType } from './mass-section'

const getMassTimeElement = ({
  time,
  type,
}: {
  time: string
  type: MassTimeType
}) => {
  switch (type) {
    case 'default':
      return (
        <Text textStyle="pre-body-6" color="grey.7">
          {time}
        </Text>
      )
    case 'accent':
      return (
        <Text textStyle="pre-heading-6" color="grey.7">
          {time}
        </Text>
      )
    case 'middle-high':
      return (
        <>
          <Box w="6px" h="6px" bgColor="accent.violet2" rounded="full" />
          <Text textStyle="pre-body-5" color="accent.violet2">
            {time}
          </Text>
        </>
      )
    case 'parish-mass':
      return (
        <Text textStyle="pre-heading-6" color="grey.0">
          {time}
        </Text>
      )
    case 'elementary':
      return (
        <>
          <Box w="6px" h="6px" bgColor="accent.green2" rounded="full" />
          <Text textStyle="pre-body-5" color="accent.green2">
            {time}
          </Text>
        </>
      )
    case 'young-adult':
      return (
        <>
          <Box w="6px" h="6px" bgColor="accent.blue2" rounded="full" />
          <Text textStyle="pre-body-5" color="accent.blue2">
            {time}
          </Text>
        </>
      )
  }
}

const massTimeBgColorMap: Record<MassTimeType, string> = {
  default: 'grey.1',
  accent: 'grey.2',
  'middle-high': 'accent.violet1',
  'parish-mass': 'primary.4',
  elementary: 'accent.green1',
  'young-adult': 'accent.blue1',
}

interface MassTimeProps {
  type: MassTimeType
  time: string
}

const MassTime: React.FC<MassTimeProps> = ({ type, time }) => {
  return (
    <Box
      p="6px 10px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="4px"
      rounded="8px"
      bgColor={massTimeBgColorMap[type]}
    >
      {getMassTimeElement({ time, type })}
    </Box>
  )
}

export default MassTime
