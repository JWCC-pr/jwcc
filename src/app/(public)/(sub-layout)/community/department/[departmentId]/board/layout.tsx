'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { toaster } from '@/components/ui/toaster'
import { ROUTES } from '@/constants/routes'
import useMe from '@/hooks/useMe'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { isParishMember, isLoading } = useMe()

  useEffect(() => {
    if (isLoading || isParishMember) return

    router.replace(ROUTES.HOME)
    setTimeout(() => {
      toaster.create({
        title: '본당 신자 권한만 접근 가능합니다.',
        type: 'error',
      })
    }, 0)
  }, [isLoading, isParishMember, router])

  if (isLoading) return null

  return children
}

export default Layout
