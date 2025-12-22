import type { NextPage } from 'next'
import { Metadata } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import SignupPage from './_source/components/signup-page'

export const metadata: Metadata = getSharedMetadata({
  title: '회원가입',
})

const Page: NextPage = () => {
  return <SignupPage />
}

export default Page
