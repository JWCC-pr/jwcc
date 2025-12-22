import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsBulletinDetailPage from './_source/components/news-bulletin-detail-page'

export const metadata: Metadata = getSharedMetadata({
  title: '주보 상세',
})

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsBulletinDetailPage bulletinId={Number(id)} />
}

export default Page
