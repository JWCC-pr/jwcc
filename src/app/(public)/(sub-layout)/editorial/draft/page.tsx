import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import EditorialDraftPage from './_source/components/editorial-draft-page'

export const metadata: Metadata = getSharedMetadata({
  title: '주보 7면 편집 게시판',
})

const Page: NextPage = () => {
  return <EditorialDraftPage />
}

export default Page
