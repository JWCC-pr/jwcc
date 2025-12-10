import { Box } from '@chakra-ui/react/box'

import ButtonSections from './sections/button-sections'
import FontSections from './sections/font-sections'

const DesignSystemPage: React.FC = () => {
  return (
    <Box p="40px" display="flex" flexDirection="column" gap="24px">
      <FontSections />

      <ButtonSections />
    </Box>
  )
}

export default DesignSystemPage
