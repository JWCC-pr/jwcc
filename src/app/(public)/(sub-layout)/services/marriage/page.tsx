import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import ServicesOfficePage from './_source/components/services-marriage-page'

export const metadata: Metadata = getSharedMetadata({
  title: '혼인성사 예약 안내',
})

const Page: NextPage = () => {
  return <ServicesOfficePage />
}

export default Page
