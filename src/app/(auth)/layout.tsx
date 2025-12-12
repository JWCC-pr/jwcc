import React from 'react'

import { Box } from '@chakra-ui/react/box'

import AuthHeader from '@/components/@layout/header/auth/header'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box>
      <AuthHeader />

      <Box as="main">{children}</Box>
    </Box>
  )
}

export default Layout
