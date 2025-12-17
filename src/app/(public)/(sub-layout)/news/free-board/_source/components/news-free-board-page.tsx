import { Suspense } from 'react'

import { Box } from '@chakra-ui/react/box'

import NewFreeBoardTableSection from './new-free-board-table-section'
import NewFreeBoardTopSection from './sections/new-free-board-top-section'

const NewsFreeBoardPage: React.FC = () => {
  return (
    <Suspense>
      <Box display="flex" flexDirection="column">
        <NewFreeBoardTopSection />

        <NewFreeBoardTableSection />
      </Box>
    </Suspense>
  )
}

export default NewsFreeBoardPage
