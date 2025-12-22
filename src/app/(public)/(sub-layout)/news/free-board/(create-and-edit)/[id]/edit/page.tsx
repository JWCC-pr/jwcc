import { Metadata } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewFreeBoardEditPage from './_source/components/NewFreeBoardEditPage'

export const metadata: Metadata = getSharedMetadata({
  title: '자유게시판 수정',
})

interface PageProps {
  params: Promise<{ id: string }>
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewFreeBoardEditPage id={id} />
}

export default Page
