import { Suspense } from 'react'

import ResetPasswordPage from './_source/components/ResetPasswordPage'

const Page: React.FC = () => {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  )
}

export default Page
