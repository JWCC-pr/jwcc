import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import AboutPastoralPage from './_source/components/about-pastroal-page'

export const metadata: Metadata = getSharedMetadata({
  title: '사목지침',
})

const Page: NextPage = () => {
  return <AboutPastoralPage />
}

export default Page
