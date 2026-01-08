/**
 * 공용 댓글 컴포넌트 타입 정의
 */

export interface CommentUser {
  name: string
  baptismalName?: string
}

export interface CommentType {
  id: number
  body: string
  user: CommentUser
  createdAt: string
  isOwned: boolean
  isDeleted: boolean
  isModified: boolean
}

export interface CommentListData {
  results?: CommentType[]
  count: number
}

export interface CommentListResult {
  data?: CommentListData
  isLoading: boolean
}

export interface CommentHooks {
  // 댓글 목록 조회 (최상위 댓글)
  useCommentList: () => CommentListResult

  // 댓글 생성
  createComment: (params: { body: string; parentId?: number }) => Promise<void>

  // 댓글 수정
  updateComment: (params: {
    id: number
    body: string
    parentId?: number
  }) => Promise<void>

  // 댓글 삭제
  deleteComment: (params: { id: number }) => Promise<void>

  // Query key 생성 함수들 (invalidation용)
  getListQueryKey: (params?: { parentId?: number }) => unknown[]
  getDetailQueryKey?: () => unknown[]
}

/**
 * 답글 목록 조회 훅 타입
 */
export type UseReplyListHook = (parentId: number) => CommentListResult
