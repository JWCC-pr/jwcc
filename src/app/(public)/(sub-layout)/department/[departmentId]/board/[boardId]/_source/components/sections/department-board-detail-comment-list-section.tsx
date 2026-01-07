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

  // TODO: API가 parent_id를 지원하지 않으면 최상위 댓글만 필터링 필요
  // 현재는 모든 댓글을 표시
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
