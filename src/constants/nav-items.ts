import { ROUTES } from './routes'

export interface NavItem {
  label: string
  href?: string
  subItems?: {
    label: string
    href: string
    disabled?: boolean
  }[]
}

export const NAV_ITEMS: NavItem[] = [
  {
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
      { label: '본당 행사 일정', href: ROUTES.ABOUT_EVENT_SCHEDULE },
    ],
  },
  {
    label: '본당 소식',
    subItems: [
      { label: '공지사항', href: ROUTES.NEWS_NOTICES },
      { label: '본당 소식', href: ROUTES.NEWS_EVENT },
      { label: '주보', href: ROUTES.NEWS_BULLETIN },
      { label: '선종 안내', href: ROUTES.NEWS_PASSING_NOTICE },
      { label: '전례꽃 갤러리', href: ROUTES.NEWS_LITURGY_FLOWER },
      { label: '자유게시판', href: ROUTES.NEWS_FREE_BOARD },
      { label: '자료실', href: ROUTES.NEWS_DOCUMENT },
    ],
  },
  {
    label: '신앙 공동체',
    subItems: [
      {
        label: '사목협의회 조직도',
        href: ROUTES.COMMUNITY_PASTORAL_COUNCIL,
        disabled: true,
      },
      { label: '본당 관할 구역도', href: ROUTES.COMMUNITY_PARISH_AREA },
      {
        label: '분과 바로가기',
        href: ROUTES.COMMUNITY_DEPARTMENTS,
        disabled: true,
      },
    ],
  },
  {
    label: '본당 업무',
    subItems: [
      { label: '사무실 안내', href: ROUTES.SERVICES_OFFICE },
      { label: '예비신자 안내', href: ROUTES.SERVICES_CATECHUMEN },
      { label: '혼인성사 예약 안내', href: ROUTES.SERVICES_MARRIAGE },
      { label: '전입 교우 안내', href: ROUTES.SERVICES_TRANSFER },
    ],
  },
]
