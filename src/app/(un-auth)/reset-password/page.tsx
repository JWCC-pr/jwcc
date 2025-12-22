import { Suspense } from 'react'

import { Metadata } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import ResetPasswordPage from './_source/components/ResetPasswordPage'

export const metadata: Metadata = getSharedMetadata({
  title: '비밀번호 재설정',
})

const Page: React.FC = () => {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  )
}

export default Page
