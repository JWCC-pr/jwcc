'use client'

import { useMemo } from 'react'

import { usePathname } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { HouseIcon } from '@phosphor-icons/react'

import { NAV_ITEMS } from '@/constants/nav-items'
import { ROUTES } from '@/constants/routes'

import TwoDepthSelect from './twoDepthSelect'

const labelMap = {
  // 본당 소개
  [ROUTES.ABOUT_INTRODUCTION]: '본당 소개',
  [ROUTES.ABOUT_HISTORY]: '본당 역사',
  [ROUTES.ABOUT_PATRON_SAINT]: '주보 성인',
  [ROUTES.ABOUT_SYMBOL]: '본당 상징 및 로고',
  [ROUTES.ABOUT_PASTORAL]: '사목지침',
  [ROUTES.ABOUT_PRIESTS]: '본당 사제·수도자',
  [ROUTES.ABOUT_PAST_PRIESTS]: '역대 사제·수도자',
  [ROUTES.ABOUT_DIRECTION]: '오시는 길',
  [ROUTES.ABOUT_EVENT_SCHEDULE]: '본당 행사 일정',
  // 본당 소식
  [ROUTES.NEWS_NOTICES]: '공지사항',
  [ROUTES.NEWS_EVENT]: '본당 소식',
  [ROUTES.NEWS_BULLETIN]: '주보',
  [ROUTES.NEWS_PASSING_NOTICE]: '선종 안내',
  [ROUTES.NEWS_LITURGY_FLOWER]: '전례꽃 갤러리',
  [ROUTES.NEWS_FREE_BOARD]: '자유게시판',
  [ROUTES.NEWS_DOCUMENT]: '자료실',
  // 신앙 공동체
  [ROUTES.COMMUNITY_PASTORAL_COUNCIL]: '사목협의회 조직도',
  [ROUTES.COMMUNITY_PARISH_AREA]: '본당 관할 구역도',
  [ROUTES.COMMUNITY_DEPARTMENTS]: '분과 바로가기',
  // 본당 업무
  [ROUTES.SERVICES_OFFICE]: '사무실 안내',
  [ROUTES.SERVICES_CATECHUMEN]: '예비신자 안내',
  [ROUTES.SERVICES_MARRIAGE]: '혼인성사 안내',
  [ROUTES.SERVICES_TRANSFER]: '전입 교우 안내',
} as const

const oneDepthLabelMap = {
  // 본당 소개
  [ROUTES.ABOUT_INTRODUCTION]: '본당 소개',
  [ROUTES.ABOUT_HISTORY]: '본당 소개',
  [ROUTES.ABOUT_PATRON_SAINT]: '본당 소개',
  [ROUTES.ABOUT_SYMBOL]: '본당 소개',
  [ROUTES.ABOUT_PASTORAL]: '본당 소개',
  [ROUTES.ABOUT_PRIESTS]: '본당 소개',
  [ROUTES.ABOUT_PAST_PRIESTS]: '본당 소개',
  [ROUTES.ABOUT_DIRECTION]: '본당 소개',
  [ROUTES.ABOUT_EVENT_SCHEDULE]: '본당 소개',
  // 본당 소식
  [ROUTES.NEWS_NOTICES]: '본당 소식',
  [ROUTES.NEWS_EVENT]: '본당 소식',
  [ROUTES.NEWS_BULLETIN]: '본당 소식',
  [ROUTES.NEWS_PASSING_NOTICE]: '본당 소식',
  [ROUTES.NEWS_LITURGY_FLOWER]: '본당 소식',
  [ROUTES.NEWS_FREE_BOARD]: '본당 소식',
  [ROUTES.NEWS_DOCUMENT]: '본당 소식',
  // 신앙 공동체
  [ROUTES.COMMUNITY_PASTORAL_COUNCIL]: '신앙 공동체',
  [ROUTES.COMMUNITY_PARISH_AREA]: '신앙 공동체',
  [ROUTES.COMMUNITY_DEPARTMENTS]: '신앙 공동체',
  // 본당 업무
  [ROUTES.SERVICES_OFFICE]: '본당 업무',
  [ROUTES.SERVICES_CATECHUMEN]: '본당 업무',
  [ROUTES.SERVICES_MARRIAGE]: '본당 업무',
  [ROUTES.SERVICES_TRANSFER]: '본당 업무',
} as const

const SubLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname() as keyof typeof labelMap

  const mainLabel = labelMap[pathname]
  const oneDepthLabel = oneDepthLabelMap[pathname]

  const index = useMemo(() => {
    if (oneDepthLabel === '본당 소개') return 0
    else if (oneDepthLabel === '본당 소식') return 1
    else if (oneDepthLabel === '신앙 공동체') return 2

    return 3
  }, [oneDepthLabel])
  const options = useMemo(
    () =>
      NAV_ITEMS[index].subItems?.map(({ href, label, disabled }) => ({
        label,
        value: href,
        disabled: disabled,
      })) ?? [],
    [index],
  )

  if (!mainLabel || !oneDepthLabel) {
    return (
      <Box
        w="full"
        maxW="1280px"
        mx="auto"
        p={['40px 20px 96px', '40px 40px 96px', '40px 40px 120px']}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box display="flex" flexFlow="column nowrap">
      <Box
        w="full"
        maxW="1280px"
        mx="auto"
        px={['20px', '40px']}
        h="180px"
        display="flex"
        alignItems="center"
        textStyle="cat-display-4"
        color="grey.10"
      >
        {mainLabel}
      </Box>
      <Box borderBlock="1px solid" borderColor="border.basic.1">
        <Box
          w="full"
          maxW="1280px"
          mx="auto"
          px={['0 20px', '40px']}
          display="flex"
          h="48px"
        >
          <Link
            href={ROUTES.HOME}
            p="12px"
            _hover={{
              textDecoration: 'none',
            }}
          >
            <HouseIcon size="24px" color="#780536" />
          </Link>
          <Box w="1px" h="auto" bgColor="border.basic.1" />
          <Box p="12px 16px" w="180px" h="48px">
            <Text lineClamp="1" textStyle="pre-body-6" color="grey.8">
              {oneDepthLabel}
            </Text>
          </Box>
          <Box w="1px" h="auto" bgColor="border.basic.1" />
          <TwoDepthSelect options={options} />
          <Box w="1px" h="auto" bgColor="border.basic.1" />
        </Box>
      </Box>
      <Box
        w="full"
        maxW="1280px"
        mx="auto"
        p={['40px 20px 96px', '40px 40px 96px', '40px 40px 120px']}
      >
        {children}
      </Box>
    </Box>
  )
}

export default SubLayout
