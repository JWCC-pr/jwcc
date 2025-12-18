import { Suspense } from 'react'

import { NextPage } from 'next'

import NewsLiturgyFlowerPage from './_source/components/news-liturgy-flower-page'

const Page: NextPage = () => {
  return (
    <Suspense>
      <NewsLiturgyFlowerPage />
    </Suspense>
  )
}

export default Page
