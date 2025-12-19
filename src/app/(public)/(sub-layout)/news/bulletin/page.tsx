import { Suspense } from 'react'

import { NextPage } from 'next'

import NewsBulletinPage from './_source/components/news-bulletin-page'

const Page: NextPage = () => {
  return (
    <Suspense>
      <NewsBulletinPage />
    </Suspense>
  )
}

export default Page
