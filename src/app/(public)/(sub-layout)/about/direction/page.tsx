import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import AboutDirectionPage from './_source/components/about-direction-page'

export const metadata: Metadata = getSharedMetadata({
  title: '오시는 길',
})

const Page: NextPage = () => {
  return <AboutDirectionPage />
}

export default Page
