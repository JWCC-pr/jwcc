import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import ServicesOfficePage from './_source/components/services-transfers-page'

export const metadata: Metadata = getSharedMetadata({
  title: '전입 교우 안내',
})

const Page: NextPage = () => {
  return <ServicesOfficePage />
}

export default Page
