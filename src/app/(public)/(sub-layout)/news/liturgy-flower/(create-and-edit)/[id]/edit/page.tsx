import { NextPage } from 'next'

import NewsLiturgyFlowerEditPage from './_source/components/news-liturgy-flower-edit-page'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsLiturgyFlowerEditPage liturgyFlowerId={Number(id)} />
}

export default Page
