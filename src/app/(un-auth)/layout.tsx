import React from 'react'

import { Box } from '@chakra-ui/react/box'

import UnAuthHeader from '@/components/@layout/header/un-auth/header'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <UnAuthHeader />

      <Box
        as="main"
        bgColor="background.basic.2"
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout
