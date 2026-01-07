'use client'

import withPermission from '@/components/hoc/with-permission'

import DepartmentBoardForm from '../../../_source/components/form/department-board-form'

interface DepartmentBoardCreatePageProps {
  departmentId: number
}

const DepartmentBoardCreatePage: React.FC<DepartmentBoardCreatePageProps> = ({
  departmentId,
}) => {
  return <DepartmentBoardForm departmentId={departmentId} />
}

export default withPermission(DepartmentBoardCreatePage, {
  grade: 6,
  redirectTo: '/',
})
