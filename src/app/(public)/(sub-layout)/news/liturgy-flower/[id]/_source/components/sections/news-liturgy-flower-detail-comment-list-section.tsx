import { Box } from '@chakra-ui/react/box'

import { useLiturgyFlowerCommentListQuery } from '@/generated/apis/LiturgyFlowerComment/LiturgyFlowerComment.query'

import CommentContainerSection from './comment/comment-container-section'

interface NewsLiturgyFlowerDetailCommentListSectionProps {
  liturgyFlowerId: number
}

const NewsLiturgyFlowerDetailCommentListSection: React.FC<
  NewsLiturgyFlowerDetailCommentListSectionProps
> = ({ liturgyFlowerId }) => {
  const { data: comments } = useLiturgyFlowerCommentListQuery({
    variables: {
      liturgyFlowerId,
    },
  })

  if (!comments) return null
  if (comments.count === 0) return null

  return (
    <Box as="ul" display="flex" flexFlow="column" bgColor="background.basic.1">
      {comments.results?.map((comment) => (
        <CommentContainerSection
          key={comment.id}
          liturgyFlowerId={liturgyFlowerId}
          comment={comment}
        />
      ))}
    </Box>
  )
}

export default NewsLiturgyFlowerDetailCommentListSection
