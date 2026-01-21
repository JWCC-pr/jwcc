'use client'

import { Box } from '@chakra-ui/react/box'

import { CommentContainer } from './comment-container'
import { CommentHooks, UseReplyListHook } from './types'

interface CommentListProps {
  hooks: CommentHooks
  useReplyList: UseReplyListHook
}

/**
 * 댓글 목록 컴포넌트
 */
export const CommentList: React.FC<CommentListProps> = ({
  hooks,
  useReplyList,
}) => {
  const { data: comments, isLoading } = hooks.useCommentList()

  if (isLoading || !comments || comments.count === 0) return null

  return (
    <Box as="ul" display="flex" flexFlow="column" bgColor="background.basic.1">
      {comments.results?.map((comment) => (
        <CommentContainer
          key={comment.id}
          comment={comment}
          hooks={hooks}
          useReplyList={useReplyList}
        />
      ))}
    </Box>
  )
}
