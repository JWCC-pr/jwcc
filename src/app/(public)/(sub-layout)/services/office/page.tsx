import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import ServicesOfficePage from './_source/components/services-office-page'

export const metadata: Metadata = getSharedMetadata({
  title: '사무실 안내',
})

const Page: NextPage = () => {
  return <ServicesOfficePage />
}

export default Page
