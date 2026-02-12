import { useMemo } from 'react'

import { COOKIE_KEYS } from '@/constants/cookie-keys'
import { useUserRetrieveQuery } from '@/generated/apis/User/User.query'
import { clientCookie } from '@/stores/cookie/store'

const useMe = () => {
  const data = useUserRetrieveQuery({
    variables: { id: 'me' },
    options: {
      enabled: !!clientCookie.get(COOKIE_KEYS.AUTH.ACCESS_TOKEN),
    },
  })

  /** 로그인 여부 */
  const isLoggedIn = !!data?.data

  /** 타본당 신자 여부 ( 7등급 이상 ) */
  const isNotParishMember =
    !isLoggedIn || (data.data.grade && data.data.grade >= 7)
  /** 본당 신자 여부 ( 6등급 이하 ) */
  const isParishMember = data.data?.grade && data.data?.grade <= 6
  /** 단체장 이상인지 여부 ( 1,2,3,4,5등급 ) */
  const isGroupLeader = data.data?.grade && data.data?.grade <= 4

  /** 헌화회 소속인지 여부 */
  const isHeonhwaMember = useMemo(() => {
    return (
      (isLoggedIn &&
        data.data.departmentSet
          .flatMap((department) => [
            department.name,
            ...department.subDepartment.map(
              (subDepartment) => subDepartment.name,
            ),
          ])
          .some((name) => name.includes('헌화회'))) ??
      false
    )
  }, [isLoggedIn, data])

  /** 명도회 소속인지 여부 */
  const isMyeongdoMember = useMemo(() => {
    return (
      (isLoggedIn &&
        data.data.departmentSet
          .flatMap((department) => [
            department.name,
            ...department.subDepartment.map(
              (subDepartment) => subDepartment.name,
            ),
          ])
          .some((name) => name.includes('명도회'))) ??
      false
    )
  }, [isLoggedIn, data])

  /** 총관리자인지 여부 */
  const isAdmin = useMemo(() => {
    return isLoggedIn && data.data?.grade && data.data.grade === 1
  }, [isLoggedIn, data])

  /** 명도회 등급인지 여부 */
  const isMyeongdoGrade = useMemo(() => {
    return !isLoggedIn || (data.data.grade && data.data.grade === 5)
  }, [isLoggedIn, data])

  return {
    ...data,
    isLoggedIn,
    isNotParishMember,
    isParishMember,
    isHeonhwaMember,
    isMyeongdoMember,
    isAdmin,
    isMyeongdoGrade,
    isGroupLeader,
  }
}

export default useMe
