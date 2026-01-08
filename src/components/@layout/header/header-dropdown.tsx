'use client'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { AnimatePresence, motion } from 'motion/react'

import useNavItems from '@/hooks/useNavItems'

import HeaderSubMenu from './header-sub-menu'

const MotionBox = motion(Box)

interface HeaderDropdownProps {
  hoveredNavIndex: number | null
  setHoveredNavIndex: (hoveredNavIndex: number | null) => void
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  hoveredNavIndex,
  setHoveredNavIndex,
}) => {
  const { navItems, editorialNavItems } = useNavItems()

  const showDropdown =
    hoveredNavIndex !== null && navItems[hoveredNavIndex]?.subItems

  return (
    <AnimatePresence mode="wait">
      {showDropdown && (
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          onMouseEnter={() => setHoveredNavIndex(hoveredNavIndex)}
          onMouseLeave={() => setHoveredNavIndex(null)}
          position="absolute"
          top="100%"
          left="0"
          right="0"
          zIndex="1000"
        >
          <MotionBox
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            overflow="hidden"
          >
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Box
                bgColor="grey.0"
                backdropFilter="blur(12px)"
                px="40px"
                borderTop="1px solid"
                borderBottom="1px solid"
                borderColor="border.basic.1"
                boxShadow="0 4px 24px rgba(0, 0, 0, 0.08)"
              >
                <Box maxW="1280px" mx="auto">
                  <Box display="flex" alignItems="flex-start">
                    {/* 좌측 타이틀 */}
                    <Box p="40px 36px" maxW="300px" w="full">
                      <MotionBox
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <Text
                          textAlign="right"
                          fontFamily="Catholic"
                          fontSize="20px"
                          fontWeight="400"
                          lineHeight="28px"
                          letterSpacing="-0.2px"
                        >
                          {navItems[hoveredNavIndex].label}
                        </Text>
                      </MotionBox>
                    </Box>

                    {/* 우측 서브메뉴 그리드 */}
                    <Box
                      flex="1"
                      p="40px 36px"
                      display="flex"
                      flexFlow="column nowrap"
                      gap="10px"
                    >
                      <Box display="flex" gap="10px" flexWrap="wrap">
                        {navItems[hoveredNavIndex].subItems?.map(
                          (subItem, subIndex) => (
                            <MotionBox
                              key={subItem.href}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.1 + subIndex * 0.03,
                                duration: 0.25,
                                ease: 'easeOut',
                              }}
                            >
                              <HeaderSubMenu
                                href={
                                  subItem.disabled ? undefined : subItem.href
                                }
                                {...(subItem.disabled && {
                                  cursor: 'not-allowed',
                                  opacity: 0.4,
                                  _hover: {
                                    textDecoration: 'none',
                                  },
                                })}
                              >
                                {subItem.label}
                              </HeaderSubMenu>
                            </MotionBox>
                          ),
                        )}
                      </Box>
                      <Box display="flex" gap="10px" flexWrap="wrap">
                        {hoveredNavIndex === navItems.length - 1 &&
                          editorialNavItems.subItems?.map(
                            (subItem, subIndex) => {
                              const subItemsLength =
                                navItems[hoveredNavIndex].subItems?.length ?? 0
                              const delay =
                                0.1 + (subIndex + subItemsLength) * 0.03

                              return (
                                <MotionBox
                                  key={subItem.href}
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay,
                                    duration: 0.25,
                                    ease: 'easeOut',
                                  }}
                                >
                                  <HeaderSubMenu href={subItem.href}>
                                    {subItem.label}
                                  </HeaderSubMenu>
                                </MotionBox>
                              )
                            },
                          )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </MotionBox>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}

export default HeaderDropdown
