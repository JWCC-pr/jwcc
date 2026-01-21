'use client'

import { useMemo } from 'react'

import { useFormContext } from 'react-hook-form'

import Select from '@/components/select'
import useMe from '@/hooks/useMe'

import { DepartmentBoardFormDataType } from '../../hooks/useDepartmentBoardForm'

interface SubDepartmentSelectProps {
  departmentId: number
}

const SubDepartmentSelect: React.FC<SubDepartmentSelectProps> = ({
  departmentId,
}) => {
  const { register } = useFormContext<DepartmentBoardFormDataType>()

  const { data: me } = useMe()

  const options = useMemo(() => {
    const targetSubDepartments =
      me?.departmentSet.find(
        (department) => department.id === Number(departmentId),
      )?.subDepartment ?? []

    return targetSubDepartments.map((subDepartment) => ({
      label: subDepartment.name,
      value: String(subDepartment.id),
    }))
  }, [me, departmentId])

  return (
    <Select
      maxW="362px"
      w="full"
      h="40px"
      size="lg"
      variant="outline"
      colorPalette="grey"
      placeholder="세부분과"
      options={options}
      {...register('subDepartment')}
    />
  )
}

export default SubDepartmentSelect
