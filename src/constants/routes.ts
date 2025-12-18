export const ROUTES = {
  HOME: `/`,

  // ================================ 인증 관련 라우트 ================================
  LOGIN: `/login`,
  SIGNUP: `/signup`,
  SIGNUP_COMPLETE: `/signup-complete`,
  FORGOT_PASSWORD: `/forgot-password`,
  FORGOT_PASSWORD_COMPLETE: `/forgot-password-complete`,
  RESET_PASSWORD: `/reset-password`,
  RESET_PASSWORD_COMPLETE: `/reset-password-complete`,

  // ================================ 본당 소개 관련 라우트 ================================
  /** 본당 소개 */
  ABOUT_INTRODUCTION: `/about/introduction`,
  /** 본당 역사 */
  ABOUT_HISTORY: `/about/history`,
  /** 주보 성인 */
  ABOUT_PATRON_SAINT: `/about/patron-saint`,
  /** 본당 상징 및 로고 */
  ABOUT_SYMBOL: `/about/symbol`,
  /** 사목지침 */
  ABOUT_PASTORAL: `/about/pastoral`,
  /** 본당 사제·수도자 */
  ABOUT_PRIESTS: `/about/priests`,
  /** 역대 사제·수도자 */
  ABOUT_PAST_PRIESTS: `/about/past-priests`,
  /** 미사시간 안내 및 오시는 길 */
  ABOUT_MASS_SCHEDULE: `/about/mass-schedule`,
  /** 본당 행사 일정 */
  ABOUT_EVENTS: `/about/events`,

  // ================================ 본당 소식 관련 라우트 ================================
  /** 공지사항 */
  NEWS_NOTICES: `/news/notices`,
  /** 공지사항 상세 */
  NEWS_NOTICES_DETAIL: (id: number) => `/news/notices/${id}`,
  /** 본당 행사 */
  NEWS_EVENT: `/news/event`,
  /** 본당 행사 상세 */
  NEWS_EVENT_DETAIL: (id: number) => `/news/event/${id}`,
  /** 주보 */
  NEWS_BULLETIN: `/news/bulletin`,
  /** 선종 안내 */
  NEWS_PASSING_NOTICE: `/news/passing-notice`,
  /** 선종 안내 상세 */
  NEWS_PASSING_NOTICE_DETAIL: (id: number) => `/news/passing-notice/${id}`,
  /** 전례꽃 갤러리 */
  NEWS_LITURGY_FLOWER: `/news/liturgy-flower`,
  /** 전례꽃 갤러리 상세 */
  NEWS_LITURGY_FLOWER_DETAIL: (id: number) => `/news/liturgy-flower/${id}`,
  /** 전례꽃 갤러리 생성 */
  NEWS_LITURGY_FLOWER_CREATE: `/news/liturgy-flower/create`,
  /** 전례꽃 갤러리 수정 */
  NEWS_LITURGY_FLOWER_EDIT: (id: number) => `/news/liturgy-flower/${id}/edit`,
  /** 자유게시판 */
  NEWS_FREE_BOARD: `/news/free-board`,
  /** 자유게시판 상세 */
  NEWS_FREE_BOARD_DETAIL: (id: number) => `/news/free-board/${id}`,
  /** 자유게시판 생성 */
  NEWS_FREE_BOARD_CREATE: `/news/free-board/create`,
  /** 자유게시판 수정 */
  NEWS_FREE_BOARD_EDIT: (id: number) => `/news/free-board/${id}/edit`,
  /** 자료실 */
  NEWS_DOCUMENT: `/news/document`,
  /** 자료실 상세 */
  NEWS_DOCUMENT_DETAIL: (id: number) => `/news/document/${id}`,

  // ================================ 신앙 공동체 관련 라우트 ================================
  /** 사목협의회 조직도 */
  COMMUNITY_PASTORAL_COUNCIL: `/community/pastoral-council`,
  /** 본당 관할 구역도 */
  COMMUNITY_PARISH_AREA: `/community/parish-area`,
  /** 분과 바로가기 */
  COMMUNITY_DEPARTMENTS: `/community/departments`,

  // ================================ 본당 업무 관련 라우트 ================================
  /** 사무실 안내 */
  SERVICES_OFFICE: `/services/office`,
  /** 예비신자 안내 */
  SERVICES_CATECHUMEN: `/services/catechumen`,
  /** 혼인성사 예약 안내 */
  SERVICES_MARRIAGE: `/services/marriage`,
  /** 전입 교우 안내 */
  SERVICES_TRANSFER: `/services/transfers`,
} as const
