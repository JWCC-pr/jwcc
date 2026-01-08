'use client'

import { ROUTES } from '@/constants/routes'

import EditorialListPage from '../../../_source/components/editorial-list-page'

const EditorialMyeongdoPage: React.FC = () => {
  return (
    <EditorialListPage type="myeongdo" baseRoute={ROUTES.EDITORIAL_MYEONGDO} />
  )
}

export default EditorialMyeongdoPage
