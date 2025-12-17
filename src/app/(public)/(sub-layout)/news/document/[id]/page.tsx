import type { NextPage } from 'next'

import NewsDocumentDetailPage from './_source/components/news-document-detail-page'

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
