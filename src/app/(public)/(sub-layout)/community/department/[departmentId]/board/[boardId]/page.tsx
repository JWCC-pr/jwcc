import { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'

import { departmentApi } from '@/generated/apis/Department/Department.query'
import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import DepartmentBoardPage from './_source/components/department-board-page'

interface PageProps {
  params: Promise<{
    departmentId: string
    boardId: string
  }>
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  try {
    const { departmentId } = await params
    const departmentList = await departmentApi.departmentList()

    const targetDepartment = departmentList.find(
      (department) => department.id === Number(departmentId),
    )

    if (!targetDepartment) {
      return getSharedMetadata({ title: '분과 게시판 상세' })
    }

    return getSharedMetadata({
      title: `${targetDepartment.name} 분과 게시판 상세`,
    })
  } catch {
    return getSharedMetadata({ title: '분과 게시판 상세' })
  }
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
