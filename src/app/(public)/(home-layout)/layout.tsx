import React from 'react'

import { Box } from '@chakra-ui/react/box'

import FixedHeader from '@/components/@layout/header/fixed/header'
import { ScrolledProvider } from '@/hooks/useScrolled'

import QuickMenuSection from './_source/components/sections/quick-menu-section'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ScrolledProvider>
      <Box>
        <FixedHeader />

        <Box as="main">{children}</Box>

        <QuickMenuSection />
      </Box>
    </ScrolledProvider>
  )
}

export default Layout
