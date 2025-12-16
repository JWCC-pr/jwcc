import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query'

import { fetchExtended } from '@/configs/fetch/fetch-extend'

import {
  CommonErrorType,
  PassingNoticeCommentErrorMessageType,
} from '../@types/data-contracts'
import {
  InfiniteQueryHookParams,
  MutationHookParams,
  Parameter,
  QueryHookParams,
  RequestFnReturn,
} from '../@types/react-query-type'
import { PassingNoticeCommentApi } from './PassingNoticeComment.api'

export const passingNoticeCommentApi = new PassingNoticeCommentApi({
  customFetch: fetchExtended,
})

/**
 * query key 에 undefined 를 포함시키지 않기 위한 함수입니다.
 */
const isDefined = (v: unknown) => typeof v !== 'undefined'

/**
 * query-keys
 */

export const QUERY_KEY_PASSING_NOTICE_COMMENT_API = {
  LIST: (
    variables?: Parameter<
      typeof passingNoticeCommentApi.passingNoticeCommentList
    >,
  ) => ['PASSING_NOTICE_COMMENT_LIST', variables].filter(isDefined),
  LIST_INFINITE: (
    variables?: Parameter<
      typeof passingNoticeCommentApi.passingNoticeCommentList
    >,
  ) => ['PASSING_NOTICE_COMMENT_LIST_INFINITE', variables].filter(isDefined),
  CREATE: () => ['PASSING_NOTICE_COMMENT_CREATE'],
  UPDATE: () => ['PASSING_NOTICE_COMMENT_UPDATE'],
  DESTROY: () => ['PASSING_NOTICE_COMMENT_DESTROY'],
}

/**
 * No description
 *
 * @tags passing_notice_comment
 * @name PassingNoticeCommentList
 * @summary 선종 안내 댓글 목록 조회
 * @request GET:/v1/passing_notice/{passing_notice_id}/comment/
 * @secure    */

export const usePassingNoticeCommentListQuery = <
  TData = RequestFnReturn<
    typeof passingNoticeCommentApi.passingNoticeCommentList
  >,
>(
  params: QueryHookParams<
    typeof passingNoticeCommentApi.passingNoticeCommentList,
    { error: CommonErrorType },
    TData
  >,
) => {
  const queryKey = QUERY_KEY_PASSING_NOTICE_COMMENT_API.LIST(params.variables)
  return useQuery({
    queryKey,
    queryFn: () =>
      passingNoticeCommentApi.passingNoticeCommentList(params.variables),
    ...params?.options,
  })
}

/**
 * No description    *      * @tags passing_notice_comment
 * @name PassingNoticeCommentList
 * @summary 선종 안내 댓글 목록 조회
 * @request GET:/v1/passing_notice/{passing_notice_id}/comment/
 * @secure    */

export const usePassingNoticeCommentListInfiniteQuery = <
  TData = InfiniteData<
    RequestFnReturn<typeof passingNoticeCommentApi.passingNoticeCommentList>,
    Parameter<typeof passingNoticeCommentApi.passingNoticeCommentList>
  >,
>(
  params: InfiniteQueryHookParams<
    typeof passingNoticeCommentApi.passingNoticeCommentList,
    CommonErrorType,
    TData
  >,
) => {
  const queryKey = QUERY_KEY_PASSING_NOTICE_COMMENT_API.LIST_INFINITE(
    params.variables,
  )
  return useInfiniteQuery({
    queryKey,
    initialPageParam: null,
    queryFn: ({ pageParam }: { pageParam: any }) => {
      return passingNoticeCommentApi.passingNoticeCommentList({
        ...params?.variables,
        query:
          pageParam ?
            { ...params?.variables?.query, cursor: pageParam }
          : { ...params?.variables?.query },
      })
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursor
    },
    ...params?.options,
  })
}

/**
 * No description
 *
 * @tags passing_notice_comment
 * @name PassingNoticeCommentCreate
 * @summary 선종 안내 댓글 등록
 * @request POST:/v1/passing_notice/{passing_notice_id}/comment/
 * @secure  */

export const usePassingNoticeCommentCreateMutation = (
  params: MutationHookParams<
    typeof passingNoticeCommentApi.passingNoticeCommentCreate,
    { error: PassingNoticeCommentErrorMessageType | CommonErrorType }
  >,
) => {
  const mutationKey = QUERY_KEY_PASSING_NOTICE_COMMENT_API.CREATE()
  return useMutation({
    mutationKey,
    mutationFn: passingNoticeCommentApi.passingNoticeCommentCreate,
    ...params?.options,
  })
}

/**
 * No description
 *
 * @tags passing_notice_comment
 * @name PassingNoticeCommentUpdate
 * @summary 선종 안내 댓글 수정
 * @request PUT:/v1/passing_notice/{passing_notice_id}/comment/{id}/
 * @secure  */

export const usePassingNoticeCommentUpdateMutation = (
  params: MutationHookParams<
    typeof passingNoticeCommentApi.passingNoticeCommentUpdate,
    { error: PassingNoticeCommentErrorMessageType | CommonErrorType }
  >,
) => {
  const mutationKey = QUERY_KEY_PASSING_NOTICE_COMMENT_API.UPDATE()
  return useMutation({
    mutationKey,
    mutationFn: passingNoticeCommentApi.passingNoticeCommentUpdate,
    ...params?.options,
  })
}

/**
 * No description
 *
 * @tags passing_notice_comment
 * @name PassingNoticeCommentDestroy
 * @summary 선종 안내 댓글 삭제
 * @request DELETE:/v1/passing_notice/{passing_notice_id}/comment/{id}/
 * @secure  */

export const usePassingNoticeCommentDestroyMutation = (
  params: MutationHookParams<
    typeof passingNoticeCommentApi.passingNoticeCommentDestroy,
    { error: CommonErrorType }
  >,
) => {
  const mutationKey = QUERY_KEY_PASSING_NOTICE_COMMENT_API.DESTROY()
  return useMutation({
    mutationKey,
    mutationFn: passingNoticeCommentApi.passingNoticeCommentDestroy,
    ...params?.options,
  })
}

/**
 * !DO NOT EDIT THIS FILE
 *
 * 스크립트가 실행될때, 파일을 항상 새로 쓰기 때문에 파일 수정시 작성내용이 제거 될 수 있습니다.
 */

/**
 * tok-cli.config.ts 에서 설정된 instance 경로의 axios instace 가 적용된, api 의 instance 입니다.
 */
