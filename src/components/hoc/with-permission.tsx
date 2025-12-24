'use client'

import { ComponentType, useCallback, useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import { UserGradeEnumType } from '@/generated/apis/@types/data-contracts'
import useMe from '@/hooks/useMe'

import { toaster } from '../ui/toaster'

interface WithPermissionOptions {
  /**
   * 등급
   * * `1` - 총관리자
   * * `2` - 사제 및 수도자
   * * `3` - 사무실
   * * `4` - 단체장
   * * `5` - 명도회
   * * `6` - 본당 신자
   * * `7` - 타본당 신자
   */
  grade: UserGradeEnumType
  /** 리다이렉트 경로 */
  redirectTo?: string
  /** 메시지 */
  message?: string
}

/**
 * 등급
 * * `1` - 총관리자
 * * `2` - 사제 및 수도자
 * * `3` - 사무실
 * * `4` - 단체장
 * * `5` - 명도회
 * * `6` - 본당 신자
 * * `7` - 타본당 신자
 */
function withPermission<P extends object>(
  Component: ComponentType<P>,
  options: WithPermissionOptions = {
    grade: 6,
    redirectTo: ROUTES.HOME,
    message: '회원만 이용할 수 있는 페이지입니다.',
  },
) {
  const {
    grade: requiredGrade,
    redirectTo = ROUTES.HOME,
    message = '회원만 이용할 수 있는 페이지입니다.',
  } = options

  return function WithPermissionComponent(props: P) {
    const router = useRouter()
    const { data: me, isLoading } = useMe()

    const handleRedirect = useCallback(() => {
      setTimeout(() => {
        toaster.create({
          title: message,
          type: 'error',
        })
      }, 0)
      router.replace(redirectTo)
    }, [router])

    useEffect(() => {
      if (isLoading) return

      if (!me) return handleRedirect()

      const userGrade = me.grade
      if (userGrade === undefined) return handleRedirect()

      // grade가 클수록 권한이 적으므로, 사용자 grade가 requiredGrade 이하인지 확인
      // 예: requiredGrade가 6이면, 1~6등급은 허용, 7등급은 불가
      if (userGrade > requiredGrade) return handleRedirect()
    }, [me, isLoading, router, handleRedirect])

    if (isLoading || !me) {
      return null
    }

    const userGrade = me.grade
    if (userGrade === undefined || userGrade > requiredGrade) {
      return null
    }

    return <Component {...props} />
  }
}

export default withPermission
