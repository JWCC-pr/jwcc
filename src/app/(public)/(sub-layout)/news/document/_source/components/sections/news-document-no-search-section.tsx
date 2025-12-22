import { Box } from '@chakra-ui/react/box'
import { Table } from '@chakra-ui/react/table'
import { Text } from '@chakra-ui/react/text'

import { NewsDocumentCXCircleFillIcon } from '@/generated/icons/MyIcons'

interface NewsDocumentNoSearchSectionProps {
  colSpan?: number
}

const NewsDocumentNoSearchSection: React.FC<
  NewsDocumentNoSearchSectionProps
> = ({ colSpan = 2 }) => {
  return (
    <Table.Row>
      <Table.Cell colSpan={colSpan} p="0">
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
      </Table.Cell>
    </Table.Row>
  )
}

export default NewsDocumentNoSearchSection
