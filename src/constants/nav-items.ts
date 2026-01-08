import { ROUTES } from './routes'

export interface NavItem {
  startPath: string
  label: string
  href?: string
  subItems: {
    label: string
    href: string
    disabled?: boolean
  }[]
}

export const NAV_ITEMS: NavItem[] = [
  {
    startPath: '/about',
    label: '본당 소개',
    subItems: [
      { label: '본당 소개', href: ROUTES.ABOUT_INTRODUCTION },
      { label: '본당 역사', href: ROUTES.ABOUT_HISTORY },
      { label: '주보 성인', href: ROUTES.ABOUT_PATRON_SAINT },
      { label: '본당 상징 및 로고', href: ROUTES.ABOUT_SYMBOL },
      { label: '사목지침', href: ROUTES.ABOUT_PASTORAL },
      { label: '본당 사제·수도자', href: ROUTES.ABOUT_PRIESTS },
      { label: '역대 사제·수도자', href: ROUTES.ABOUT_PAST_PRIESTS },
      { label: '오시는 길', href: ROUTES.ABOUT_DIRECTION },
    ],
  },
  {
    startPath: '/news',
    label: '본당 소식',
    subItems: [
      { label: '공지사항', href: ROUTES.NEWS_NOTICES },
      { label: '본당 소식', href: ROUTES.NEWS_EVENT },
      { label: '주보', href: ROUTES.NEWS_BULLETIN },
      { label: '선종 안내', href: ROUTES.NEWS_PASSING_NOTICE },
      { label: '전례꽃 갤러리', href: ROUTES.NEWS_LITURGY_FLOWER },
      { label: '자유게시판', href: ROUTES.NEWS_FREE_BOARD },
      { label: '자료실', href: ROUTES.NEWS_DOCUMENT },
      { label: '본당 일정', href: ROUTES.NEWS_EVENT_SCHEDULE },
    ],
  },
  {
    startPath: '/community',
    label: '신앙 공동체',
    subItems: [
      { label: '사목협의회 조직도', href: ROUTES.COMMUNITY_PASTORAL_COUNCIL },
      { label: '본당 관할 구역도', href: ROUTES.COMMUNITY_PARISH_AREA },
    ],
  },
  {
    startPath: '/services',
    label: '본당 업무',
    subItems: [
      { label: '사무실 안내', href: ROUTES.SERVICES_OFFICE },
      { label: '예비신자 안내', href: ROUTES.SERVICES_CATECHUMEN },
      { label: '혼인성사 안내', href: ROUTES.SERVICES_MARRIAGE },
      { label: '전입 교우 안내', href: ROUTES.SERVICES_TRANSFER },
    ],
  },
  {
    startPath: '/department',
    label: '분과 게시판',
    subItems: [
      { label: '명도회 자료실', href: ROUTES.EDITORIAL_MYEONGDO },
      { label: '주보 7면 편집', href: ROUTES.EDITORIAL_DRAFT },
      { label: '주보 7면 최종본', href: ROUTES.EDITORIAL_FINAL },
      { label: '주보 7면 양식', href: ROUTES.EDITORIAL_TEMPLATE },
    ],
  },
]
