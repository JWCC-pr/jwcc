import type { Metadata, NextPage } from 'next'

import { weeklyBulletinApi } from '@/generated/apis/WeeklyBulletin/WeeklyBulletin.query'
import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsBulletinDetailPage from './_source/components/news-bulletin-detail-page'

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
    const { title } = await weeklyBulletinApi.weeklyBulletinRetrieve({
      id: Number(id),
    })

    return getSharedMetadata({ title })
  } catch {
    return getSharedMetadata({ title: '주보 상세' })
  }
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params

  return <NewsBulletinDetailPage bulletinId={Number(id)} />
}

export default Page
