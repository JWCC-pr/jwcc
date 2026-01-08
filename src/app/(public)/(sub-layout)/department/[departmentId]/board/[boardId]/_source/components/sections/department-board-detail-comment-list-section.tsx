import { Box } from '@chakra-ui/react/box'

import { useDepartmentBoardCommentListQuery } from '@/generated/apis/DepartmentBoardComment/DepartmentBoardComment.query'

import CommentContainerSection from './comment/comment-container-section'

interface DepartmentBoardDetailCommentListSectionProps {
  departmentId: number
  boardId: number
}

const DepartmentBoardDetailCommentListSection: React.FC<
  DepartmentBoardDetailCommentListSectionProps
> = ({ boardId }) => {
  const { data: comments } = useDepartmentBoardCommentListQuery({
    variables: {
      departmentBoardId: boardId,
    },
  })

  if (!comments) return null
  if (comments.count === 0) return null

  const topLevelComments = comments.results || []

  return (
    <Box as="ul" display="flex" flexFlow="column" bgColor="background.basic.1">
      {topLevelComments.map((comment) => (
        <CommentContainerSection
          key={comment.id}
          boardId={boardId}
          comment={comment}
        />
      ))}
    </Box>
  )
}

export default DepartmentBoardDetailCommentListSection
