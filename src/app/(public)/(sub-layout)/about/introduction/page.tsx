import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import AboutIntroductionPage from './_source/components/about-introduction-page'

export const metadata: Metadata = getSharedMetadata({
  title: '본당 소개',
})

const Page: NextPage = () => {
  return <AboutIntroductionPage />
}

export default Page
