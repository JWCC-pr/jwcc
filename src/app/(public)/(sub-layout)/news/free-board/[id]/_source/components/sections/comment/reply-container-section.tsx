'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'

import { BoardCommentType } from '@/generated/apis/@types/data-contracts'

import ReplyInputEditSection from './reply-input-edit-section'
import ReplySection from './reply-section'

interface ReplyContainerSectionProps {
  boardId: number
  comment: Pick<BoardCommentType, 'user' | 'id'>
  reply: BoardCommentType
}

const ReplyContainerSection: React.FC<ReplyContainerSectionProps> = ({
  boardId,
  comment,
  reply,
}) => {
  const [isOpenReplyEdit, setIsOpenReplyEdit] = useState(false)
  const handleOpenReplyEdit = () => setIsOpenReplyEdit(true)
  const handleCloseReplyEdit = () => setIsOpenReplyEdit(false)

  return (
    <Box display="flex" flexFlow="column">
      {/* 답글 영역 */}
      {!isOpenReplyEdit && (
        <ReplySection
          key={reply.id}
          boardId={boardId}
          reply={reply}
          onOpenReplyEdit={handleOpenReplyEdit}
        />
      )}

      {/* 답글 수정 영역 */}
      {isOpenReplyEdit && (
        <ReplyInputEditSection
          boardId={boardId}
          commentId={comment.id}
          reply={reply}
          onClose={handleCloseReplyEdit}
        />
      )}
    </Box>
  )
}

export default ReplyContainerSection
