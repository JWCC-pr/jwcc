'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { Textarea } from '@chakra-ui/react/textarea'

import { DepartmentBoardCommentType } from '@/generated/apis/@types/data-contracts'
import { QUERY_KEY_DEPARTMENT_BOARD_API } from '@/generated/apis/DepartmentBoard/DepartmentBoard.query'
import {
  QUERY_KEY_DEPARTMENT_BOARD_COMMENT_API,
  useDepartmentBoardCommentCreateMutation,
} from '@/generated/apis/DepartmentBoardComment/DepartmentBoardComment.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import useMe from '@/hooks/useMe'

interface ReplyInputSectionProps {
  boardId: number
  comment: Pick<DepartmentBoardCommentType, 'user' | 'id'>
  onClose: () => void
}

const ReplyInputSection: React.FC<ReplyInputSectionProps> = ({
  boardId,
  comment,
  onClose,
}) => {
  const { data: me } = useMe()

  const [body, setBody] = useState('')

  const { mutateAsync } = useDepartmentBoardCommentCreateMutation({})
  const invalidateQueries = useInvalidateQueries()

  const handleCreateReply: React.FormEventHandler<HTMLDivElement> = async (
    e,
  ) => {
    e.preventDefault()

    if (!body.trim()) return

    try {
      await mutateAsync({
        departmentBoardId: boardId,
        data: {
          parentId: comment.id,
          body: body,
        },
      })

      invalidateQueries(
        QUERY_KEY_DEPARTMENT_BOARD_COMMENT_API.LIST({
          departmentBoardId: boardId,
        }),
      )
      invalidateQueries(
        QUERY_KEY_DEPARTMENT_BOARD_API.RETRIEVE({ id: boardId }),
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
      onSubmit={handleCreateReply}
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
              {me?.name}
            </Text>
            <Text textStyle="pre-body-6" color="grey.7">
              {me?.baptismalName}
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
          placeholder="답글을 입력하세요"
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
          disabled={!body}
        >
          등록
        </Button>
      </Box>
    </Box>
  )
}

export default ReplyInputSection
