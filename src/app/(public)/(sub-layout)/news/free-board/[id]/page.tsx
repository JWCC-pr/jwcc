import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewFreeBoardDetailPage from './_source/components/new-free-board-detail-page'

export const metadata: Metadata = getSharedMetadata({
  title: '자유게시판 상세',
})

interface PageProps {
  params: Promise<{ id: string }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewFreeBoardDetailPage id={id} />
}

export default Page
