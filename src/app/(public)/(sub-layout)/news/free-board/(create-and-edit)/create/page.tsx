import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import FreeBoardCreatePage from './_source/components/FreeBoardCreatePage'

export const metadata: Metadata = getSharedMetadata({
  title: '자유게시판 생성',
})

const Page: NextPage = () => {
  return <FreeBoardCreatePage />
}

export default Page
