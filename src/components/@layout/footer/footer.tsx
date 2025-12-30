import { Box } from '@chakra-ui/react/box'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

import { NAV_ITEMS } from '@/constants/nav-items'
import {
  LayoutFooterFacebookIcon,
  LayoutFooterInstagramIcon,
  LayoutFooterLogoIcon,
  LayoutFooterYoutubeIcon,
} from '@/generated/icons/MyIcons'

const snsItems = [
  {
    icon: <LayoutFooterYoutubeIcon w="24px" h="24px" />,
    href: `https://www.youtube.com/@JWCC1947`,
  },
  {
    icon: <LayoutFooterFacebookIcon w="24px" h="24px" />,
    href: `https://www.facebook.com/profile.php?id=61585123053041`,
  },
  {
    icon: <LayoutFooterInstagramIcon w="24px" h="24px" />,
    href: `https://www.instagram.com/jwcc_official`,
  },
]

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="grey.1" position="relative" zIndex={100}>
      <Box maxW="1280px" mx="auto">
        <Box
          p={['20px', '20px 40px']}
          display="flex"
          gap="12px"
          alignItems="center"
          borderBottom="1px solid"
          borderBottomColor="border.basic.1"
        >
          <Text textStyle="pre-body-5" color="grey.10">
            개인정보처리방침
          </Text>
          <Text textStyle="pre-body-5" color="grey.7">
            ·
          </Text>
          <Text textStyle="pre-body-5" color="grey.7">
            이용약관
          </Text>
        </Box>
        <Box
          p={['24px 20px 36px', '24px 40px 36px']}
          display="flex"
          flexFlow={['column nowrap', 'column nowrap', 'row nowrap']}
          gap="36px"
        >
          <Box flex="1" display={['none', 'flex']} gap="16px">
            {NAV_ITEMS.map((item) => (
              <Box
                key={item.label}
                flex="1"
                display="flex"
                flexFlow="column nowrap"
                gap="8px"
              >
                <Text textStyle="pre-body-5" color="grey.8">
                  {item.label}
                </Text>

                <Box display="flex" flexFlow="column nowrap" gap="6px">
                  {item.subItems?.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.disabled ? undefined : subItem.href}
                      textStyle="pre-body-6"
                      color={subItem.disabled ? 'grey.5' : 'grey.6'}
                      cursor={subItem.disabled ? 'not-allowed' : 'pointer'}
                      pointerEvents={subItem.disabled ? 'none' : 'auto'}
                      _hover={
                        subItem.disabled ? undefined : (
                          {
                            color: 'grey.10',
                            textDecoration: 'underline',
                          }
                        )
                      }
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            w="1px"
            h="auto"
            display={['none', 'none', 'block']}
            bgColor="border.basic.1"
          />

          <Box
            w={['full', 'full', '300px']}
            display="flex"
            flexFlow="column nowrap"
            justifyContent="space-between"
          >
            <Box display="flex" flexFlow="column nowrap" gap="20px">
              <Box display="flex" flexFlow="column nowrap" gap="8px">
                <Text textStyle="pre-body-5" color="grey.8">
                  Contact
                </Text>
                <Box display="flex" flexFlow="column nowrap" gap="4px">
                  <Text textStyle="pre-body-6" color="grey.6">
                    (06520) 서울특별시 서초구 잠원로 110 (잠원동)
                  </Text>
                  <Text textStyle="pre-body-6" color="grey.6">
                    02-742-3311
                  </Text>
                </Box>
              </Box>
              <Text textStyle="pre-caption-2" color="grey.5">
                Copyright © 잠원동 성당. ALLRights Reserved.
              </Text>
              <Box as="ul" display="flex" gap="10px">
                {snsItems.map((snsItem) => (
                  <Link
                    key={snsItem.href}
                    href={snsItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    {snsItem.icon}
                  </Link>
                ))}
              </Box>
            </Box>
            <Box alignSelf="flex-end">
              <LayoutFooterLogoIcon w="124px" h="37px" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
