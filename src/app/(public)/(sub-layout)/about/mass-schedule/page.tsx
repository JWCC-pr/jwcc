import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import AboutMassSchedulePage from './_source/components/about-mass-schedule-page'

export const metadata: Metadata = getSharedMetadata({
  title: '미사시간 안내 및 오시는 길',
})

const Page: NextPage = () => {
  return <AboutMassSchedulePage />
}

export default Page
