'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { toaster } from '@/components/ui/toaster'
import { ROUTES } from '@/constants/routes'
import useMe from '@/hooks/useMe'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { isMyeongdoMember, isLoading } = useMe()

  useEffect(() => {
    if (isLoading) return
    if (isMyeongdoMember) return

    router.replace(ROUTES.HOME)
    setTimeout(() => {
      toaster.create({
        title: '명도회 분과만 접근 가능합니다.',
        type: 'error',
      })
    }, 0)
  }, [isMyeongdoMember, router, isLoading])

  if (isLoading || !isMyeongdoMember) return null

  return <>{children}</>
}

export default Layout
