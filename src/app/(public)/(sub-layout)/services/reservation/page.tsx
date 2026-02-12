import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import ReservationPage from './_source/components/reservation-page'

export const metadata: Metadata = getSharedMetadata({
  title: '교리실 예약',
})

const Page: NextPage = () => {
  return <ReservationPage />
}

export default Page
