import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import DepartmentBoardCreatePage from './_source/components/DepartmentBoardCreatePage'

export const metadata: Metadata = getSharedMetadata({
  title: '분과 게시글 생성',
})

interface PageProps {
  params: Promise<{
    departmentId: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { departmentId } = await params

  return <DepartmentBoardCreatePage departmentId={Number(departmentId)} />
}

export default Page
