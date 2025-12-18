'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { Textarea } from '@chakra-ui/react/textarea'
import { CaretRightIcon, ChatCircleDotsIcon } from '@phosphor-icons/react'

import { QUERY_KEY_PASSING_NOTICE_API } from '@/generated/apis/PassingNotice/PassingNotice.query'
import {
  QUERY_KEY_PASSING_NOTICE_COMMENT_API,
  usePassingNoticeCommentCreateMutation,
} from '@/generated/apis/PassingNoticeComment/PassingNoticeComment.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import useMe from '@/hooks/useMe'

interface NewsPassingNoticeDetailCommentInputSectionProps {
  passingNoticeId: number
}

const NewsPassingNoticeDetailCommentInputSection: React.FC<
  NewsPassingNoticeDetailCommentInputSectionProps
> = ({ passingNoticeId }) => {
  const { data: me } = useMe()

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)

  const [body, setBody] = useState('')

  const { mutateAsync } = usePassingNoticeCommentCreateMutation({})

  const invalidateQueries = useInvalidateQueries()

  const handleCreateComment: React.FormEventHandler<HTMLDivElement> = async (
    e,
  ) => {
    e.preventDefault()

    if (!body.trim()) return

    try {
      await mutateAsync({
        passingNoticeId,
        data: {
          body,
        },
      })

      invalidateQueries(
        QUERY_KEY_PASSING_NOTICE_COMMENT_API.LIST({ passingNoticeId }),
      )
      invalidateQueries(
        QUERY_KEY_PASSING_NOTICE_API.RETRIEVE({ id: passingNoticeId }),
      )

      setBody('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {!isOpen && (
        <Box
          py="16px"
          cursor="pointer"
          borderBottom="1px solid"
          borderBottomColor="border.basic.1"
        >
          <Box
            p="16px"
            display="flex"
            gap="10px"
            alignItems="center"
            rounded="8px"
            bgColor="background.basic.2"
            onClick={handleOpen}
          >
            <ChatCircleDotsIcon size="24px" color="#6A6D71" />
            <Text flex="1" textStyle="pre-body-4" color="grey.7">
              댓글을 남겨보세요
            </Text>
            <CaretRightIcon size="24px" color="#6A6D71" />
          </Box>
        </Box>
      )}

      {isOpen && (
        <Box
          as="form"
          onSubmit={handleCreateComment}
          p="16px 12px"
          display="flex"
          flexFlow="column"
          gap="10px"
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
              size="lg"
              variant="outline"
              colorPalette="grey"
              h="84px"
              placeholder="댓글을 남겨보세요"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Box>

          <Button
            type="submit"
            w="80px"
            alignSelf="flex-end"
            size="sm"
            variant="solid"
            colorPalette="primary"
            disabled={!body}
          >
            등록
          </Button>
        </Box>
      )}
    </>
  )
}

export default NewsPassingNoticeDetailCommentInputSection
