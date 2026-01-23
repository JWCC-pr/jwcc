'use client'

import { ROUTES } from '@/constants/routes'

import EditorialListPage from '../../../_source/components/editorial-list-page'

const EditorialTemplatePage: React.FC = () => {
  return (
    <EditorialListPage
      type="template"
      baseRoute={ROUTES.COMMUNITY_EDITORIAL_TEMPLATE}
    />
  )
}

export default EditorialTemplatePage
