'use client'

import { ROUTES } from '@/constants/routes'

import EditorialListPage from '../../../_source/components/editorial-list-page'

const EditorialTemplatePage: React.FC = () => {
  return (
    <EditorialListPage type="template" baseRoute={ROUTES.EDITORIAL_TEMPLATE} />
  )
}

export default EditorialTemplatePage
