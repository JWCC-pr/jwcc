'use client'

import { useMemo } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { type SelectRootProps } from '@chakra-ui/react/select'

import Select from '@/components/select'
import { useDepartmentListQuery } from '@/generated/apis/Department/Department.query'

interface SubDepartmentSelectProps {
  departmentId: number
}

const SubDepartmentSelect: React.FC<SubDepartmentSelectProps> = ({
  departmentId,
}) => {
  const router = useRouter()
  const { data: departments = [] } = useDepartmentListQuery()

  const searchParams = useSearchParams()
  const subDepartment = searchParams.get('sub_department') ?? 'all'

  const options = useMemo(() => {
    const targetSubDepartments =
      departments.find((department) => department.id === Number(departmentId))
        ?.subDepartmentSet ?? []

    return [
      {
        label: '전체',
        value: 'all',
      },
      ...targetSubDepartments.map((subDepartment) => ({
        label: subDepartment.name,
        value: String(subDepartment.id),
      })),
    ]
  }, [departments, departmentId])

  const handleSubDepartmentChange: SelectRootProps['onValueChange'] = (e) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('sub_department', e.value[0])
    router.replace(`?${newSearchParams.toString()}`)
  }

  return (
    <Select
      w={['full', '160px']}
      h="40px"
      size="md"
      variant="outline"
      colorPalette="grey"
      options={options}
      value={[subDepartment]}
      onValueChange={handleSubDepartmentChange}
      placeholder="세부분과 선택"
    />
  )
}

export default SubDepartmentSelect
