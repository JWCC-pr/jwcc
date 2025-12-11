import React from 'react'

import { Box } from '@chakra-ui/react/box'

import Header from '@/components/@layout/header/header'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box bg="#5F96D9" minH="100vh">
      <Header />

      <Box as="main">{children}</Box>
    </Box>
  )
}

export default Layout
