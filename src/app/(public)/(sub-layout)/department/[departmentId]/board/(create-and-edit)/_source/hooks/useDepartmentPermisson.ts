import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import useMe from '@/hooks/useMe'

interface UseDepartmentPermissonProps {
  departmentId: number
}

const useDepartmentPermisson = ({
  departmentId,
}: UseDepartmentPermissonProps) => {
  const { data: me } = useMe()
  const router = useRouter()

  useEffect(() => {
    if (!me) return
    if (me.departmentSet.some((department) => department.id === departmentId)) {
      return
    }

    router.back()
  }, [me, departmentId, router])

  return {
    isPermisson:
      !me ||
      me.departmentSet.some((department) => department.id === departmentId),
  }
}

export default useDepartmentPermisson
