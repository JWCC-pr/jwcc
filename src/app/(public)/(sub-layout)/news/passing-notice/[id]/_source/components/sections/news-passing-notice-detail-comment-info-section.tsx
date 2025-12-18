import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'
import { ChatCircleDotsIcon } from '@phosphor-icons/react'

import { PassingNoticeType } from '@/generated/apis/@types/data-contracts'

interface NewsNoticeDetailCommentInfoSectionProps {
  passingNotice: Pick<PassingNoticeType, 'commentCount'>
}

const NewsPassingNoticeDetailCommentInfoSection: React.FC<
  NewsNoticeDetailCommentInfoSectionProps
> = ({ passingNotice }) => {
  return (
    <Box p="16px 12px" display="flex" gap="6px" alignItems="center">
      <ChatCircleDotsIcon size="24px" color="#6A6D71" />
      <Box display="flex" gap="6px">
        <Text textStyle="pre-body-4" color="grey.7">
          댓글
        </Text>
        <Text textStyle="pre-body-3" color="primary.4">
          {passingNotice.commentCount}
        </Text>
      </Box>
    </Box>
  )
}

export default NewsPassingNoticeDetailCommentInfoSection
