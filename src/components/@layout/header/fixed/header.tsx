'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'

import { useScrolled } from '@/hooks/useScrolled'

import HeaderBar from '../header-bar'
import HeaderDropdown from '../header-dropdown'

const styleMap = {
  default: {
    borderBottom: '1px solid',
    borderBottomColor: 'white-transparent.200',
  },
  scrolled: {
    borderBottom: '1px solid',
    borderBottomColor: 'border.basic.1',
  },
} as const

const FixedHeader: React.FC = () => {
  const { hasScrolled } = useScrolled()
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null)

  const hasHoveredNav = hoveredNavIndex !== null

  return (
    <Box
      w="100%"
      position="fixed"
      zIndex="sticky"
      bgColor="white.trnsparent.5"
      {...styleMap[hasScrolled ? 'scrolled' : 'default']}
      onMouseLeave={() => setHoveredNavIndex(null)}
    >
      <HeaderBar
        isScrolled={hasScrolled}
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

export default FixedHeader
