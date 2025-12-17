import type { NextPage } from 'next'

import NewFreeBoardDetailPage from './_source/components/new-free-board-detail-page'

interface PageProps {
  params: Promise<{ id: string }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewFreeBoardDetailPage id={id} />
}

export default Page
