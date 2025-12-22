import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import AboutPatronSaintPage from './_source/components/about-patron-saint-page'

export const metadata: Metadata = getSharedMetadata({
  title: '주보 성인',
})

const Page: NextPage = () => {
  return <AboutPatronSaintPage />
}

export default Page
