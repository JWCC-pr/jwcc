import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import EditorialMyeongdoCreatePage from './_source/components/editorial-myeongdo-create-page'

export const metadata: Metadata = getSharedMetadata({
  title: '명도회 자료실 생성',
})

const Page: NextPage = () => {
  return <EditorialMyeongdoCreatePage />
}

export default Page
