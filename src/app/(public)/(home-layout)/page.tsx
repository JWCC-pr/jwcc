import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import HomePage from './_source/components/HomePage'

export const metadata: Metadata = getSharedMetadata({
  title: '천주교 잠원동 성당 - 파티마의 성모',
  ignoreTemplate: true,
})

const Page: NextPage = () => {
  return <HomePage />
}

export default Page
