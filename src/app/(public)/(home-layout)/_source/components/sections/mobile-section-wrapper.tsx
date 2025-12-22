'use client'

import { Box } from '@chakra-ui/react/box'

interface MobileSectionWrapperProps {
  children: React.ReactNode
}

const MobileSectionWrapper: React.FC<MobileSectionWrapperProps> = ({
  children,
}) => {
  return (
    <Box
      as="section"
      w="100%"
      maxW="1280px"
      mx="auto"
      h="100vh"
      p="64px 20px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Box>
  )
}

export default MobileSectionWrapper
