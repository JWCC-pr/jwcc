import React from 'react'

import { Box } from '@chakra-ui/react/box'

import QuickMenuSection from '@/app/(public)/(home-layout)/_source/components/sections/quick-menu-section'
import Footer from '@/components/@layout/footer/footer'
import StickyHeader from '@/components/@layout/header/sticky/header'
import { ScrolledProvider } from '@/hooks/useScrolled'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ScrolledProvider>
      <Box minH="100vh" display="flex" flexDirection="column">
        <StickyHeader />

        <Box
          as="main"
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          px={['20px', 0]}
        >
          {children}
        </Box>

        <QuickMenuSection />
      </Box>

      <Footer />
    </ScrolledProvider>
  )
}

export default Layout
