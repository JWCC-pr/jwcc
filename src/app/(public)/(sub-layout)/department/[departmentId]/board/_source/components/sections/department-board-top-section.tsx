'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import type { SelectRootProps } from '@chakra-ui/react/select'

import Select from '@/components/select'
import { ROUTES } from '@/constants/routes'
import { BoardListParamsOrderingEnumType } from '@/generated/apis/@types/data-contracts'
import { NewsFreeBoardPencilSimpleLineIcon } from '@/generated/icons/MyIcons'
import useMe from '@/hooks/useMe'

const options = [
  {
    label: '최신순',
    value: '-created_at',
  },
  {
    label: '공감순',
    value: '-like_count',
  },
]

interface DepartmentBoardTopSectionProps {
  departmentId: number
}

const DepartmentBoardTopSection: React.FC<DepartmentBoardTopSectionProps> = ({
  departmentId,
}) => {
  const { isParishMember } = useMe()

  const router = useRouter()
  const searchParams = useSearchParams()
  const ordering = (searchParams.get('ordering') ||
    options[0].value) as BoardListParamsOrderingEnumType

  const handleOrderingChange: SelectRootProps['onValueChange'] = (e) => {
    const selectedValue = e.value[0]
    if (!selectedValue) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('ordering', selectedValue)
    router.replace(`?${params.toString()}`)
  }

  return (
    <Box py="20px" display="flex" justifyContent="space-between">
      <Select
        w="160px"
        h="40px"
        size="md"
        variant="outline"
        colorPalette="grey"
        options={options}
        value={[ordering]}
        onValueChange={handleOrderingChange}
      />
      {isParishMember && (
        <Link
          href={ROUTES.DEPARTMENT_BOARD_CREATE(departmentId)}
          _hover={{ textDecoration: 'none' }}
        >
          <Button
            size="md"
            variant="solid"
            colorPalette="primary"
            w={['initial', '140px']}
          >
            <NewsFreeBoardPencilSimpleLineIcon w="20px" h="20px" />
            게시글 작성
          </Button>
        </Link>
      )}
    </Box>
  )
}

export default DepartmentBoardTopSection
