import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsDocumentPage from './_source/components/news-document-page'

export const metadata: Metadata = getSharedMetadata({
  title: '자료실',
})

const Page: NextPage = () => {
  return <NewsDocumentPage />
}

export default Page
