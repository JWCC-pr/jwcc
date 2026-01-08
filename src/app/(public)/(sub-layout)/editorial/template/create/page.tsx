import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import EditorialTemplateCreatePage from './_source/components/editorial-template-create-page'

export const metadata: Metadata = getSharedMetadata({
  title: '주보 7면 양식 생성',
})

const Page: NextPage = () => {
  return <EditorialTemplateCreatePage />
}

export default Page
