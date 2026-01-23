'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'

import { ROUTES } from '@/constants/routes'
import { useDepartmentBoardRetrieveQuery } from '@/generated/apis/DepartmentBoard/DepartmentBoard.query'

import DepartmentBoardDetailBodySection from './sections/department-board-detail-body-section'
import DepartmentBoardDetailCommentInfoSection from './sections/department-board-detail-comment-info-section'
import DepartmentBoardDetailCommentInputSection from './sections/department-board-detail-comment-input-section'
import DepartmentBoardDetailCommentListSection from './sections/department-board-detail-comment-list-section'
import DepartmentBoardDetailHeaderSection from './sections/department-board-detail-header-section'

interface DepartmentBoardPageProps {
  departmentId: number
  boardId: number
}

const DepartmentBoardPage: React.FC<DepartmentBoardPageProps> = ({
  departmentId,
  boardId,
}) => {
  const { data: board } = useDepartmentBoardRetrieveQuery({
    variables: {
      id: boardId,
    },
  })

  if (!board) return

  return (
    <Box display="flex" flexFlow="column">
      <DepartmentBoardDetailHeaderSection
        departmentId={departmentId}
        board={board}
      />

      <DepartmentBoardDetailBodySection board={board} />

      <DepartmentBoardDetailCommentInfoSection board={board} />

      <DepartmentBoardDetailCommentListSection
        departmentId={departmentId}
        boardId={boardId}
      />

      <DepartmentBoardDetailCommentInputSection
        departmentId={departmentId}
        boardId={boardId}
      />

      <Box py="16px" display="flex" justifyContent="center">
        <Link
          href={ROUTES.COMMUNITY_DEPARTMENT_BOARD(departmentId)}
          _hover={{ textDecoration: 'none' }}
        >
          <Button type="button" size="md" variant="solid" colorPalette="grey">
            목록으로
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default DepartmentBoardPage
