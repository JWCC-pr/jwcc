import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import EditorialFinalCreatePage from './_source/components/editorial-final-create-page'

export const metadata: Metadata = getSharedMetadata({
  title: '주보 7면 최종본 생성',
})

const Page: NextPage = () => {
  return <EditorialFinalCreatePage />
}

export default Page
