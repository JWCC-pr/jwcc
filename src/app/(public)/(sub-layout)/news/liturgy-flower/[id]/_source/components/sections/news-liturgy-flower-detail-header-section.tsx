'use client'

import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { ChatCircleDotsIcon, HeartIcon } from '@phosphor-icons/react'

import { format } from 'date-fns/format'

import Popover from '@/components/popover'
import { ROUTES } from '@/constants/routes'
import { LiturgyFlowerType } from '@/generated/apis/@types/data-contracts'
import {
  QUERY_KEY_LITURGY_FLOWER_API,
  useLiturgyFlowerDestroyMutation,
} from '@/generated/apis/LiturgyFlower/LiturgyFlower.query'
import { useLiturgyFlowerLikeToggleCreateMutation } from '@/generated/apis/LiturgyFlowerLike/LiturgyFlowerLike.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'

interface NewsLiturgyFlowerDetailHeaderSectionProps {
  liturgyFlower: Pick<
    LiturgyFlowerType,
    | 'id'
    | 'title'
    | 'user'
    | 'createdAt'
    | 'hitCount'
    | 'commentCount'
    | 'likeCount'
  >
}

const NewsLiturgyFlowerDetailHeaderSection: React.FC<
  NewsLiturgyFlowerDetailHeaderSectionProps
> = ({ liturgyFlower }) => {
  const router = useRouter()
  const invalidateQueries = useInvalidateQueries()

  const { mutateAsync: liturgyFlowerLikeToggleCreateMutateAsync } =
    useLiturgyFlowerLikeToggleCreateMutation({})
  const handleClickLike = async () => {
    try {
      await liturgyFlowerLikeToggleCreateMutateAsync({
        liturgyFlowerId: liturgyFlower.id,
      })

      invalidateQueries(
        QUERY_KEY_LITURGY_FLOWER_API.RETRIEVE({ id: liturgyFlower.id }),
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickEdit = () => {
    router.push(ROUTES.NEWS_LITURGY_FLOWER_EDIT(liturgyFlower.id))
  }

  const { mutateAsync: liturgyFlowerDestroyMutateAsync } =
    useLiturgyFlowerDestroyMutation({})
  const handleClickDelete = async () => {
    // FIXME: API
    // if (!liturgyFlower.isOwned) return

    try {
      await liturgyFlowerDestroyMutateAsync({ id: liturgyFlower.id })

      router.replace(ROUTES.NEWS_LITURGY_FLOWER)
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
          {liturgyFlower.title}
        </Text>
        <Box>
          <IconButton
            size="md"
            variant="ghost"
            colorPalette="grey"
            onClick={handleClickLike}
          >
            <HeartIcon
              size="20px"
              // FIXME: 좋아요 상태에 따라 색상 변경
              //   color={liturgyFlower.isLiked ? '#AE3059' : '#6A6D71'}
              //   weight={liturgyFlower.isLiked ? 'fill' : 'regular'}
            />
          </IconButton>
          {/* FIXME: 작성자인지 여부에 따라 보여주기 처리 */}
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
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" flexFlow="column" gap="2px">
          <Box display="flex" gap="6px">
            <Text textStyle="pre-body-5" color="grey.10">
              {liturgyFlower.user.name}
            </Text>
            <Text textStyle="pre-body-6" color="grey.7">
              {liturgyFlower.user.baptismalName}
            </Text>
          </Box>
          <Box display="flex" gap="10px">
            <Text textStyle="pre-caption-2" color="grey.7">
              {format(liturgyFlower.createdAt, 'yyyy-MM-dd')}
            </Text>
            <Box display="flex" gap="4px">
              <Text textStyle="pre-caption-2" color="grey.7">
                조회
              </Text>
              <Text textStyle="pre-caption-2" color="grey.7">
                {liturgyFlower.hitCount}
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
                {liturgyFlower.commentCount}
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
                {liturgyFlower.likeCount}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NewsLiturgyFlowerDetailHeaderSection
