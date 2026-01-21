import type { Metadata, NextPage } from 'next'

import { liturgyFlowerApi } from '@/generated/apis/LiturgyFlower/LiturgyFlower.query'
import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsLiturgyFlowerDetailPage from './_source/components/news-liturgy-flower-detail-page'

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
    const { title } = await liturgyFlowerApi.liturgyFlowerRetrieve({
      id: Number(id),
    })

    return getSharedMetadata({ title })
  } catch {
    return getSharedMetadata({ title: '전례꽃 갤러리 상세' })
  }
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsLiturgyFlowerDetailPage liturgyFlowerId={Number(id)} />
}

export default Page
