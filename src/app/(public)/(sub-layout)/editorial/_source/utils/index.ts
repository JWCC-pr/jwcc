/**
 * `draft`: 주보 7면 편집
 * `final`: 주보 7면 최종본
 * `myeongdo`: 명도회 자료실
 * `template`: 주보 7면 양식
 */
export type EditorialType = 'draft' | 'final' | 'myeongdo' | 'template'

export const editorialRoutes = {
  /** 자료 목록 */
  EDITORIAL_LIST: (type: EditorialType) => `/editorial/${type}`,
  /** 자료 상세 */
  EDITORIAL_DETAIL: (type: EditorialType, id: number) =>
    `/editorial/${type}/${id}`,
  /** 자료 생성 */
  EDITORIAL_CREATE: (type: EditorialType) => `/editorial/${type}/create`,
}
