'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'

import { PassingNoticeCommentType } from '@/generated/apis/@types/data-contracts'

import CommentDeleteSection from './comment-delete-section'
import CommentInputEditSection from './comment-input-edit-section'
import CommentSection from './comment-section'

interface CommentContainerSectionProps {
  passingNoticeId: number
  comment: PassingNoticeCommentType
}
const CommentContainerSection: React.FC<CommentContainerSectionProps> = ({
  passingNoticeId,
  comment,
}) => {
  const [isOpenCommentEdit, setIsOpenCommentEdit] = useState(false)
  const handleOpenCommentEdit = () => setIsOpenCommentEdit(true)
  const handleCloseCommentEdit = () => setIsOpenCommentEdit(false)

  const isDeleted = comment.isDeleted

  return (
    <Box as="li" display="flex" flexFlow="column">
      {/* 댓글 영역 */}
      {isDeleted ?
        /* 댓글이 삭제된 경우 "(삭제된 댓글입니다)" 표시 */
        <CommentDeleteSection />
      : /* 일반 댓글 영역 */
        !isOpenCommentEdit && (
          <CommentSection
            passingNoticeId={passingNoticeId}
            comment={comment}
            onOpenCommentEdit={handleOpenCommentEdit}
          />
        )
      }

      {/* 댓글 수정 영역 */}
      {isOpenCommentEdit && (
        <CommentInputEditSection
          passingNoticeId={passingNoticeId}
          comment={comment}
          onClose={handleCloseCommentEdit}
        />
      )}
    </Box>
  )
}

export default CommentContainerSection
