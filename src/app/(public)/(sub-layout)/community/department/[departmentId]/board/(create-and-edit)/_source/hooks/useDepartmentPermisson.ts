import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import useMe from '@/hooks/useMe'

interface UseDepartmentPermissonProps {
  departmentId: number
}

const useDepartmentPermisson = ({
  departmentId,
}: UseDepartmentPermissonProps) => {
  const { data: me, isMyeongdoMember, isAdmin } = useMe()
  const router = useRouter()

  useEffect(() => {
    if (!me) return
    if (isMyeongdoMember) return
    if (isAdmin) return
    if (me.departmentSet.some((department) => department.id === departmentId)) {
      return
    }

    router.back()
  }, [me, departmentId, router, isMyeongdoMember, isAdmin])

  return {
    isPermisson:
      !me ||
      me.departmentSet.some((department) => department.id === departmentId) ||
      isMyeongdoMember ||
      isAdmin,
  }
}

export default useDepartmentPermisson
