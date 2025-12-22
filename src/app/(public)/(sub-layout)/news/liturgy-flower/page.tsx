import { Suspense } from 'react'

import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsLiturgyFlowerPage from './_source/components/news-liturgy-flower-page'

export const metadata: Metadata = getSharedMetadata({
  title: '전례꽃 갤러리',
})

const Page: NextPage = () => {
  return (
    <Suspense>
      <NewsLiturgyFlowerPage />
    </Suspense>
  )
}

export default Page
