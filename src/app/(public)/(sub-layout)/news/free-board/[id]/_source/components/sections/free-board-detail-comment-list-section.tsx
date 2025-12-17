import { Box } from '@chakra-ui/react/box'

import { useBoardCommentListQuery } from '@/generated/apis/BoardComment/BoardComment.query'

import CommentContainerSection from './comment/comment-container-section'

interface FreeBoardDetailCommentListSectionProps {
  boardId: number
}

const FreeBoardDetailCommentListSection: React.FC<
  FreeBoardDetailCommentListSectionProps
> = ({ boardId }) => {
  const { data: comments } = useBoardCommentListQuery({
    variables: {
      boardId,
    },
  })

  if (!comments) return null
  if (comments.count === 0) return null

  return (
    <Box as="ul" display="flex" flexFlow="column" bgColor="background.basic.1">
      {comments.results?.map((comment) => (
        <CommentContainerSection
          key={comment.id}
          boardId={boardId}
          comment={comment}
        />
      ))}
    </Box>
  )
}

export default FreeBoardDetailCommentListSection
