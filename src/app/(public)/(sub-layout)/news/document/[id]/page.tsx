import type { Metadata, NextPage } from 'next'

import { documentApi } from '@/generated/apis/Document/Document.query'
import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsDocumentDetailPage from './_source/components/news-document-detail-page'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  try {
    const { id } = await params
    const { title } = await documentApi.documentRetrieve({ id: Number(id) })

    return getSharedMetadata({ title })
  } catch {
    return getSharedMetadata({ title: '자료실 상세' })
  }
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsDocumentDetailPage documentId={Number(id)} />
}

export default Page
