import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import EditorialMyeongdoPage from './_source/components/editorial-myeongdo-page'

export const metadata: Metadata = getSharedMetadata({
  title: '명도회 자료실 게시판',
})

const Page: NextPage = () => {
  return <EditorialMyeongdoPage />
}

export default Page
