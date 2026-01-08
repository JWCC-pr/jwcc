import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

/**
 * 삭제된 댓글 표시 컴포넌트
 */
export const CommentDelete: React.FC = () => {
  return (
    <Box
      p="16px 12px 20px"
      borderBottom="1px solid"
      borderBottomColor="border.basic.1"
    >
      <Text textStyle="pre-body-4" color="grey.7">
        (삭제된 댓글입니다)
      </Text>
    </Box>
  )
}
