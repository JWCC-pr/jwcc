'use client'

import { Box } from '@chakra-ui/react/box'
import { Link } from '@chakra-ui/react/link'
import { UserIcon } from '@phosphor-icons/react'

import { motion } from 'motion/react'

import { NAV_ITEMS } from '@/constants/nav-items'
import { ROUTES } from '@/constants/routes'
import { LogoDefaultIcon, LogoHoverIcon } from '@/generated/icons/MyIcons'

import HeaderMenu from './header-menu'

const styleMap = {
  default: {
    bgColor: 'transparent',
  },
  scrolled: {
    bgColor: 'grey.0',
  },
} as const

const MotionBox = motion(Box)

interface HeaderBarProps {
  hasHoveredNav: boolean
  setHoveredNavIndex: (index: number | null) => void
  isScrolled?: boolean
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  hasHoveredNav,
  setHoveredNavIndex,
  isScrolled,
}) => {
  return (
    <>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: hasHoveredNav ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        position="absolute"
        inset="0"
        h="64px"
        bgColor={
          hasHoveredNav ?
            'white-transparent.500'
          : styleMap[isScrolled ? 'scrolled' : 'default'].bgColor
        }
        zIndex="-1"
      />

      <Box maxW="1280px" mx="auto" px="40px">
        <Box h="64px" display="flex" alignItems="center" position="relative">
          {/* 로고 섹션 */}
          <Box
            w="180px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Link href={ROUTES.HOME}>
              {isScrolled || hasHoveredNav ?
                <LogoHoverIcon w="122px" h="36px" />
              : <LogoDefaultIcon w="122px" h="36px" />}
            </Link>
          </Box>

          {/* 네비게이션 링크들 */}
          <Box
            w="1200px"
            display="flex"
            justifyContent="center"
            position="relative"
            alignItems="center"
          >
            {NAV_ITEMS.map((item, index) => (
              <Box
                key={item.label}
                position="relative"
                onMouseEnter={() => setHoveredNavIndex(index)}
                onMouseLeave={() => {
                  if (hasHoveredNav) return

                  setHoveredNavIndex(null)
                }}
              >
                <HeaderMenu
                  href={item.href || '#'}
                  position="relative"
                  transition="color 0.2s"
                  hasHoveredNav={hasHoveredNav}
                  isScrolled={isScrolled}
                >
                  {item.label}
                </HeaderMenu>
              </Box>
            ))}
          </Box>

          <Box w="180px" display="flex" justifyContent="flex-end">
            <UserIcon size="24px" />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default HeaderBar
