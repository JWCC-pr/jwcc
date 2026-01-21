'use client'

import { useDepartmentBoardRetrieveQuery } from '@/generated/apis/DepartmentBoard/DepartmentBoard.query'

import DepartmentBoardForm from '../../../../_source/components/form/department-board-form'
import useDepartmentPermisson from '../../../../_source/hooks/useDepartmentPermisson'

interface DepartmentBoardEditPageProps {
  departmentId: number
  boardId: number
}

const DepartmentBoardEditPage: React.FC<DepartmentBoardEditPageProps> = ({
  departmentId,
  boardId,
}) => {
  const { isPermisson } = useDepartmentPermisson({ departmentId })
  const { data: initialData } = useDepartmentBoardRetrieveQuery({
    variables: {
      id: boardId,
    },
  })

  if (!initialData || !isPermisson) return null

  return (
    <DepartmentBoardForm
      departmentId={departmentId}
      isEditMode
      initialData={{ ...initialData, content: initialData.body }}
    />
  )
}

export default DepartmentBoardEditPage
