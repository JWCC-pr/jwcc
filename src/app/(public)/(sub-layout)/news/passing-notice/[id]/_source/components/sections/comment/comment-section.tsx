'use client'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import Popover from '@/components/popover'
import { PassingNoticeCommentType } from '@/generated/apis/@types/data-contracts'
import { QUERY_KEY_PASSING_NOTICE_API } from '@/generated/apis/PassingNotice/PassingNotice.query'
import {
  QUERY_KEY_PASSING_NOTICE_COMMENT_API,
  usePassingNoticeCommentDestroyMutation,
} from '@/generated/apis/PassingNoticeComment/PassingNoticeComment.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'

interface CommentSectionProps {
  passingNoticeId: number
  comment: PassingNoticeCommentType
  onOpenCommentEdit: () => void
}

const CommentSection: React.FC<CommentSectionProps> = ({
  passingNoticeId,
  comment,
  onOpenCommentEdit,
}) => {
  const { mutateAsync } = usePassingNoticeCommentDestroyMutation({})
  const invalidateQueries = useInvalidateQueries()
  const handleDeleteComment = async () => {
    try {
      await mutateAsync({
        passingNoticeId,
        id: comment.id,
      })

      invalidateQueries(
        QUERY_KEY_PASSING_NOTICE_COMMENT_API.LIST({ passingNoticeId }),
      )
      invalidateQueries(
        QUERY_KEY_PASSING_NOTICE_API.RETRIEVE({ id: passingNoticeId }),
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
      </Box>
    </Box>
  )
}

export default CommentSection
