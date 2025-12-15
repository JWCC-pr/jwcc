import React from 'react'

import { Box } from '@chakra-ui/react/box'

import AuthHeader from '@/components/@layout/header/auth/header'
import { ScrolledProvider } from '@/hooks/useScrolled'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ScrolledProvider>
      <Box>
        <AuthHeader />

        <Box as="main">{children}</Box>
      </Box>
    </ScrolledProvider>
  )
}

export default Layout
