import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsEventDetailPage from './_source/components/news-event-detail-page'

export const metadata: Metadata = getSharedMetadata({
  title: '본당 소식 상세',
})

interface PageProps {
  params: Promise<{ id: string }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsEventDetailPage newsId={Number(id)} />
}

export default Page
