'use client'

import { Suspense } from 'react'

import { Box } from '@chakra-ui/react/box'

import DepartmentBoardTableSection from './sections/department-board-table-section'
import DepartmentBoardTopSection from './sections/department-board-top-section/department-board-top-section'

interface DepartmentPageProps {
  departmentId: number
}

const DepartmentPage: React.FC<DepartmentPageProps> = ({ departmentId }) => {
  return (
    <Suspense>
      <Box display="flex" flexDirection="column">
        <DepartmentBoardTopSection departmentId={departmentId} />

        <DepartmentBoardTableSection departmentId={departmentId} />
      </Box>
    </Suspense>
  )
}

export default DepartmentPage
