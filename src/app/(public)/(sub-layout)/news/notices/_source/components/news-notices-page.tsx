import { Suspense } from 'react'

import NewNoticesTableSection from './sections/new-notices-table-section'

const NewsNoticesPage: React.FC = () => {
  return (
    <Suspense>
      <NewNoticesTableSection />
    </Suspense>
  )
}

export default NewsNoticesPage
