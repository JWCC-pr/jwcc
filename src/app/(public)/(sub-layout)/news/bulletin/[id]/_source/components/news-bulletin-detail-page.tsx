'use client'

import { Box } from '@chakra-ui/react/box'

import { useWeeklyBulletinRetrieveQuery } from '@/generated/apis/WeeklyBulletin/WeeklyBulletin.query'

import NewsBullentinDetailBottonSection from './sections/news-bullentin-detail-botton-section'
import NewsBullentinDetailHeaderSection from './sections/news-bullentin-detail-header-section'
import NewsBullentinDetailPdfSection from './sections/news-bullentin-detail-pdf-section'

interface NewsBulletinDetailPageProps {
  bulletinId: number
}

const NewsBulletinDetailPage: React.FC<NewsBulletinDetailPageProps> = ({
  bulletinId,
}) => {
  const { data: bulletin } = useWeeklyBulletinRetrieveQuery({
    variables: {
      id: bulletinId,
    },
  })

  // FIXME: Sekeleton
  if (!bulletin) return null

  return (
    <Box display="flex" flexDirection="column">
      <NewsBullentinDetailHeaderSection bulletin={bulletin} />

      <NewsBullentinDetailPdfSection bulletin={bulletin} />

      <NewsBullentinDetailBottonSection />
    </Box>
  )
}

export default NewsBulletinDetailPage
