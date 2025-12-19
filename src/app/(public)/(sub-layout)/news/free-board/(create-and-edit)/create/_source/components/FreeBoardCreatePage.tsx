'use client'

import withPermission from '@/components/hoc/with-permission'
import { ROUTES } from '@/constants/routes'

import NewsFreeBoardForm from '../../../_source/components/form/news-free-board-form'

const FreeBoardCreatePage: React.FC = () => {
  return <NewsFreeBoardForm />
}

export default withPermission(FreeBoardCreatePage, {
  grade: 6,
  redirectTo: ROUTES.NEWS_FREE_BOARD,
})
