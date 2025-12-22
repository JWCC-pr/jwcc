'use client'

import { Box } from '@chakra-ui/react/box'

import MassSection from './mass-section'
import NoticeSection from './notice-section'

const NoticeAndMassSection: React.FC = () => {
  return (
    <Box
      as="section"
      w="100%"
      maxW="1280px"
      mx="auto"
      h="100vh"
      p={['64px 20px', '64px 40px']}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="40px"
    >
      <NoticeSection />
      <MassSection />
    </Box>
  )
}

export default NoticeAndMassSection
