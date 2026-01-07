import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import EditorialFinalPage from './_source/components/editorial-final-page'

export const metadata: Metadata = getSharedMetadata({
  title: '주보 7면 최종본',
})

const Page: NextPage = () => {
  return <EditorialFinalPage />
}

export default Page
