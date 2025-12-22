import { Suspense } from 'react'

import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import NewsBulletinPage from './_source/components/news-bulletin-page'

export const metadata: Metadata = getSharedMetadata({
  title: '주보',
})

const Page: NextPage = () => {
  return (
    <Suspense>
      <NewsBulletinPage />
    </Suspense>
  )
}

export default Page
