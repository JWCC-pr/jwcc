'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'

import { LiturgyFlowerCommentType } from '@/generated/apis/@types/data-contracts'
import { useLiturgyFlowerCommentListQuery } from '@/generated/apis/LiturgyFlowerComment/LiturgyFlowerComment.query'

import CommentDeleteSection from './comment-delete-section'
import CommentInputEditSection from './comment-input-edit-section'
import CommentSection from './comment-section'
import ReplyContainerSection from './reply-container-section'
import ReplyInputSection from './reply-input-section'

interface CommentContainerSectionProps {
  liturgyFlowerId: number
  comment: LiturgyFlowerCommentType
}
const CommentContainerSection: React.FC<CommentContainerSectionProps> = ({
  liturgyFlowerId,
  comment,
}) => {
  const [isOpenCommentEdit, setIsOpenCommentEdit] = useState(false)
  const handleOpenCommentEdit = () => setIsOpenCommentEdit(true)
  const handleCloseCommentEdit = () => setIsOpenCommentEdit(false)

  const [isOpenReplyWrite, setIsOpenReplyWrite] = useState(false)
  const handleOpenReplyWrite = () => setIsOpenReplyWrite(true)
  const handleCloseReplyWrite = () => setIsOpenReplyWrite(false)

  const { data: replies } = useLiturgyFlowerCommentListQuery({
    variables: {
      liturgyFlowerId,
      query: {
        parent_id: comment.id,
      },
    },
  })

  const isDeleted = comment.isDeleted
  const hasReply =
    (replies?.results?.filter((reply) => !reply.isDeleted).length ?? 0) > 0

  /** 댓글이 삭제되었고, 답글이 있는 경우 "(삭제된 댓글입니다)" 표시 */
  const isDeletedAndHasReply = isDeleted && hasReply

  if (!isDeletedAndHasReply && isDeleted) return null

  return (
    <Box as="li" display="flex" flexFlow="column">
      {/* 댓글 영역 */}
      {isDeletedAndHasReply ?
        /* 댓글이 삭제되었고, 답글이 있는 경우 "(삭제된 댓글입니다)" 표시 */
        <CommentDeleteSection />
      : /* 일반 댓글 영역 */
        !isOpenCommentEdit && (
          <CommentSection
            liturgyFlowerId={liturgyFlowerId}
            comment={comment}
            onOpenCommentEdit={handleOpenCommentEdit}
            onOpenReplyWrite={handleOpenReplyWrite}
          />
        )
      }

      {/* 댓글 수정 영역 */}
      {isOpenCommentEdit && (
        <CommentInputEditSection
          liturgyFlowerId={liturgyFlowerId}
          comment={comment}
          onClose={handleCloseCommentEdit}
        />
      )}

      {/* 답글 영역 */}
      {replies?.results
        ?.filter((reply) => !reply.isDeleted)
        .map((reply) => (
          <ReplyContainerSection
            key={reply.id}
            liturgyFlowerId={liturgyFlowerId}
            comment={comment}
            reply={reply}
          />
        ))}

      {/* 답글 쓰기 영역 */}
      {isOpenReplyWrite && (
        <ReplyInputSection
          liturgyFlowerId={liturgyFlowerId}
          comment={comment}
          onClose={handleCloseReplyWrite}
        />
      )}
    </Box>
  )
}

export default CommentContainerSection
