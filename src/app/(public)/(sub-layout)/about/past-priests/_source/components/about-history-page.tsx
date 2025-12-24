'use client'

import { Box } from '@chakra-ui/react/box'

import AboutHistoryAssistantPastorSection from './sections/about-history-assisant-pastor-section'
import AboutHistoryNativePriestSection from './sections/about-history-native-priest-section'
import AboutHistoryPastorSection from './sections/about-history-pastor-section'

// import AboutHistoryReligiousSection from './sections/about-history-religious-section'

// FIXME: API 수정 시 변경
const AboutPastPriestsPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="56px">
      <AboutHistoryPastorSection />

      <AboutHistoryAssistantPastorSection />

      <AboutHistoryNativePriestSection />

      {/* <AboutHistoryReligiousSection /> */}
    </Box>
  )
}

export default AboutPastPriestsPage
