import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import CommunityPastoralCouncilPage from './_source/components/community-pastoral-council-page'

export const metadata: Metadata = getSharedMetadata({
  title: '사목협의회 조직도',
})

const Page: NextPage = () => {
  return <CommunityPastoralCouncilPage />
}

export default Page
