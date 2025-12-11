'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'

import HeaderBar from './header-bar'
import HeaderDropdown from './header-dropdown'

const Header: React.FC = () => {
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null)

  const hasHoveredNav = hoveredNavIndex !== null

  return (
    <Box
      w="100%"
      position="relative"
      zIndex="sticky"
      onMouseLeave={() => setHoveredNavIndex(null)}
    >
      <HeaderBar
        hasHoveredNav={hasHoveredNav}
        setHoveredNavIndex={setHoveredNavIndex}
      />

      <HeaderDropdown
        hoveredNavIndex={hoveredNavIndex}
        setHoveredNavIndex={setHoveredNavIndex}
      />
    </Box>
  )
}

export default Header
