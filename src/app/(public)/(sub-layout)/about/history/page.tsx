import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import AboutHistoryPage from './_source/components/about-history-page'

export const metadata: Metadata = getSharedMetadata({
  title: '본당 역사',
})

const Page: NextPage = () => {
  return <AboutHistoryPage />
}

export default Page
