import type { Metadata, NextPage } from 'next'

import { boardApi } from '@/generated/apis/Board/Board.query'
import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewFreeBoardDetailPage from './_source/components/new-free-board-detail-page'

interface PageProps {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  try {
    const { id } = await params
    const { title } = await boardApi.boardRetrieve({ id: Number(id) })

    return getSharedMetadata({ title })
  } catch {
    return getSharedMetadata({ title: '자유게시판 상세' })
  }
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewFreeBoardDetailPage id={id} />
}

export default Page
