import React from 'react'

import { Box } from '@chakra-ui/react/box'

import SimpleHeader from '@/components/@layout/header/simple/header'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <SimpleHeader />

      <Box
        as="main"
        bgColor="background.basic.2"
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={['20px', 0]}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout
