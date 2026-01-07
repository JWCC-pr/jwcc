'use client'

import withPermission from '@/components/hoc/with-permission'
import { useDepartmentBoardRetrieveQuery } from '@/generated/apis/DepartmentBoard/DepartmentBoard.query'

import DepartmentBoardForm from '../../../../_source/components/form/department-board-form'

interface DepartmentBoardEditPageProps {
  departmentId: number
  boardId: number
}

const DepartmentBoardEditPage: React.FC<DepartmentBoardEditPageProps> = ({
  departmentId,
  boardId,
}) => {
  const { data: initialData } = useDepartmentBoardRetrieveQuery({
    variables: {
      id: boardId,
    },
  })

  if (!initialData) return

  return (
    <DepartmentBoardForm
      departmentId={departmentId}
      isEditMode
      initialData={{ ...initialData, content: initialData.body }}
    />
  )
}

export default withPermission(DepartmentBoardEditPage, {
  grade: 6,
  redirectTo: '/',
})
