import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { ChatCircleDotsIcon, HeartIcon } from '@phosphor-icons/react'

import { format } from 'date-fns/format'

import Popover from '@/components/popover'
import { ROUTES } from '@/constants/routes'
import { BoardType } from '@/generated/apis/@types/data-contracts'
import {
  QUERY_KEY_BOARD_API,
  useBoardDestroyMutation,
} from '@/generated/apis/Board/Board.query'
import { useBoardLikeToggleCreateMutation } from '@/generated/apis/BoardLike/BoardLike.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import useMe from '@/hooks/useMe'

interface FreeBoardDetailHeaderSectionProps {
  data: Pick<
    BoardType,
    | 'id'
    | 'title'
    | 'user'
    | 'createdAt'
    | 'hitCount'
    | 'commentCount'
    | 'likeCount'
    | 'isOwned'
    | 'isLiked'
  >
}

const FreeBoardDetailHeaderSection: React.FC<
  FreeBoardDetailHeaderSectionProps
> = ({ data }) => {
  const { isLoggedIn } = useMe()

  const router = useRouter()
  const invalidateQueries = useInvalidateQueries()

  const { mutateAsync: boardLikeToggleCreateMutateAsync } =
    useBoardLikeToggleCreateMutation({})
  const handleClickLike = async () => {
    try {
      await boardLikeToggleCreateMutateAsync({ boardId: data.id })

      invalidateQueries(QUERY_KEY_BOARD_API.RETRIEVE({ id: data.id }))
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickEdit = () => {
    router.push(ROUTES.NEWS_FREE_BOARD_EDIT(data.id))
  }

  const { mutateAsync: boardDestroyMutateAsync } = useBoardDestroyMutation({})
  const handleClickDelete = async () => {
    if (!data.isOwned) return

    try {
      await boardDestroyMutateAsync({ id: data.id })

      router.replace(ROUTES.NEWS_FREE_BOARD)
    } catch (error) {
      console.error(error)
    }
  }

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
        {isLoggedIn && (
          <Box>
            <IconButton
              size="md"
              variant="ghost"
              colorPalette="grey"
              onClick={handleClickLike}
            >
              <HeartIcon
                size="20px"
                color={data.isLiked ? '#AE3059' : '#6A6D71'}
                weight={data.isLiked ? 'fill' : 'regular'}
              />
            </IconButton>
            {data.isOwned && (
              <Popover
                options={[
                  { label: '수정', onClick: handleClickEdit },
                  {
                    label: '삭제',
                    onClick: handleClickDelete,
                    styles: { color: 'accent.red2' },
                  },
                ]}
              />
            )}
          </Box>
        )}
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
