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
    !isLoggedIn || (data.data?.grade && data.data?.grade >= 7)
  /** 타본당 신자 여부 ( 6등급 이하 ) */
  const isParishMember = data.data?.grade && data.data?.grade <= 6

  return { ...data, isLoggedIn, isNotParishMember, isParishMember }
}

export default useMe
