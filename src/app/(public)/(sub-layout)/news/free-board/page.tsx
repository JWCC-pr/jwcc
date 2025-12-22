import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsFreeBoardPage from './_source/components/news-free-board-page'

export const metadata: Metadata = getSharedMetadata({
  title: '자유게시판',
})

const Page: NextPage = () => {
  return <NewsFreeBoardPage />
}

export default Page
