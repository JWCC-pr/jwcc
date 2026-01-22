'use client'

import { ROUTES } from '@/constants/routes'

import EditorialListPage from '../../../_source/components/editorial-list-page'

const EditorialFinalPage: React.FC = () => {
  return (
    <EditorialListPage
      type="final"
      baseRoute={ROUTES.COMMUNITY_EDITORIAL_FINAL}
    />
  )
}

export default EditorialFinalPage
