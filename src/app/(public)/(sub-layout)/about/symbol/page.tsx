import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import AboutSymbolPage from './_source/components/about-symbol-page'

export const metadata: Metadata = getSharedMetadata({
  title: '본당 상징 및 로고',
})

const Page: NextPage = () => {
  return <AboutSymbolPage />
}

export default Page
