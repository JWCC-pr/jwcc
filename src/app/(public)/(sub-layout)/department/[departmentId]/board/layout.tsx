'use client'

import { useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { toaster } from '@/components/ui/toaster'
import { ROUTES } from '@/constants/routes'
import useMe from '@/hooks/useMe'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { isParishMember, isLoading } = useMe()
  const hasRedirected = useRef(false)

  useEffect(() => {
    if (isLoading) return
    if (isParishMember) return
    if (hasRedirected.current) return

    hasRedirected.current = true

    toaster.create({
      title: '본당 신자 권한만 접근 가능합니다.',
      type: 'error',
    })

    router.replace(ROUTES.HOME)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isParishMember])

  if (isLoading) return null

  return children
}

export default Layout
