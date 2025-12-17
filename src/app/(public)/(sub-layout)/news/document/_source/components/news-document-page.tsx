'use client'

import { Suspense } from 'react'

import { Box } from '@chakra-ui/react/box'

import NewsDocumentSearchSection from './sections/news-document-search-section'
import NewsDocumentTableSection from './sections/news-document-table-section'

const NewsDocumentPage: React.FC = () => {
  return (
    <Suspense>
      <Box display="flex" flexDirection="column">
        <NewsDocumentSearchSection />

        <NewsDocumentTableSection />
      </Box>
    </Suspense>
  )
}

export default NewsDocumentPage
