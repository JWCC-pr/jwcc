import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'
import { ChatCircleDotsIcon } from '@phosphor-icons/react'

import { BoardType } from '@/generated/apis/@types/data-contracts'

interface FreeBoardDetailCommentInfoSectionProps {
  data: Pick<BoardType, 'commentCount'>
}

const FreeBoardDetailCommentInfoSection: React.FC<
  FreeBoardDetailCommentInfoSectionProps
> = ({ data }) => {
  return (
    <Box p="16px 12px" display="flex" gap="6px" alignItems="center">
      <ChatCircleDotsIcon size="24px" color="#6A6D71" />
      <Box display="flex" gap="6px">
        <Text textStyle="pre-body-4" color="grey.7">
          댓글
        </Text>
        <Text textStyle="pre-body-3" color="primary.4">
          {data.commentCount}
        </Text>
      </Box>
    </Box>
  )
}

export default FreeBoardDetailCommentInfoSection
