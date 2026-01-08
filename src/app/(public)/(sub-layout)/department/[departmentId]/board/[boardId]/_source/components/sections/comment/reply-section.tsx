import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import Popover from '@/components/popover'
import { DepartmentBoardCommentType } from '@/generated/apis/@types/data-contracts'
import { QUERY_KEY_DEPARTMENT_BOARD_API } from '@/generated/apis/DepartmentBoard/DepartmentBoard.query'
import {
  QUERY_KEY_DEPARTMENT_BOARD_COMMENT_API,
  useDepartmentBoardCommentDestroyMutation,
} from '@/generated/apis/DepartmentBoardComment/DepartmentBoardComment.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'

interface ReplySectionProps {
  boardId: number
  reply: DepartmentBoardCommentType
  onOpenReplyEdit: () => void
}
const ReplySection: React.FC<ReplySectionProps> = ({
  boardId,
  reply,
  onOpenReplyEdit,
}) => {
  const { mutateAsync } = useDepartmentBoardCommentDestroyMutation({})
  const invalidateQueries = useInvalidateQueries()
  const handleDeleteReply = async () => {
    try {
      await mutateAsync({
        departmentBoardId: boardId,
        id: reply.id,
      })

      invalidateQueries(
        QUERY_KEY_DEPARTMENT_BOARD_COMMENT_API.LIST({
          departmentBoardId: boardId,
        }),
      )
      invalidateQueries(
        QUERY_KEY_DEPARTMENT_BOARD_API.RETRIEVE({ id: boardId }),
      )
    } catch (error) {
      console.error(error)
    }
  }

  const isOwned = reply.isOwned

  return (
    <Box
      p="16px 12px 20px 36px"
      display="flex"
      flexFlow="column"
      gap="6px"
      borderBottom="1px solid"
      borderBottomColor="border.basic.1"
      bgColor="background.basic.2"
    >
      <Box display="flex" flexFlow="column">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap="6px">
            <Text textStyle="pre-body-5" color="grey.10">
              {reply.user.name}
            </Text>
            <Text textStyle="pre-body-6" color="grey.7">
              {reply.user.baptismalName}
            </Text>
          </Box>
          {isOwned && (
            <Popover
              options={[
                { label: '수정', onClick: onOpenReplyEdit },
                {
                  label: '삭제',
                  onClick: handleDeleteReply,
                  styles: { color: 'accent.red2' },
                },
              ]}
            />
          )}
        </Box>
        <Text textStyle="pre-body-4" color="grey.10" whiteSpace="pre-wrap">
          {reply.body}
        </Text>
      </Box>
      <Box display="flex" alignItems="center" gap="10px">
        <Text textStyle="pre-caption-2" color="grey.7">
          {format(reply.createdAt, 'yyyy-MM-dd')}
        </Text>
        {reply.isModified && (
          <Text textStyle="pre-caption-2" color="grey.7">
            (수정됨)
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default ReplySection
