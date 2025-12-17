'use client'

import { Box } from '@chakra-ui/react/box'

import BulletinSection from './bulletin-section'
import NewsSection from './news-section'

const NewsBulletinSection: React.FC = () => {
  return (
    <Box
      as="section"
      w="100%"
      maxW="1280px"
      mx="auto"
      h="100vh"
      p="64px 40px"
      display="flex"
      justifyContent="center"
      alignItems="stretch"
      gap="40px"
    >
      <NewsSection />
      <BulletinSection />
    </Box>
  )
}

export default NewsBulletinSection
