'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'

import { CommentDelete } from './comment-delete'
import { CommentEdit } from './comment-edit'
import { CommentItem } from './comment-item'
import { ReplyEdit } from './reply-edit'
import { ReplyInput } from './reply-input'
import { ReplyList } from './reply-list'
import { CommentHooks, CommentType, UseReplyListHook } from './types'

interface CommentContainerProps {
  comment: CommentType
  hooks: CommentHooks
  useReplyList: UseReplyListHook
}

/**
 * 댓글 컨테이너 컴포넌트 (댓글 + 답글 관리)
 */
export const CommentContainer: React.FC<CommentContainerProps> = ({
  comment,
  hooks,
  useReplyList,
}) => {
  const [isOpenCommentEdit, setIsOpenCommentEdit] = useState(false)
  const handleOpenCommentEdit = () => setIsOpenCommentEdit(true)
  const handleCloseCommentEdit = () => setIsOpenCommentEdit(false)

  const [isOpenReplyWrite, setIsOpenReplyWrite] = useState(false)
  const handleOpenReplyWrite = () => setIsOpenReplyWrite(true)
  const handleCloseReplyWrite = () => setIsOpenReplyWrite(false)

  const [editingReply, setEditingReply] = useState<CommentType | null>(null)
  const handleReplyEdit = (reply: CommentType) => setEditingReply(reply)
  const handleCloseReplyEdit = () => setEditingReply(null)

  const isDeleted = comment.isDeleted

  return (
    <Box as="li" display="flex" flexFlow="column">
      {/* 댓글 영역 */}
      {isDeleted ?
        /* 댓글이 삭제된 경우 */
        <CommentDelete />
      : /* 일반 댓글 영역 */
        !isOpenCommentEdit && (
          <CommentItem
            comment={comment}
            hooks={hooks}
            onOpenEdit={handleOpenCommentEdit}
            onOpenReplyWrite={handleOpenReplyWrite}
          />
        )
      }

      {/* 댓글 수정 영역 */}
      {isOpenCommentEdit && (
        <CommentEdit
          comment={comment}
          hooks={hooks}
          onClose={handleCloseCommentEdit}
        />
      )}

      {/* 답글 목록 영역 */}
      <ReplyList
        parentId={comment.id}
        hooks={hooks}
        useReplyList={useReplyList}
        onReplyEdit={handleReplyEdit}
      />

      {/* 답글 수정 영역 */}
      {editingReply && (
        <ReplyEdit
          comment={comment}
          reply={editingReply}
          hooks={hooks}
          onClose={handleCloseReplyEdit}
        />
      )}

      {/* 답글 쓰기 영역 */}
      {isOpenReplyWrite && (
        <ReplyInput
          comment={comment}
          hooks={hooks}
          onClose={handleCloseReplyWrite}
        />
      )}
    </Box>
  )
}
