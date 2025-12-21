import { Suspense } from 'react'

import { Box } from '@chakra-ui/react/box'

import NewsPassingNoticeTableSection from './sections/news-passing-notice-table-section'
import NewsPassingNoticeTopSection from './sections/news-passing-notice-top-section'

const NewsPassingNoticePage: React.FC = () => {
  return (
    <Suspense>
      <Box display="flex" flexDirection="column" gap="24px">
        <NewsPassingNoticeTopSection />

        <Box display="flex" flexDirection="column">
          <NewsPassingNoticeTableSection />
        </Box>
      </Box>
    </Suspense>
  )
}

export default NewsPassingNoticePage
