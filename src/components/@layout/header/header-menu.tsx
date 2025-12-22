'use client'

import { useState } from 'react'

import { usePathname } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Link, type LinkProps } from '@chakra-ui/react/link'

import { motion } from 'motion/react'

import { matchingPath } from '@/utils/middleware/matching-path'

const styleMap = {
  default: {
    color: 'grey.0',
  },
  scrolled: {
    color: 'grey.10',
  },
} as const

const MotionBox = motion(Box)

interface HeaderMenuProps extends LinkProps {
  href: string
  hasHoveredNav: boolean
  isScrolled?: boolean
  matchPaths?: string[]
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  children,
  hasHoveredNav,
  isScrolled,
  matchPaths,
  ...props
}) => {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)

  const pathsToMatch =
    matchPaths && matchPaths.length > 0 ? matchPaths : [props.href]
  const isActive = matchingPath(pathsToMatch, pathname)
  const showUnderline = isHovered || isActive

  return (
    <Link
      w="160px"
      h="64px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      rounded="0"
      textStyle="pre-body-3"
      position="relative"
      zIndex="1001"
      {...styleMap[isScrolled ? 'scrolled' : 'default']}
      {...(hasHoveredNav && {
        color: 'grey.10',
      })}
      _hover={{
        textDecoration: 'none',
        color: 'grey.10',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}

      {/* underline animation */}
      <MotionBox
        key={isActive ? 'active' : 'inactive'}
        initial={{ scaleX: isActive ? 1 : 0 }}
        animate={{ scaleX: showUnderline ? 1 : 0 }}
        transition={
          isActive && !isHovered ?
            { duration: 0 }
          : { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        }
        zIndex="1002"
        position="absolute"
        bottom="-1px"
        transform="translateX(-50%)"
        h="3px"
        bgColor="primary.4"
        w="100%"
        transformOrigin="center"
      />
    </Link>
  )
}

export default HeaderMenu
