import { Box } from '@chakra-ui/react/box'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

import {
  LayoutFooterFacebookIcon,
  LayoutFooterInstagramIcon,
  LayoutFooterLogoIcon,
  LayoutFooterYoutubeIcon,
} from '@/generated/icons/MyIcons'

const menuItems = [
  {
    label: '본당 소개',
    subItems: [
      { label: '본당 소개' },
      { label: '본당 역사' },
      { label: '주보 성인' },
      { label: '본당 상징 및 로고' },
      { label: '사목지침' },
      { label: '본당 사제 · 수도자' },
      { label: '역대 사제 · 수도자' },
      { label: '오시는 길' },
      { label: '본당 행사 일정' },
    ],
  },
  {
    label: '본당 소식',
    subItems: [
      { label: '공지사항' },
      { label: '본당 소식' },
      { label: '본당 주보' },
      { label: '서울 주보' },
      { label: '선종 안내' },
      { label: '전례꽃 갤러리' },
      { label: '자유게시판' },
      { label: '자료실' },
    ],
  },
  {
    label: '신앙 공동체',
    subItems: [
      { label: '사목협의회 조직도' },
      { label: '본당 관할 구역도' },
      { label: '분과 바로가기' },
    ],
  },
  {
    label: '본당 업무',
    subItems: [
      { label: '사무실 안내' },
      { label: '예비신자 안내' },
      { label: '혼인성사 예약 안내' },
      { label: '전입 교우 안내' },
    ],
  },
]
const snsItems = [
  {
    icon: <LayoutFooterYoutubeIcon w="24px" h="24px" />,
    href: `https://www.youtube.com/@jwcc_official`,
  },
  {
    icon: <LayoutFooterFacebookIcon w="24px" h="24px" />,
    href: `#TODO: 링크 수정`,
  },
  {
    icon: <LayoutFooterInstagramIcon w="24px" h="24px" />,
    href: `https://www.instagram.com/jwcc_official`,
  },
]

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="grey.1">
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
            {menuItems.map((item) => (
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
                  {item.subItems.map((subItem) => (
                    <Text
                      key={subItem.label}
                      textStyle="pre-body-6"
                      color="grey.6"
                    >
                      {subItem.label}
                    </Text>
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
            <Box display="flex" flexFlow="column nowrap" gap="24px">
              <Box display="flex" flexFlow="column nowrap" gap="8px">
                <Text textStyle="pre-body-5" color="grey.8">
                  Contact
                </Text>
                <Box display="flex" flexFlow="column nowrap" gap="4px">
                  <Text textStyle="pre-body-6" color="grey.6">
                    서울 종로구 창신동 236-2 잠원동 성당
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
