import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import HomePage from './_source/components/HomePage'

export const metadata: Metadata = getSharedMetadata({
  title: '잠원동성당 - 천주교 서울대교구 잠원동성당',
  ignoreTemplate: true,
})

const Page: NextPage = () => {
  return <HomePage />
}

export default Page
