import { Box } from '@chakra-ui/react/box'

import { usePassingNoticeCommentListQuery } from '@/generated/apis/PassingNoticeComment/PassingNoticeComment.query'

import CommentContainerSection from './comment/comment-container-section'

interface NewsPassingNoticeDetailCommentListSectionProps {
  passingNoticeId: number
}

const NewsPassingNoticeDetailCommentListSection: React.FC<
  NewsPassingNoticeDetailCommentListSectionProps
> = ({ passingNoticeId }) => {
  const { data: comments } = usePassingNoticeCommentListQuery({
    variables: {
      passingNoticeId,
    },
  })

  if (!comments) return null
  if (comments.count === 0) return null

  return (
    <Box as="ul" display="flex" flexFlow="column" bgColor="background.basic.1">
      {comments.results?.map((comment) => (
        <CommentContainerSection
          key={comment.id}
          passingNoticeId={passingNoticeId}
          comment={comment}
        />
      ))}
    </Box>
  )
}

export default NewsPassingNoticeDetailCommentListSection
