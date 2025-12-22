import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsLiturgyFlowerEditPage from './_source/components/news-liturgy-flower-edit-page'

export const metadata: Metadata = getSharedMetadata({
  title: '전례꽃 갤러리 수정',
})

interface PageProps {
  params: Promise<{
    id: string
  }>
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsLiturgyFlowerEditPage liturgyFlowerId={Number(id)} />
}

export default Page
