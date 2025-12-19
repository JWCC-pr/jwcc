import { Box } from '@chakra-ui/react/box'
import { Table } from '@chakra-ui/react/table'
import { Text } from '@chakra-ui/react/text'

import { EmptyCDoveIcon } from '@/generated/icons/MyIcons'

interface EmptySectionProps {
  title?: string
  colSpan?: number
}

const EmptySection: React.FC<EmptySectionProps> = ({
  title = '등록된 게시글이 없습니다.',
  colSpan = 2,
}) => {
  return (
    <Table.Row>
      <Table.Cell colSpan={colSpan} p="0">
        <Box
          p="36px 12px"
          display="flex"
          flexFlow="column nowrap"
          gap="10px"
          justifyContent="center"
          alignItems="center"
          borderBottom="1px solid"
          borderBottomColor="border.basic.1"
        >
          <EmptyCDoveIcon w="64px" h="64px" />
          <Text textStyle="pre-body-6" color="grey.6">
            {title}
          </Text>
        </Box>
      </Table.Cell>
    </Table.Row>
  )
}

export default EmptySection
