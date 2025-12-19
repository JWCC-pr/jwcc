import type { NextPage } from 'next'

import NewsEventDetailPage from './_source/components/news-event-detail-page'

interface PageProps {
  params: Promise<{ id: string }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsEventDetailPage newsId={Number(id)} />
}

export default Page
