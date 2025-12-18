'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'

import { ROUTES } from '@/constants/routes'
import { useLiturgyFlowerRetrieveQuery } from '@/generated/apis/LiturgyFlower/LiturgyFlower.query'

import NewsLigurgyFlowerDetailBodySection from './sections/news-ligurgy-flower-detail-body-section'
import NewsLigurgyFlowerDetailCommentInfoSection from './sections/news-ligurgy-flower-detail-comment-info-section'
import NewsLigurgyFlowerDetailCommentInputSection from './sections/news-ligurgy-flower-detail-comment-input-section'
import NewsLigurgyFlowerDetailCommentListSection from './sections/news-ligurgy-flower-detail-comment-list-section'
import NewsLigurgyFlowerDetailHeaderSection from './sections/news-ligurgy-flower-detail-header-section'

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
      <NewsLigurgyFlowerDetailHeaderSection liturgyFlower={liturgyFlower} />

      <NewsLigurgyFlowerDetailBodySection liturgyFlower={liturgyFlower} />

      <NewsLigurgyFlowerDetailCommentInfoSection
        liturgyFlower={liturgyFlower}
      />

      <NewsLigurgyFlowerDetailCommentListSection
        liturgyFlowerId={liturgyFlowerId}
      />

      <NewsLigurgyFlowerDetailCommentInputSection
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
