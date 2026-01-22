'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import useMe from '@/hooks/useMe'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { isHeonhwaMember, isAdmin, isLoading } = useMe()

  useEffect(() => {
    if (isLoading) return
    if (isAdmin) return

    if (!isHeonhwaMember) {
      router.push(ROUTES.NEWS_LITURGY_FLOWER)
    }
  }, [isHeonhwaMember, isLoading, router, isAdmin])

  return <>{children}</>
}

export default Layout
