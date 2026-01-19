import type { Metadata, NextPage } from 'next'
import { notFound } from 'next/navigation'

import { departmentApi } from '@/generated/apis/Department/Department.query'
import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import DepartmentPage from './_source/components/department-page'

interface PageProps {
  params: Promise<{
    departmentId: string
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
      return getSharedMetadata({ title: '분과 게시판' })
    }

    return getSharedMetadata({ title: `${targetDepartment.name} 분과 게시판` })
  } catch {
    return getSharedMetadata({ title: '분과 게시판' })
  }
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { departmentId } = await params

  if (!Number(departmentId)) {
    return notFound()
  }

  return <DepartmentPage departmentId={Number(departmentId)} />
}

export default Page
