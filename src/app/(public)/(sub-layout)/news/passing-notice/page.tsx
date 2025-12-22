import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsPassingNoticePage from './_source/components/news-passing-notice-page'

export const metadata: Metadata = getSharedMetadata({
  title: '선종 안내',
})

const Page: NextPage = () => {
  return <NewsPassingNoticePage />
}

export default Page
