import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NoticesDetailPage from './_source/components/NoticesDetailPage'

export const metadata: Metadata = getSharedMetadata({
  title: '공지사항 상세',
})

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NoticesDetailPage noticeId={Number(id)} />
}

export default Page
