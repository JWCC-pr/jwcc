'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'

import { LiturgyFlowerCommentType } from '@/generated/apis/@types/data-contracts'

import ReplyInputEditSection from './reply-input-edit-section'
import ReplySection from './reply-section'

interface ReplyContainerSectionProps {
  liturgyFlowerId: number
  comment: Pick<LiturgyFlowerCommentType, 'user' | 'id'>
  reply: LiturgyFlowerCommentType
}

const ReplyContainerSection: React.FC<ReplyContainerSectionProps> = ({
  liturgyFlowerId,
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
          liturgyFlowerId={liturgyFlowerId}
          reply={reply}
          onOpenReplyEdit={handleOpenReplyEdit}
        />
      )}

      {/* 답글 수정 영역 */}
      {isOpenReplyEdit && (
        <ReplyInputEditSection
          liturgyFlowerId={liturgyFlowerId}
          commentId={comment.id}
          reply={reply}
          onClose={handleCloseReplyEdit}
        />
      )}
    </Box>
  )
}

export default ReplyContainerSection
