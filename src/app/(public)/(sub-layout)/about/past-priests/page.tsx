import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import AboutPastPriestsPage from './_source/components/about-history-page'

export const metadata: Metadata = getSharedMetadata({
  title: '역대 사제·수도자',
})

const Page: NextPage = () => {
  return <AboutPastPriestsPage />
}

export default Page
