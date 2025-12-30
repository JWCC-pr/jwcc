'use client'

import { useState } from 'react'

import { usePathname } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Collapsible } from '@chakra-ui/react/collapsible'
import { Drawer } from '@chakra-ui/react/drawer'
import { Link } from '@chakra-ui/react/link'
import { Portal } from '@chakra-ui/react/portal'
import { Text } from '@chakra-ui/react/text'
import {
  CaretUpIcon,
  ListIcon,
  SignOutIcon,
  UserIcon,
  XIcon,
} from '@phosphor-icons/react'

import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { NAV_ITEMS } from '@/constants/nav-items'
import { ROUTES } from '@/constants/routes'
import { QUERY_KEY_USER_API } from '@/generated/apis/User/User.query'
import { LogoHoverIcon } from '@/generated/icons/MyIcons'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import useMe from '@/hooks/useMe'
import { clientCookie } from '@/stores/cookie/store'
import { matchingPath } from '@/utils/middleware/matching-path'

interface MobileMenuButtonProps {
  isScrolled?: boolean
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isScrolled }) => {
  const pathname = usePathname()
  const { data: me } = useMe()

  const [openItem, setOpenItem] = useState<string | null>(() => {
    // 현재 경로와 일치하는 메뉴 항목이 있다면 기본적으로 열어둠
    for (const item of NAV_ITEMS) {
      if (item.subItems) {
        const hasActiveSubItem = item.subItems.some((subItem) =>
          matchingPath([subItem.href], pathname),
        )
        if (hasActiveSubItem) {
          return item.label
        }
      }
    }
    return null
  })

  const invalidate = useInvalidateQueries()
  const handleLogout = () => {
    clientCookie.remove(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
    clientCookie.remove(COOKIE_KEYS.AUTH.REFRESH_TOKEN)

    invalidate(QUERY_KEY_USER_API.RETRIEVE({ id: 'me' }))
  }

  return (
    <Drawer.Root size="full">
      <Drawer.Trigger asChild>
        <ListIcon
          size="24px"
          color={isScrolled ? 'black' : 'white'}
          cursor="pointer"
        />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Positioner>
          <Drawer.Content bgColor="background.basic.1">
            <Drawer.Header
              minH="64px"
              h="64px"
              p={['0px 20px', '0px 40px']}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderBottom="1px solid"
              borderBottomColor="border.basic.1"
            >
              <Link href={ROUTES.HOME}>
                <LogoHoverIcon w="122px" h="36px" />
              </Link>
              <Drawer.CloseTrigger asChild>
                <XIcon size="24px" cursor="pointer" />
              </Drawer.CloseTrigger>
            </Drawer.Header>

            <Drawer.Body p="20px 0">
              <Box display="flex" flexDirection="column">
                {NAV_ITEMS.map((item) => {
                  const isOpen = openItem === item.label
                  const hasSubItems = item.subItems && item.subItems.length > 0

                  return (
                    <Collapsible.Root
                      key={item.label}
                      open={isOpen}
                      onOpenChange={(e) => {
                        if (e.open) {
                          setOpenItem(item.label)
                        } else {
                          setOpenItem(null)
                        }
                      }}
                    >
                      <Collapsible.Trigger
                        asChild={!hasSubItems}
                        w="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        p={['20px', '20px 40px']}
                        cursor="pointer"
                      >
                        <Text textStyle="pre-heading-2" color="grey.10">
                          {item.label}
                        </Text>
                        {hasSubItems && (
                          <Box
                            transform={
                              isOpen ? 'rotate(0deg)' : 'rotate(180deg)'
                            }
                            transition="transform 0.2s"
                            transformOrigin="center"
                          >
                            <CaretUpIcon size="20px" color="#999" />
                          </Box>
                        )}
                      </Collapsible.Trigger>

                      {hasSubItems && (
                        <Collapsible.Content>
                          <Box>
                            {item.subItems?.map((subItem) => {
                              const isActive = matchingPath(
                                [subItem.href],
                                pathname,
                              )
                              const isDisabled = subItem.disabled

                              return (
                                <Link
                                  key={subItem.href}
                                  href={isDisabled ? '#' : subItem.href}
                                  display="block"
                                  p={['16px 32px', '16px 64px']}
                                  bgColor={
                                    isActive ? 'primary.1' : (
                                      'background.basic.2'
                                    )
                                  }
                                  color={isActive ? 'primary.4' : 'grey.8'}
                                  textStyle={
                                    isActive ? 'pre-body-1' : 'pre-body-2'
                                  }
                                  opacity={isDisabled ? 0.4 : 1}
                                  cursor={
                                    isDisabled ? 'not-allowed' : 'pointer'
                                  }
                                  _hover={{
                                    bgColor: 'primary.1',
                                    textDecoration: 'none',
                                  }}
                                  onClick={(e) => {
                                    if (!isDisabled) return

                                    e.preventDefault()
                                  }}
                                >
                                  {subItem.label}
                                </Link>
                              )
                            })}
                          </Box>
                        </Collapsible.Content>
                      )}
                    </Collapsible.Root>
                  )
                })}
              </Box>
            </Drawer.Body>

            <Drawer.Footer
              p={['12px 20px', '12px 40px']}
              borderTop="1px solid"
              borderTopColor="border.basic.1"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {me ?
                <>
                  <Box display="flex" gap="6px" alignItems="center">
                    <Text textStyle="pre-heading-4" color="grey.10">
                      {me.name}
                    </Text>
                    <Text textStyle="pre-body-6" color="grey.7">
                      {me.baptismalName}
                    </Text>
                  </Box>

                  <Button
                    type="button"
                    size="md"
                    variant="ghost"
                    colorPalette="red"
                    onClick={handleLogout}
                  >
                    <SignOutIcon size="20px" color="#EE3538" /> 로그아웃
                  </Button>
                </>
              : <Link
                  href={ROUTES.LOGIN}
                  _hover={{
                    textDecoration: 'none',
                  }}
                >
                  <Button
                    type="button"
                    size="md"
                    variant="ghost"
                    colorPalette="grey"
                  >
                    <UserIcon size="20px" color="#4E5053" />
                    로그인
                  </Button>
                </Link>
              }
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default MobileMenuButton
