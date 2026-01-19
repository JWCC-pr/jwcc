import type { Metadata, NextPage } from 'next'

import { newsApi } from '@/generated/apis/News/News.query'
import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsEventDetailPage from './_source/components/news-event-detail-page'

interface PageProps {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  try {
    const { id } = await params
    const { title } = await newsApi.newsRetrieve({ id: Number(id) })

    return getSharedMetadata({ title })
  } catch {
    return getSharedMetadata({ title: '본당 소식 상세' })
  }
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsEventDetailPage newsId={Number(id)} />
}

export default Page
