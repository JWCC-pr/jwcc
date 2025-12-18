'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'

import { ROUTES } from '@/constants/routes'
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
        <Link
          href={ROUTES.NEWS_LITURGY_FLOWER}
          _hover={{ textDecoration: 'none' }}
        >
          <Button type="button" size="md" variant="solid" colorPalette="grey">
            목록으로
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default NewsLiturgyFlowerDetailPage
