import type { Metadata, NextPage } from 'next'

import { noticeApi } from '@/generated/apis/Notice/Notice.query'
import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NoticesDetailPage from './_source/components/NoticesDetailPage'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  try {
    const { id } = await params

    const { title } = await noticeApi.noticeRetrieve({ id: Number(id) })

    return getSharedMetadata({ title })
  } catch {
    return getSharedMetadata({ title: '공지사항 상세' })
  }
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NoticesDetailPage noticeId={Number(id)} />
}

export default Page
