import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { NewsDocumentCXCircleFillIcon } from '@/generated/icons/MyIcons'

const NewsDocumentNoSearchSection: React.FC = () => {
  return (
    <Box
      p="36px 12px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="10px"
      borderBottom="1px solid"
      borderColor="border.basic.1"
    >
      <NewsDocumentCXCircleFillIcon w="64px" h="64px" />

      <Text textStyle="pre-body-6" color="grey.6">
        검색 결과가 없습니다.
      </Text>
    </Box>
  )
}

export default NewsDocumentNoSearchSection
