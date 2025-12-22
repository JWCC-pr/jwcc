import type { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import LoginPage from './_source/components/login-page'

export const metadata: Metadata = getSharedMetadata({
  title: '로그인',
  description: '로그인',
})

const Page: NextPage = () => {
  return <LoginPage />
}

export default Page
