import { NextPage } from 'next'
import { notFound } from 'next/navigation'

import DepartmentPage from './_source/components/department-page'

interface PageProps {
  params: Promise<{
    departmentId: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { departmentId } = await params

  if (!Number(departmentId)) {
    return notFound()
  }

  return <DepartmentPage departmentId={Number(departmentId)} />
}

export default Page
