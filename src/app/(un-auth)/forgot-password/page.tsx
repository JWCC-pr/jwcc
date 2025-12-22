import { Metadata } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import ForgotPasswordPage from './_source/components/ForgotPasswordPage'

export const metadata: Metadata = getSharedMetadata({
  title: '비밀번호 찾기',
})

const Page: React.FC = () => {
  return <ForgotPasswordPage />
}

export default Page
