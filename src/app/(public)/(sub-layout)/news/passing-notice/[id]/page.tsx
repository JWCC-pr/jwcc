import { Metadata } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsPassingNoticeDetailPage from './_source/components/news-passing-notice-detail-page'

export const metadata: Metadata = getSharedMetadata({
  title: '선종 안내 상세',
})

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsPassingNoticeDetailPage passingNoticeId={Number(id)} />
}

export default Page
