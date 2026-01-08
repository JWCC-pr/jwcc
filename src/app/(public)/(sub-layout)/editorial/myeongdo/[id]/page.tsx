import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import EditorialDetailPage from '../../_source/components/editorial-detail-page'

export const metadata: Metadata = getSharedMetadata({
  title: '명도회 자료실 상세',
})

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <EditorialDetailPage type="myeongdo" editorialId={Number(id)} />
}

export default Page
