import { Metadata } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import ResetPasswordCompletePage from './_source/components/reset-password-complete-page'

export const metadata: Metadata = getSharedMetadata({
  title: '비밀번호 재설정 완료',
})

const Page: React.FC = () => {
  return <ResetPasswordCompletePage />
}

export default Page
