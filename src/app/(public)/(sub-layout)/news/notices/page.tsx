import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsNoticesPage from './_source/components/news-notices-page'

export const metadata: Metadata = getSharedMetadata({
  title: '공지사항',
})

const Page: NextPage = () => {
  return <NewsNoticesPage />
}

export default Page
