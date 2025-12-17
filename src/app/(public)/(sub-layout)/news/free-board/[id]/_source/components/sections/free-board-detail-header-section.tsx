import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import {
  ChatCircleDotsIcon,
  DotsThreeVerticalIcon,
  HeartIcon,
} from '@phosphor-icons/react'

import { format } from 'date-fns/format'

import { BoardType } from '@/generated/apis/@types/data-contracts'

interface FreeBoardDetailHeaderSectionProps {
  data: Pick<
    BoardType,
    'title' | 'user' | 'createdAt' | 'hitCount' | 'commentCount' | 'likeCount'
  >
}

const FreeBoardDetailHeaderSection: React.FC<
  FreeBoardDetailHeaderSectionProps
> = ({ data }) => {
  return (
    <Box
      py="20px"
      display="flex"
      flexFlow="column"
      gap="10px"
      borderTop="1.5px solid"
      borderTopColor="grey.10"
      borderBottom="1px solid"
      borderBottomColor="border.basic.1"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text textStyle="pre-heading-2" color="grey.10" lineClamp="1">
          {data.title}
        </Text>
        <Box>
          <IconButton size="md" variant="ghost" colorPalette="grey">
            <HeartIcon size="20px" />
          </IconButton>
          <IconButton size="md" variant="ghost" colorPalette="grey">
            <DotsThreeVerticalIcon size="20px" />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" flexFlow="column" gap="2px">
          <Box display="flex" gap="6px">
            <Text textStyle="pre-body-5" color="grey.10">
              {data.user.name}
            </Text>
            <Text textStyle="pre-body-6" color="grey.7">
              {data.user.baptismalName}
            </Text>
          </Box>
          <Box display="flex" gap="10px">
            <Text textStyle="pre-caption-2" color="grey.7">
              {format(data.createdAt, 'yyyy-MM-dd')}
            </Text>
            <Box display="flex" gap="4px">
              <Text textStyle="pre-caption-2" color="grey.7">
                조회
              </Text>
              <Text textStyle="pre-caption-2" color="grey.7">
                {data.hitCount}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box display="flex" gap="20px" alignItems="center">
          <Box display="flex" gap="4px" alignItems="center">
            <ChatCircleDotsIcon size="16px" color="#6A6D71" />
            <Box display="flex" gap="2px" alignItems="center">
              <Text textStyle="pre-caption-2" color="grey.7">
                댓글
              </Text>
              <Text textStyle="pre-caption-1" color="grey.10">
                {data.commentCount}
              </Text>
            </Box>
          </Box>
          <Box display="flex" gap="4px" alignItems="center">
            <HeartIcon size="16px" color="#6A6D71" />
            <Box display="flex" gap="2px" alignItems="center">
              <Text textStyle="pre-caption-2" color="grey.7">
                좋아요
              </Text>
              <Text textStyle="pre-caption-1" color="grey.10">
                {data.likeCount}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default FreeBoardDetailHeaderSection
