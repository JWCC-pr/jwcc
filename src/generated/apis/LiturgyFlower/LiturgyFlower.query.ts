import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query'

import { fetchExtended } from '@/configs/fetch/fetch-extend'

import {
  CommonErrorType,
  LiturgyFlowerErrorMessageType,
} from '../@types/data-contracts'
import {
  InfiniteQueryHookParams,
  MutationHookParams,
  Parameter,
  QueryHookParams,
  RequestFnReturn,
} from '../@types/react-query-type'
import { LiturgyFlowerApi } from './LiturgyFlower.api'

export const liturgyFlowerApi = new LiturgyFlowerApi({
  customFetch: fetchExtended,
})

/**
 * query key 에 undefined 를 포함시키지 않기 위한 함수입니다.
 */
const isDefined = (v: unknown) => typeof v !== 'undefined'

/**
 * query-keys
 */

export const QUERY_KEY_LITURGY_FLOWER_API = {
  LIST: (variables?: Parameter<typeof liturgyFlowerApi.liturgyFlowerList>) =>
    ['LITURGY_FLOWER_LIST', variables].filter(isDefined),
  LIST_INFINITE: (
    variables?: Parameter<typeof liturgyFlowerApi.liturgyFlowerList>,
  ) => ['LITURGY_FLOWER_LIST_INFINITE', variables].filter(isDefined),
  CREATE: () => ['LITURGY_FLOWER_CREATE'],
  RETRIEVE: (
    variables?: Parameter<typeof liturgyFlowerApi.liturgyFlowerRetrieve>,
  ) => ['LITURGY_FLOWER_RETRIEVE', variables].filter(isDefined),
  UPDATE: () => ['LITURGY_FLOWER_UPDATE'],
  DESTROY: () => ['LITURGY_FLOWER_DESTROY'],
}

/**
 * No description
 *
 * @tags liturgy_flower
 * @name LiturgyFlowerList
 * @summary 전례꽃 목록 조회
 * @request GET:/v1/liturgy_flower/
 * @secure    */

export const useLiturgyFlowerListQuery = <
  TData = RequestFnReturn<typeof liturgyFlowerApi.liturgyFlowerList>,
>(
  params?: QueryHookParams<
    typeof liturgyFlowerApi.liturgyFlowerList,
    { error: CommonErrorType },
    TData
  >,
) => {
  const queryKey = QUERY_KEY_LITURGY_FLOWER_API.LIST(params?.variables)
  return useQuery({
    queryKey,
    queryFn: () => liturgyFlowerApi.liturgyFlowerList(params?.variables),
    ...params?.options,
  })
}

/**
 * No description    *      * @tags liturgy_flower
 * @name LiturgyFlowerList
 * @summary 전례꽃 목록 조회
 * @request GET:/v1/liturgy_flower/
 * @secure    */

export const useLiturgyFlowerListInfiniteQuery = <
  TData = InfiniteData<
    RequestFnReturn<typeof liturgyFlowerApi.liturgyFlowerList>,
    Parameter<typeof liturgyFlowerApi.liturgyFlowerList>
  >,
>(
  params?: InfiniteQueryHookParams<
    typeof liturgyFlowerApi.liturgyFlowerList,
    CommonErrorType,
    TData
  >,
) => {
  const queryKey = QUERY_KEY_LITURGY_FLOWER_API.LIST_INFINITE(params?.variables)
  return useInfiniteQuery({
    queryKey,
    initialPageParam: null,
    queryFn: ({ pageParam }) => {
      const offset = pageParam ?? params?.variables?.query?.offset ?? 0
      return liturgyFlowerApi.liturgyFlowerList({
        ...params?.variables,
        query: { ...params?.variables?.query, offset },
      })
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.isNext) return null
      const fetchedLength = allPages?.length || 0
      const initialOffset = params?.variables?.query?.offset || 0
      const limit = params?.variables?.query?.limit || 0

      return initialOffset + fetchedLength * limit
    },
    ...params?.options,
  })
}

/**
 * No description
 *
 * @tags liturgy_flower
 * @name LiturgyFlowerCreate
 * @summary 전례꽃 생성
 * @request POST:/v1/liturgy_flower/
 * @secure  */

export const useLiturgyFlowerCreateMutation = (
  params: MutationHookParams<
    typeof liturgyFlowerApi.liturgyFlowerCreate,
    { error: LiturgyFlowerErrorMessageType | CommonErrorType }
  >,
) => {
  const mutationKey = QUERY_KEY_LITURGY_FLOWER_API.CREATE()
  return useMutation({
    mutationKey,
    mutationFn: liturgyFlowerApi.liturgyFlowerCreate,
    ...params?.options,
  })
}

/**
 * No description
 *
 * @tags liturgy_flower
 * @name LiturgyFlowerRetrieve
 * @summary 전례꽃 상세 조회
 * @request GET:/v1/liturgy_flower/{id}/
 * @secure    */

export const useLiturgyFlowerRetrieveQuery = <
  TData = RequestFnReturn<typeof liturgyFlowerApi.liturgyFlowerRetrieve>,
>(
  params: QueryHookParams<
    typeof liturgyFlowerApi.liturgyFlowerRetrieve,
    { error: CommonErrorType },
    TData
  >,
) => {
  const queryKey = QUERY_KEY_LITURGY_FLOWER_API.RETRIEVE(params.variables)
  return useQuery({
    queryKey,
    queryFn: () => liturgyFlowerApi.liturgyFlowerRetrieve(params.variables),
    ...params?.options,
  })
}

/**
 * No description
 *
 * @tags liturgy_flower
 * @name LiturgyFlowerUpdate
 * @summary 전례꽃 수정
 * @request PUT:/v1/liturgy_flower/{id}/
 * @secure  */

export const useLiturgyFlowerUpdateMutation = (
  params: MutationHookParams<
    typeof liturgyFlowerApi.liturgyFlowerUpdate,
    { error: LiturgyFlowerErrorMessageType | CommonErrorType }
  >,
) => {
  const mutationKey = QUERY_KEY_LITURGY_FLOWER_API.UPDATE()
  return useMutation({
    mutationKey,
    mutationFn: liturgyFlowerApi.liturgyFlowerUpdate,
    ...params?.options,
  })
}

/**
 * No description
 *
 * @tags liturgy_flower
 * @name LiturgyFlowerDestroy
 * @summary 전례꽃 삭제
 * @request DELETE:/v1/liturgy_flower/{id}/
 * @secure  */

export const useLiturgyFlowerDestroyMutation = (
  params: MutationHookParams<
    typeof liturgyFlowerApi.liturgyFlowerDestroy,
    { error: CommonErrorType }
  >,
) => {
  const mutationKey = QUERY_KEY_LITURGY_FLOWER_API.DESTROY()
  return useMutation({
    mutationKey,
    mutationFn: liturgyFlowerApi.liturgyFlowerDestroy,
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
