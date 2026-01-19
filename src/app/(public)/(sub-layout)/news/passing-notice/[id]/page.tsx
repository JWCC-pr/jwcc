import { Metadata } from 'next'

import { passingNoticeApi } from '@/generated/apis/PassingNotice/PassingNotice.query'
import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsPassingNoticeDetailPage from './_source/components/news-passing-notice-detail-page'

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
    const { name } = await passingNoticeApi.passingNoticeRetrieve({
      id: Number(id),
    })

    return getSharedMetadata({ title: `선종 안내 - ${name}` })
  } catch {
    return getSharedMetadata({ title: '선종 안내 상세' })
  }
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsPassingNoticeDetailPage passingNoticeId={Number(id)} />
}

export default Page
