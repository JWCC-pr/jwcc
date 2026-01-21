import { Metadata, NextPage } from 'next'

import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

import EditorialTemplatePage from './_source/components/editorial-template-page'

export const metadata: Metadata = getSharedMetadata({
  title: '주보 7면 최종본 게시판',
})

const Page: NextPage = () => {
  return <EditorialTemplatePage />
}

export default Page
