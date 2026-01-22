'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'

import { ROUTES } from '@/constants/routes'
import { NewsFreeBoardPencilSimpleLineIcon } from '@/generated/icons/MyIcons'
import useMe from '@/hooks/useMe'

import OrderingSelect from './ordering-select'
import SearchInput from './search-input'
import SubDepartmentSelect from './sub-department-select'

interface DepartmentBoardTopSectionProps {
  departmentId: number
}

const DepartmentBoardTopSection: React.FC<DepartmentBoardTopSectionProps> = ({
  departmentId,
}) => {
  const { data: me, isAdmin } = useMe()

  const hasPermission =
    me?.departmentSet.some((department) => department.id === departmentId) ||
    isAdmin

  return (
    <Box pb="20px" display="flex" flexDirection="column" gap="20px">
      <SearchInput />
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={['column', 'row']}
        gap="20px"
      >
        <Box display="flex" gap="10px">
          <SubDepartmentSelect departmentId={departmentId} />
          <OrderingSelect />
        </Box>
        {hasPermission && (
          <Link
            href={ROUTES.COMMUNITY_DEPARTMENT_BOARD_CREATE(departmentId)}
            _hover={{ textDecoration: 'none' }}
          >
            <Button
              size="md"
              variant="solid"
              colorPalette="primary"
              w={['full', '140px']}
            >
              <NewsFreeBoardPencilSimpleLineIcon w="20px" h="20px" />
              게시글 작성
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  )
}

export default DepartmentBoardTopSection
