import { Metadata } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import SignupCompletePage from './_source/components/signup-complete-page'

export const metadata: Metadata = getSharedMetadata({
  title: '회원가입 완료',
})

const Page: React.FC = () => {
  return <SignupCompletePage />
}

export default Page
