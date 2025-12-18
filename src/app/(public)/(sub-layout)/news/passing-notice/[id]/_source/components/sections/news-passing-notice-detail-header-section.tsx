import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'
import { ChatCircleDotsIcon } from '@phosphor-icons/react'

import { format } from 'date-fns/format'

import type { PassingNoticeType } from '@/generated/apis/@types/data-contracts'

interface NewsPassingNoticeDetailHeaderSectionProps {
  passingNotice: Pick<PassingNoticeType, 'name' | 'createdAt' | 'commentCount'>
}

const NewsPassingNoticeDetailHeaderSection: React.FC<
  NewsPassingNoticeDetailHeaderSectionProps
> = ({ passingNotice }) => {
  return (
    <Box
      py="20px"
      borderTop="1.5px solid"
      borderTopColor="grey.10"
      borderBottom="1px solid"
      borderBottomColor="border.basic.1"
      display="flex"
      flexDirection="column"
      gap="10px"
    >
      <Text textStyle="pre-heading-2" color="grey.10">
        {passingNotice.name}
      </Text>
      <Box>
        <Text textStyle="pre-caption-2" color="grey.7">
          {format(new Date(passingNotice.createdAt), 'yyyy-MM-dd')}
        </Text>
        <Box display="flex" justifyContent="space-between">
          <Text textStyle="pre-caption-2" color="grey.7">
            {format(new Date(passingNotice.createdAt), 'yyyy-MM-dd')}
          </Text>
          <Box display="flex" alignItems="center" gap="4px">
            <ChatCircleDotsIcon size="16px" color="#6A6D71" />

            <Box display="flex" alignItems="center" gap="2px">
              <Text textStyle="pre-caption-2" color="grey.7">
                댓글
              </Text>
              <Text textStyle="pre-caption-1" color="grey.10">
                {passingNotice.commentCount}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NewsPassingNoticeDetailHeaderSection
