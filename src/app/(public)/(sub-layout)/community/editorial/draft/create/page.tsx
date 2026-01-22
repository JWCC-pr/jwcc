import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import EditorialDraftCreatePage from './_source/components/editorial-draft-create-page'

export const metadata: Metadata = getSharedMetadata({
  title: '명도회 자료실 생성',
})

const Page: NextPage = () => {
  return <EditorialDraftCreatePage />
}

export default Page
