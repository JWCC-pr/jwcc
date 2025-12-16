import React from 'react'

import { Box } from '@chakra-ui/react/box'

import Footer from '@/components/@layout/footer/footer'
import StickyHeader from '@/components/@layout/header/sticky/header'

import QuickMenuSection from '../(home-layout)/_source/components/sections/quick-menu-section'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" flexDirection="column" h="100vh">
        <StickyHeader />

        <Box as="main" w="100%" flex="1">
          {children}
        </Box>

        <QuickMenuSection />
      </Box>

      <Footer />
    </Box>
  )
}

export default Layout
