import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsLiturgyFlowerDetailPage from './_source/components/news-liturgy-flower-detail-page'

export const metadata: Metadata = getSharedMetadata({
  title: '전례꽃 갤러리 상세',
})

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsLiturgyFlowerDetailPage liturgyFlowerId={Number(id)} />
}

export default Page
