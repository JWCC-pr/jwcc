import { Box } from '@chakra-ui/react/box'

import ButtonSections from './sections/button-sections'
import CheckboxSections from './sections/checkbox-sections'
import FontSections from './sections/font-sections'
import RadioSections from './sections/radio-sections'
import SwitchSections from './sections/switch-sections'
import TabsSections from './sections/tabs-sections'

const DesignSystemPage: React.FC = () => {
  return (
    <Box
      p="40px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="60px"
    >
      <FontSections />

      <ButtonSections />

      <TabsSections />

      <CheckboxSections />

      <RadioSections />

      <SwitchSections />
    </Box>
  )
}

export default DesignSystemPage
