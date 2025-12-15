import React from 'react'

import { Box } from '@chakra-ui/react/box'

import Header from '@/components/@layout/header/header'
import { ScrolledProvider } from '@/hooks/useScrolled'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ScrolledProvider>
      <Box>
        <Header />

        <Box as="main">{children}</Box>
      </Box>
    </ScrolledProvider>
  )
}

export default Layout
