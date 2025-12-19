'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import Popover from '@/components/popover'
import { LiturgyFlowerCommentType } from '@/generated/apis/@types/data-contracts'
import { QUERY_KEY_LITURGY_FLOWER_API } from '@/generated/apis/LiturgyFlower/LiturgyFlower.query'
import {
  QUERY_KEY_LITURGY_FLOWER_COMMENT_API,
  useLiturgyFlowerCommentDestroyMutation,
} from '@/generated/apis/LiturgyFlowerComment/LiturgyFlowerComment.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import useMe from '@/hooks/useMe'

interface CommentSectionProps {
  liturgyFlowerId: number
  comment: LiturgyFlowerCommentType
  onOpenCommentEdit: () => void
  onOpenReplyWrite: () => void
}

const CommentSection: React.FC<CommentSectionProps> = ({
  liturgyFlowerId,
  comment,
  onOpenCommentEdit,
  onOpenReplyWrite,
}) => {
  const { isLoggedIn } = useMe()

  const { mutateAsync } = useLiturgyFlowerCommentDestroyMutation({})
  const invalidateQueries = useInvalidateQueries()
  const handleDeleteComment = async () => {
    try {
      await mutateAsync({
        liturgyFlowerId,
        id: comment.id,
      })

      invalidateQueries(
        QUERY_KEY_LITURGY_FLOWER_COMMENT_API.LIST({ liturgyFlowerId }),
      )
      invalidateQueries(
        QUERY_KEY_LITURGY_FLOWER_API.RETRIEVE({ id: liturgyFlowerId }),
      )
    } catch (error) {
      console.error(error)
    }
  }

  const isOwned = comment.isOwned

  return (
    <Box
      p="16px 12px 20px"
      display="flex"
      flexFlow="column"
      gap="6px"
      borderBottom="1px solid"
      borderBottomColor="border.basic.1"
    >
      <Box display="flex" flexFlow="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap="6px">
            <Text textStyle="pre-body-5" color="grey.10">
              {comment.user.name}
            </Text>
            <Text textStyle="pre-body-6" color="grey.7">
              {comment.user.baptismalName}
            </Text>
          </Box>
          {isOwned && (
            <Popover
              options={[
                { label: '수정', onClick: onOpenCommentEdit },
                {
                  label: '삭제',
                  onClick: handleDeleteComment,
                  styles: { color: 'accent.red2' },
                },
              ]}
            />
          )}
        </Box>
        <Text textStyle="pre-body-4" color="grey.10" whiteSpace="pre-wrap">
          {comment.body}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" gap="10px">
        <Text textStyle="pre-caption-2" color="grey.7">
          {format(comment.createdAt, 'yyyy-MM-dd')}
        </Text>
        {comment.isModified && (
          <Text textStyle="pre-caption-2" color="grey.7">
            (수정됨)
          </Text>
        )}
        {isLoggedIn && (
          <Button
            size="sm"
            variant="ghost"
            colorPalette="primary"
            onClick={onOpenReplyWrite}
          >
            답글쓰기
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default CommentSection
