import type { NextPage } from 'next'

import NoticesDetailPage from './_source/components/NoticesDetailPage'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NoticesDetailPage noticeId={Number(id)} />
}

export default Page
