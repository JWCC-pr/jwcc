'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Link } from '@chakra-ui/react/link'
import { Popover } from '@chakra-ui/react/popover'
import { Portal } from '@chakra-ui/react/portal'
import { Text } from '@chakra-ui/react/text'
import { CaretDownIcon, UserIcon } from '@phosphor-icons/react'

import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { ROUTES } from '@/constants/routes'
import { QUERY_KEY_USER_API } from '@/generated/apis/User/User.query'
import { useInvalidateQueries } from '@/hooks/useInvalidateQueries'
import useMe from '@/hooks/useMe'
import { clientCookie } from '@/stores/cookie/store'

const styleMap = {
  default: {
    color: 'grey.0',
  },
  scrolled: {
    color: 'grey.10',
  },
} as const

interface HeaderUserMenuProps {
  isScrolled?: boolean
}

const HeaderUserMenu: React.FC<HeaderUserMenuProps> = ({ isScrolled }) => {
  const { data: me } = useMe()
  const invalidate = useInvalidateQueries()
  const [isOpen, setIsOpen] = useState(false)

  const isLoggedIn = !!me

  const handleLogout = () => {
    clientCookie.remove(COOKIE_KEYS.AUTH.ACCESS_TOKEN)
    clientCookie.remove(COOKIE_KEYS.AUTH.REFRESH_TOKEN)

    invalidate(QUERY_KEY_USER_API.RETRIEVE({ id: 'me' }))
  }

  return (
    <Box w="180px" h="full" display="flex" justifyContent="flex-end">
      {isLoggedIn ?
        <Popover.Root
          open={isOpen}
          onOpenChange={(e) => setIsOpen(e.open)}
          positioning={{ placement: 'bottom-end', offset: { mainAxis: 10 } }}
        >
          <Popover.Trigger asChild>
            <Box display="flex" alignItems="center" gap="10px" cursor="pointer">
              <Box display="flex" flexDirection="column">
                <Text
                  textStyle="pre-body-5"
                  color={styleMap[isScrolled ? 'scrolled' : 'default'].color}
                >
                  {me.name} 님
                </Text>
                <Text
                  textStyle="pre-caption-4"
                  color={styleMap[isScrolled ? 'scrolled' : 'default'].color}
                >
                  {me.baptismalName}
                </Text>
              </Box>
              <CaretDownIcon size="20px" color={isScrolled ? '#000' : '#fff'} />
            </Box>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content
                w="180px"
                rounded="8px"
                border="1px solid"
                borderColor="grey.2"
                bgColor="grey.0"
                boxShadow="shadow-bottom"
              >
                <Popover.Body p="0">
                  <Box
                    as="button"
                    onClick={handleLogout}
                    w="full"
                    p="8px 10px"
                    textAlign="left"
                    textStyle="pre-body-6"
                    cursor="pointer"
                    color="accent.red2"
                    outline="none"
                  >
                    로그아웃
                  </Box>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      : <Link
          href={ROUTES.LOGIN}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <UserIcon size="24px" color={isScrolled ? '#000' : '#fff'} />
        </Link>
      }
    </Box>
  )
}

export default HeaderUserMenu
