import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import ProfileEditPage from './_source/components/profile-edit-page'

export const metadata: Metadata = getSharedMetadata({ title: '내 정보 수정' })

const Page: NextPage = () => {
  return <ProfileEditPage />
}

export default Page
