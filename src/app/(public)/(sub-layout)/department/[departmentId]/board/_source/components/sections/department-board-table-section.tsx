'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Badge } from '@chakra-ui/react/badge'
import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import TableEmptySection from '@/app/(public)/(sub-layout)/_source/components/table-empty-section'
import FileDown from '@/components/file-down'
import Table, { type TableColumn } from '@/components/table'
import { ROUTES } from '@/constants/routes'
import {
  DepartmentBoardListParamsOrderingEnumType,
  DepartmentBoardType,
} from '@/generated/apis/@types/data-contracts'
import { useDepartmentBoardListQuery } from '@/generated/apis/DepartmentBoard/DepartmentBoard.query'

const LIMIT = 10

interface DepartmentBoardTableSectionProps {
  departmentId: number
}

const columns: TableColumn<DepartmentBoardType>[] = [
  {
    key: 'title',
    label: '제목',
    width: { type: 'flex', value: 1, minWidth: 200 },
    textAlign: 'left',
    render: (board) => (
      <Box
        display="flex"
        flexFlow="column nowrap"
        gap="4px"
        alignItems="flex-start"
      >
        <Box display="flex" flexFlow="row nowrap" gap="8px">
          <Badge size="md" variant="subtle" colorPalette="grey">
            {board.subDepartmentInfo.name}
          </Badge>
          <Text
            textStyle="pre-body-6"
            lineClamp="1"
            className="hover-underline"
          >
            {board.title}
          </Text>
        </Box>
        <Box display="flex" flexFlow="row wrap" gap="4px">
          {board.fileSet?.map(({ file }) => (
            <FileDown key={file} path={file} size="s" enableDownload={false} />
          ))}
        </Box>
      </Box>
    ),
  },
  {
    key: 'user',
    label: '작성자',
    width: { type: 'fixed', value: 100 },
    textAlign: 'center',
    render: (board) => board.user.name,
  },
  {
    key: 'createdAt',
    label: '작성일',
    width: { type: 'fixed', value: 120 },
    textAlign: 'center',
    render: (board) => format(new Date(board.createdAt), 'yyyy-MM-dd'),
  },
  {
    key: 'hitCount',
    label: '조회수',
    width: { type: 'fixed', value: 80 },
    textAlign: 'center',
    render: (board) => board.hitCount.toLocaleString(),
  },
  {
    key: 'commentCount',
    label: '댓글',
    width: { type: 'fixed', value: 80 },
    textAlign: 'center',
    render: (board) => board.commentCount.toLocaleString(),
  },
  {
    key: 'likeCount',
    label: '좋아요',
    width: { type: 'fixed', value: 80 },
    textAlign: 'center',
    render: (board) => board.likeCount.toLocaleString(),
  },
]

const DepartmentBoardTableSection: React.FC<
  DepartmentBoardTableSectionProps
> = ({ departmentId }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const ordering = (searchParams.get('ordering') ??
    '-created_at') as DepartmentBoardListParamsOrderingEnumType
  const search = searchParams.get('search') ?? undefined
  const subDepartment = Number(searchParams.get('sub_department')) || undefined

  const handleClick = (board: DepartmentBoardType) => {
    router.push(ROUTES.DEPARTMENT_BOARD_DETAIL(departmentId, board.id))
  }

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())

    router.replace(
      `${ROUTES.DEPARTMENT_BOARD(departmentId)}?${newSearchParams.toString()}`,
    )
  }

  const { data: boards } = useDepartmentBoardListQuery({
    variables: {
      query: {
        department: departmentId,
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        ordering: [ordering],
        search,
        sub_department: subDepartment,
      },
    },
  })

  // FIXME: 스켈레톤 UI, 빈 데이터 UI 추가
  if (!boards) return
  if (!boards.results) return

  return (
    <Table
      columns={columns}
      data={boards.results}
      getRowKey={(board) => board.id}
      onRowClick={handleClick}
      pagination={{
        totalCount: boards.count ?? 0,
        pageSize: LIMIT,
        currentPage: page,
        onPageChange: handlePageChange,
      }}
      emptyContent={<TableEmptySection colSpan={columns.length} />}
    />
  )
}

export default DepartmentBoardTableSection
