'use client'

import dynamic from 'next/dynamic'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { useWeeklyBulletinRetrieveQuery } from '@/generated/apis/WeeklyBulletin/WeeklyBulletin.query'

import NewsBullentinDetailBottonSection from './sections/news-bullentin-detail-botton-section'
import NewsBullentinDetailHeaderSection from './sections/news-bullentin-detail-header-section'

// react-pdf를 사용하는 컴포넌트를 dynamic import로 클라이언트에서만 로드
// 서버 사이드 렌더링 비활성화하여 DOMMatrix 에러 방지
const NewsBullentinDetailPdfSection = dynamic(
  () => import('./sections/news-bullentin-detail-pdf-section'),
  {
    ssr: false,
    loading: () => (
      <Box
        py="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgColor="background.basic.2"
      >
        <Text textStyle="pre-body-4" color="grey.7">
          PDF 로딩 중...
        </Text>
      </Box>
    ),
  },
)

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
