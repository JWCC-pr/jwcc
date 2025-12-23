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
    <Box as="ul" borderTop="1.5px solid" borderTopColor="grey.10">
      {items.map((item) => (
        <Box
          key={item.label}
          as="li"
          display="flex"
          gap="20px"
          borderBottom="1px solid"
          borderBottomColor="border.basic.1"
        >
          <Text
            flexShrink="0"
            w={[isFlexibleWidth ? 'fit-content' : '140px', '140px']}
            h="auto"
            px="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textStyle="pre-body-5"
            color="grey.7"
            bgColor="background.basic.2"
          >
            {item.label}
          </Text>
          {typeof item.value === 'string' ?
            <Text
              flex="1"
              py="10px"
              h="full"
              display="flex"
              alignItems="center"
              textStyle="pre-body-4"
              color="grey.10"
            >
              {item.value}
            </Text>
          : <Box py="10px" flex="1">
              {item.value}
            </Box>
          }
        </Box>
      ))}
    </Box>
  )
}

export default InfoList
