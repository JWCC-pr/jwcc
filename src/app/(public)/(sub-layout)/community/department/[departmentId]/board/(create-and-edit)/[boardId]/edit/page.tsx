import { Metadata } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import DepartmentBoardEditPage from './_source/components/DepartmentBoardEditPage'

export const metadata: Metadata = getSharedMetadata({
  title: '분과 게시글 수정',
})

interface PageProps {
  params: Promise<{
    departmentId: string
    boardId: string
  }>
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { departmentId, boardId } = await params

  return (
    <DepartmentBoardEditPage
      departmentId={Number(departmentId)}
      boardId={Number(boardId)}
    />
  )
}

export default Page
