'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { toaster } from '@/components/ui/toaster'
import { ROUTES } from '@/constants/routes'
import useMe from '@/hooks/useMe'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { data: me, isMyeongdoMember } = useMe()

  useEffect(() => {
    if (!me) return
    if (isMyeongdoMember) return

    toaster.create({
      title: '명도회 분과만 접근 가능합니다.',
      type: 'error',
    })
    router.replace(ROUTES.HOME)
  }, [me, isMyeongdoMember, router])

  if (!me || !isMyeongdoMember) return null

  return <>{children}</>
}

export default Layout
