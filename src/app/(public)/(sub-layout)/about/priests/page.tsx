import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import AboutPriestsPage from './_source/components/about-priests-page'

export const metadata: Metadata = getSharedMetadata({
  title: '본당 사제·수도자',
})

const Page: NextPage = () => {
  return <AboutPriestsPage />
}

export default Page
