import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

interface InfoListProps {
  items: {
    label: string
    value: string | React.ReactNode
  }[]
  isFlexibleWidth?: boolean
}

const InfoList: React.FC<InfoListProps> = ({
  items,
  isFlexibleWidth = false,
}) => {
  return (
    <Box
      as="ul"
      borderTop="1.5px solid"
      borderTopColor="grey.10"
      display="grid"
      gridTemplateColumns={
        isFlexibleWidth ?
          ['max-content 1fr', 'max-content 1fr']
        : ['140px 1fr', '140px 1fr']
      }
    >
      {items.map((item) => (
        <Box key={item.label} as="li" display="contents">
          <Text
            minW={isFlexibleWidth ? '56px' : '140px'}
            px="10px"
            py="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textStyle="pre-body-5"
            color="grey.7"
            bgColor="background.basic.2"
            borderBottom="1px solid"
            borderBottomColor="border.basic.1"
          >
            {item.label}
          </Text>
          {typeof item.value === 'string' ?
            <Text
              py="10px"
              pl="20px"
              display="flex"
              alignItems="center"
              textStyle="pre-body-4"
              color="grey.10"
              borderBottom="1px solid"
              borderBottomColor="border.basic.1"
            >
              {item.value}
            </Text>
          : <Box
              py="10px"
              pl="20px"
              borderBottom="1px solid"
              borderBottomColor="border.basic.1"
            >
              {item.value}
            </Box>
          }
        </Box>
      ))}
    </Box>
  )
}

export default InfoList
