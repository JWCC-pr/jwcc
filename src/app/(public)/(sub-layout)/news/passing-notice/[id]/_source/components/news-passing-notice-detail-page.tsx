'use client'

import { Box } from '@chakra-ui/react/box'

import { usePassingNoticeRetrieveQuery } from '@/generated/apis/PassingNotice/PassingNotice.query'

import NewsPassingNoticeDetailActionSection from './sections/news-passing-notice-detail-action-section'
import NewsPassingNoticeDetailCommentInfoSection from './sections/news-passing-notice-detail-comment-info-section'
import NewsPassingNoticeDetailCommentInputSection from './sections/news-passing-notice-detail-comment-input-section'
import NewsPassingNoticeDetailCommentListSection from './sections/news-passing-notice-detail-comment-list-section'
import NewsPassingNoticeDetailHeaderSection from './sections/news-passing-notice-detail-header-section'
import NewsPassingNoticeDetailInfoSection from './sections/news-passing-notice-detail-info-section'

interface NewsPassingNoticeDetailPageProps {
  passingNoticeId: number
}

const NewsPassingNoticeDetailPage: React.FC<
  NewsPassingNoticeDetailPageProps
> = ({ passingNoticeId }) => {
  const { data: passingNotice } = usePassingNoticeRetrieveQuery({
    variables: {
      id: passingNoticeId,
    },
  })

  if (!passingNotice) return null

  return (
    <Box display="flex" flexDirection="column">
      <NewsPassingNoticeDetailHeaderSection passingNotice={passingNotice} />

      <NewsPassingNoticeDetailInfoSection passingNotice={passingNotice} />

      <NewsPassingNoticeDetailCommentInfoSection
        passingNotice={passingNotice}
      />

      <NewsPassingNoticeDetailCommentListSection
        passingNoticeId={passingNoticeId}
      />

      <NewsPassingNoticeDetailCommentInputSection
        passingNoticeId={passingNoticeId}
      />

      <NewsPassingNoticeDetailActionSection />
    </Box>
  )
}

export default NewsPassingNoticeDetailPage
