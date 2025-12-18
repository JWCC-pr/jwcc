'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { Textarea } from '@chakra-ui/react/textarea'

import { PassingNoticeCommentType } from '@/generated/apis/@types/data-contracts'
import {
  QUERY_KEY_PASSING_NOTICE_COMMENT_API,
  usePassingNoticeCommentUpdateMutation,
} from '@/generated/apis/PassingNoticeComment/PassingNoticeComment.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'

interface CommentInputEditSectionProps {
  passingNoticeId: number
  comment: Pick<PassingNoticeCommentType, 'id' | 'body' | 'user'>
  onClose: () => void
}

const CommentInputEditSection: React.FC<CommentInputEditSectionProps> = ({
  passingNoticeId,
  comment,
  onClose,
}) => {
  const [body, setBody] = useState(comment.body)

  const { mutateAsync } = usePassingNoticeCommentUpdateMutation({})
  const invalidateQueries = useInvalidateQueries()

  const handleCreateComment: React.FormEventHandler<HTMLDivElement> = async (
    e,
  ) => {
    e.preventDefault()

    if (!body.trim()) return

    try {
      await mutateAsync({
        passingNoticeId,
        id: comment.id,
        data: { body },
      })

      invalidateQueries(
        QUERY_KEY_PASSING_NOTICE_COMMENT_API.LIST({ passingNoticeId }),
      )

      setBody('')
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box
      as="form"
      onSubmit={handleCreateComment}
      p="16px 12px 20px"
      display="flex"
      flexFlow="column"
      gap="10px"
    >
      <Box display="flex" flexFlow="column" gap="6px">
        <Box
          h="32px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" gap="6px" alignItems="center">
            <Text textStyle="pre-body-5" color="grey.10">
              {comment.user.name}
            </Text>
            <Text textStyle="pre-body-6" color="grey.7">
              {comment.user.baptismalName}
            </Text>
          </Box>
          <Text textStyle="pre-caption-2" color="grey.6">
            {body.length}/300
          </Text>
        </Box>
        <Textarea
          autoFocus
          size="lg"
          variant="outline"
          colorPalette="grey"
          h="84px"
          placeholder="댓글을 남겨보세요"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </Box>

      <Box display="flex" justifyContent="flex-end" gap="6px">
        <Button
          type="button"
          w="80px"
          size="sm"
          variant="solid"
          colorPalette="grey"
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          type="submit"
          w="80px"
          alignSelf="flex-end"
          size="sm"
          variant="solid"
          colorPalette="primary"
          disabled={!body.trim()}
        >
          수정
        </Button>
      </Box>
    </Box>
  )
}

export default CommentInputEditSection
