import { Badge } from '@chakra-ui/react/badge'
import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns'

import { PriestType } from '@/generated/apis/@types/data-contracts'

interface AboutPriestsListProps {
  lists: (Pick<PriestType, 'id' | 'image' | 'name' | 'baptismalName'> & {
    startDate: string
    ordinationDate?: string
  })[]
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
            <Box
              py="16px"
              display="flex"
              flexDirection="column"
              gap="12px"
              alignItems="center"
            >
              <Box
                display="flex"
                flexFlow="column nowrap"
                gap="2px"
                alignItems="center"
              >
                <Text textStyle="pre-heading-4" color="grey.10">
                  {list.name}
                </Text>
                <Text textStyle="pre-body-6" color="grey.8">
                  {list.baptismalName}
                </Text>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap="4px"
                alignItems="center"
              >
                <Text textStyle="pre-body-6" color="grey.8">
                  {format(list.startDate, 'yyyy.MM.dd')} ~ 현재
                </Text>
                {list.ordinationDate && (
                  <Badge size="md" variant="subtle" colorPalette="grey">
                    {format(list.ordinationDate, 'yyyy.MM.dd')}
                  </Badge>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AboutPriestsList
