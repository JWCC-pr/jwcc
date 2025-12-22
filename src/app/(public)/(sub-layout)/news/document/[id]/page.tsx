import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsDocumentDetailPage from './_source/components/news-document-detail-page'

export const metadata: Metadata = getSharedMetadata({
  title: '자료실 상세',
})

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsDocumentDetailPage documentId={Number(id)} />
}

export default Page
