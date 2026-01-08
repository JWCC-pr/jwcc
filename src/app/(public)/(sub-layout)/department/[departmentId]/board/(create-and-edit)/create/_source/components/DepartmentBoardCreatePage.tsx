'use client'

import DepartmentBoardForm from '../../../_source/components/form/department-board-form'
import useDepartmentPermisson from '../../../_source/hooks/useDepartmentPermisson'

interface DepartmentBoardCreatePageProps {
  departmentId: number
}

const DepartmentBoardCreatePage: React.FC<DepartmentBoardCreatePageProps> = ({
  departmentId,
}) => {
  const { isPermisson } = useDepartmentPermisson({ departmentId })
  if (!isPermisson) return null

  return <DepartmentBoardForm departmentId={departmentId} />
}

export default DepartmentBoardCreatePage
