import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import CommunityParishAreaPage from './_source/components/community-parish-area-page'

export const metadata: Metadata = getSharedMetadata({
  title: '본당 관할 구역도',
})

const Page: NextPage = () => {
  return <CommunityParishAreaPage />
}

export default Page
