import type { NextPage } from 'next'

import NewsBulletinDetailPage from './_source/components/news-bulletin-detail-page'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsBulletinDetailPage bulletinId={Number(id)} />
}

export default Page
