import type { NextPage } from 'next'

import NewsLiturgyFlowerDetailPage from './_source/components/news-liturgy-flower-detail-page'

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
