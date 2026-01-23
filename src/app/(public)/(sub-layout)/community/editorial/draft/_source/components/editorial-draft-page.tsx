'use client'

import { ROUTES } from '@/constants/routes'

import EditorialListPage from '../../../_source/components/editorial-list-page'

const EditorialDraftPage: React.FC = () => {
  return (
    <EditorialListPage
      type="draft"
      baseRoute={ROUTES.COMMUNITY_EDITORIAL_DRAFT}
    />
  )
}

export default EditorialDraftPage
