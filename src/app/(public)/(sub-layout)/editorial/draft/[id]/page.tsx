import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import EditorialDetailPage from '../../_source/components/editorial-detail-page'

export const metadata: Metadata = getSharedMetadata({
  title: '주보 7면 편집 상세',
})

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <EditorialDetailPage type="draft" editorialId={Number(id)} />
}

export default Page
