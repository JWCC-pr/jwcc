export interface NavItem {
  label: string
  href?: string
  subItems?: {
    label: string
    href: string
  }[]
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: '본당 소개',
    subItems: [
      { label: '본당 소개', href: '#/about' },
      { label: '본당 역사', href: '#/history' },
      { label: '주보 성인', href: '#/patron-saint' },
      { label: '본당 상징 및 로고', href: '#/symbol' },
      { label: '사목지침', href: '#/pastoral' },
      { label: '본당 사제·수도자', href: '#/priests' },
      { label: '역대 사제·수도자', href: '#/past-priests' },
      { label: '미사시간 안내 및 오시는 길', href: '#/mass-schedule' },
      { label: '본당 행사 일정', href: '#/events' },
    ],
  },
  {
    label: '본당 소식',
    subItems: [
      { label: '공지사항', href: '#/notices' },
      { label: '소식', href: '#/news' },
    ],
  },
  {
    label: '신앙 공동체',
    subItems: [
      { label: '공동체 소개 1', href: '#/communities/1' },
      { label: '공동체 소개 2', href: '#/communities/2' },
    ],
  },
  {
    label: '본당 업무',
    subItems: [
      { label: '업무 안내 1', href: '#/services/1' },
      { label: '업무 안내 2', href: '#/services/2 ' },
    ],
  },
]
