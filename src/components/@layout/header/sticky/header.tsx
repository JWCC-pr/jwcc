'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'

import HeaderBar from '../header-bar'
import HeaderDropdown from '../header-dropdown'

const StickyHeader: React.FC = () => {
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null)

  const hasHoveredNav = hoveredNavIndex !== null

  return (
    <Box
      w="100%"
      position="sticky"
      top="0"
      zIndex="sticky"
      borderBottom="1px solid"
      borderBottomColor="border.basic.1"
      bgColor="grey.0"
      onMouseLeave={() => setHoveredNavIndex(null)}
    >
      <HeaderBar
        isScrolled
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

export default StickyHeader
