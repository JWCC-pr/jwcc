import React from 'react'

import { Box } from '@chakra-ui/react/box'

import QuickMenuSection from '@/app/(public)/(home-layout)/_source/components/sections/quick-menu-section'
import FixedHeader from '@/components/@layout/header/fixed/header'
import { ScrolledProvider } from '@/hooks/useScrolled'

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
