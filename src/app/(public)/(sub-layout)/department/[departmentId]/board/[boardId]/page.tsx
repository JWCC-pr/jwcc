import { NextPage } from 'next'
import { notFound } from 'next/navigation'

import DepartmentBoardPage from './_source/components/department-board-page'

interface PageProps {
  params: Promise<{
    departmentId: string
    boardId: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { departmentId, boardId } = await params

  if (!Number(departmentId) || !Number(boardId)) {
    return notFound()
  }

  return (
    <DepartmentBoardPage
      departmentId={Number(departmentId)}
      boardId={Number(boardId)}
    />
  )
}

export default Page
