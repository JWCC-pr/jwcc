import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsLiturgyFlowerCreatePage from './_source/components/news-liturgy-flower-create-page'

export const metadata: Metadata = getSharedMetadata({
  title: '전례꽃 갤러리 생성',
})

const Page: NextPage = () => {
  return <NewsLiturgyFlowerCreatePage />
}

export default Page
