import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

const ReplyDeleteSection: React.FC = () => {
  return (
    <Box
      p="16px 12px 20px 36px"
      borderBottom="1px solid"
      borderBottomColor="border.basic.1"
      bgColor="background.basic.2"
    >
      <Text textStyle="pre-body-4" color="grey.7">
        (삭제된 답글입니다)
      </Text>
    </Box>
  )
}

export default ReplyDeleteSection
