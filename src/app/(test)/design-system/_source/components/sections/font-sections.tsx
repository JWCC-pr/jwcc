import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

const FontSections: React.FC = () => {
  return (
    <Box display="flex" gap="24px">
      <Text textStyle="pre-heading-1" fontFamily="Pretendard Variable">
        일반 폰트 ( Pretendard Variable )
      </Text>
      <Text textStyle="pre-heading-1" fontFamily="Catholic">
        가톨릭 폰트 ( Catholic )
      </Text>
    </Box>
  )
}

export default FontSections
