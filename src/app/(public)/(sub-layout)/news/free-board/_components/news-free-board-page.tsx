import { Box } from '@chakra-ui/react/box'

import NewFreeBoardTableSection from './new-free-board-table-section'
import NewFreeBoardTopSection from './sections/new-free-board-top-section'

const NewsFreeBoardPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column">
      <NewFreeBoardTopSection />

      <NewFreeBoardTableSection />
    </Box>
  )
}

export default NewsFreeBoardPage
