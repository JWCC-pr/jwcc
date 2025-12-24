import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns'

import { PriestType } from '@/generated/apis/@types/data-contracts'

interface AboutPriestsListProps {
  lists: Pick<
    PriestType,
    | 'id'
    | 'image'
    | 'name'
    | 'baptismalName'
    // FIXME: API 요청 후 시간값 변경 필요
    | 'createdAt'
    | 'updatedAt'
  >[]
}

const AboutPriestsList: React.FC<AboutPriestsListProps> = ({ lists }) => {
  return (
    <Box display="flex" flexDirection="column" gap="36px">
      <Box h="1.5px" w="full" bgColor="grey.10" />

      <Box as="ul" display="flex" gap="24px" flexDirection={['column', 'row']}>
        {lists.map((list) => (
          <Box
            key={list.id}
            as="li"
            flex="1"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Image
              src={list.image}
              alt={list.name}
              w="200px"
              minW="200px"
              aspectRatio="1/1"
              rounded="16px"
              border="1px solid"
              borderColor="border.basic.1"
            />
            <Box py="20px" display="flex" flexDirection="column" gap="10px">
              <Box
                display="flex"
                flexFlow="column nowrap"
                gap="4px"
                alignItems="center"
              >
                <Text textStyle="pre-heading-4" color="grey.10">
                  {list.name}
                </Text>
                <Text textStyle="pre-body-4" color="grey.8">
                  {list.baptismalName}
                </Text>
              </Box>
              <Text textStyle="pre-body-6" color="grey.8">
                {format(list.createdAt, 'yyyy.MM.dd')} ~{' '}
                {format(list.updatedAt, 'yyyy.MM.dd')}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AboutPriestsList
