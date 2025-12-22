import { Suspense } from 'react'

import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsEventsPage from './_source/components/news-events-page'

export const metadata: Metadata = getSharedMetadata({
  title: '본당 소식',
})

const Page: NextPage = () => {
  return (
    <Suspense>
      <NewsEventsPage />
    </Suspense>
  )
}

export default Page
