import { Suspense } from 'react'

import { NextPage } from 'next'

import NewsEventsPage from './_source/components/news-events-page'

const Page: NextPage = () => {
  return (
    <Suspense>
      <NewsEventsPage />
    </Suspense>
  )
}

export default Page
