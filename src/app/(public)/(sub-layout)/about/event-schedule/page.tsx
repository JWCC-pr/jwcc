import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import AboutEventSchedulePage from './_source/components/about-event-schedule-page'

export const metadata: Metadata = getSharedMetadata({
  title: '본당 행사 일정',
})

const Page: NextPage = () => {
  return <AboutEventSchedulePage />
}

export default Page
