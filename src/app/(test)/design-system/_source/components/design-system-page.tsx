import { Box } from '@chakra-ui/react/box'

import ButtonSections from './sections/button-sections'
import FontSections from './sections/font-sections'
import TabsSections from './sections/tabs-sections'

const DesignSystemPage: React.FC = () => {
  return (
    <Box p="40px" display="flex" flexDirection="column" gap="24px">
      <FontSections />

      <ButtonSections />

      <TabsSections />
    </Box>
  )
}

export default DesignSystemPage
