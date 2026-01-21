'use client'

import { Box } from '@chakra-ui/react/box'

import { CommentDelete } from './comment-delete'
import { ReplyItem } from './reply-item'
import { CommentHooks, CommentType, UseReplyListHook } from './types'

interface ReplyListProps {
  parentId: number
  hooks: CommentHooks
  useReplyList: UseReplyListHook
  onReplyEdit: (reply: CommentType) => void
}

/**
 * 답글 목록 컴포넌트
 * 이 컴포넌트 내부에서 useReplyList 훅을 호출함
 */
export const ReplyList: React.FC<ReplyListProps> = ({
  parentId,
  hooks,
  useReplyList,
  onReplyEdit,
}) => {
  // 답글 목록 조회
  const { data: replies, isLoading } = useReplyList(parentId)

  if (isLoading || !replies || replies.count === 0) return null

  return (
    <>
      {replies.results?.map((reply) => {
        if (reply.isDeleted) {
          return (
            <Box key={reply.id} pl="36px">
              <CommentDelete />
            </Box>
          )
        }

        return (
          <Box key={reply.id} display="flex" flexFlow="column">
            <ReplyItem
              reply={reply}
              hooks={hooks}
              onOpenEdit={() => onReplyEdit(reply)}
            />
          </Box>
        )
      })}
    </>
  )
}
