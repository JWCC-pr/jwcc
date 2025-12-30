'use client'

import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'

import { useLiturgyFlowerRetrieveQuery } from '@/generated/apis/LiturgyFlower/LiturgyFlower.query'

import NewsLiturgyFlowerDetailBodySection from './sections/news-liturgy-flower-detail-body-section'
import NewsLiturgyFlowerDetailCommentInfoSection from './sections/news-liturgy-flower-detail-comment-info-section'
import NewsLiturgyFlowerDetailCommentInputSection from './sections/news-liturgy-flower-detail-comment-input-section'
import NewsLiturgyFlowerDetailCommentListSection from './sections/news-liturgy-flower-detail-comment-list-section'
import NewsLiturgyFlowerDetailHeaderSection from './sections/news-liturgy-flower-detail-header-section'

interface NewsLiturgyFlowerDetailPageProps {
  liturgyFlowerId: number
}

const NewsLiturgyFlowerDetailPage: React.FC<
  NewsLiturgyFlowerDetailPageProps
> = ({ liturgyFlowerId }) => {
  const router = useRouter()
  const { data: liturgyFlower } = useLiturgyFlowerRetrieveQuery({
    variables: {
      id: liturgyFlowerId,
    },
  })

  if (!liturgyFlower) return null

  return (
    <Box display="flex" flexDirection="column">
      <NewsLiturgyFlowerDetailHeaderSection liturgyFlower={liturgyFlower} />

      <NewsLiturgyFlowerDetailBodySection liturgyFlower={liturgyFlower} />

      <NewsLiturgyFlowerDetailCommentInfoSection
        liturgyFlower={liturgyFlower}
      />

      <NewsLiturgyFlowerDetailCommentListSection
        liturgyFlowerId={liturgyFlowerId}
      />

      <NewsLiturgyFlowerDetailCommentInputSection
        liturgyFlowerId={liturgyFlowerId}
      />

      <Box py="16px" display="flex" justifyContent="center">
        <Box onClick={() => router.back()} cursor="pointer">
          <Button type="button" size="md" variant="solid" colorPalette="grey">
            목록으로
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default NewsLiturgyFlowerDetailPage
