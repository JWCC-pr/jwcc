'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'

import { PassingNoticeCommentType } from '@/generated/apis/@types/data-contracts'

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

  return (
    <Box as="li" display="flex" flexFlow="column">
      {/* 댓글 영역 */}
      {!isOpenCommentEdit && (
        <CommentSection
          passingNoticeId={passingNoticeId}
          comment={comment}
          onOpenCommentEdit={handleOpenCommentEdit}
        />
      )}

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
