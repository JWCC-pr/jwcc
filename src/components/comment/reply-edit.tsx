'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { Textarea } from '@chakra-ui/react/textarea'

import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'

import { CommentHooks, CommentType } from './types'

interface ReplyEditProps {
  comment: Pick<CommentType, 'id' | 'user'>
  reply: Pick<CommentType, 'id' | 'body'>
  hooks: CommentHooks
  onClose: () => void
  placeholder?: string
}

/**
 * 답글 수정 컴포넌트
 */
export const ReplyEdit: React.FC<ReplyEditProps> = ({
  comment,
  reply,
  hooks,
  onClose,
  placeholder = '답글을 입력하세요',
}) => {
  const [body, setBody] = useState(reply.body)
  const invalidateQueries = useInvalidateQueries()

  const handleUpdateReply: React.FormEventHandler<HTMLDivElement> = async (
    e,
  ) => {
    e.preventDefault()

    if (!body.trim()) return

    try {
      await hooks.updateComment({ id: reply.id, body, parentId: comment.id })
      invalidateQueries(hooks.getListQueryKey())
      setBody('')
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box
      as="form"
      onSubmit={handleUpdateReply}
      p="16px 12px 20px 36px"
      display="flex"
      flexFlow="column"
      gap="10px"
      bgColor="background.basic.2"
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
          placeholder={placeholder}
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
