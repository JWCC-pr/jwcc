import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import CommunityDepartmentsPage from './_source/components/community-departments-page'

export const metadata: Metadata = getSharedMetadata({
  title: '분과 바로가기',
})

const Page: NextPage = () => {
  return <CommunityDepartmentsPage />
}

export default Page
