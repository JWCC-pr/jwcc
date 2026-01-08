'use client'

import { Box } from '@chakra-ui/react/box'
import { Link } from '@chakra-ui/react/link'

import { motion } from 'motion/react'

import { ROUTES } from '@/constants/routes'
import { LogoDefaultIcon, LogoHoverIcon } from '@/generated/icons/MyIcons'
import useNavItems from '@/hooks/useNavItems'

import HeaderMenu from './header-menu'
import HeaderUserMenu from './header-user-menu'
import MobileMenuButton from './mobile-menu-button'

const styleMap = {
  default: {
    bgColor: 'transparent',
    color: 'grey.0',
  },
  scrolled: {
    bgColor: 'grey.0',
    color: 'grey.10',
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
  const { allNavItems } = useNavItems()

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

      <Box maxW="1280px" mx="auto" px={['20px', '40px']}>
        <Box h="64px" display="flex" alignItems="center" position="relative">
          {/* 로고 섹션 */}
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            w={['initial', '180px']}
          >
            <Link href={ROUTES.HOME}>
              {isScrolled || hasHoveredNav ?
                <LogoHoverIcon w="122px" h="36px" />
              : <LogoDefaultIcon w="122px" h="36px" />}
            </Link>
          </Box>

          {/* 네비게이션 링크들 */}
          <Box
            flex="1"
            display={['none', 'none', 'flex']}
            alignItems="center"
            justifyContent="center"
          >
            <Box
              flex="1"
              display="flex"
              justifyContent="center"
              position="relative"
              alignItems="center"
            >
              {allNavItems.map((item, index) => {
                // 각 메인 메뉴의 모든 하위 경로를 수집
                const matchPaths =
                  item.subItems
                    ?.map((subItem) => subItem.href)
                    .filter((href): href is string => !!href) || []

                return (
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
                      position="relative"
                      transition="color 0.2s"
                      hasHoveredNav={hasHoveredNav}
                      isScrolled={isScrolled}
                      matchPaths={matchPaths}
                    >
                      {item.label}
                    </HeaderMenu>
                  </Box>
                )
              })}
            </Box>

            <HeaderUserMenu isScrolled={isScrolled || hasHoveredNav} />
          </Box>

          <Box
            flex="1"
            display={['flex', 'flex', 'none']}
            justifyContent="flex-end"
          >
            <MobileMenuButton isScrolled={isScrolled} />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default HeaderBar
