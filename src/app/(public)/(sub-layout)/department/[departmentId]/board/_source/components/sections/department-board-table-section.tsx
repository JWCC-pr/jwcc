'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { format } from 'date-fns/format'

import TableEmptySection from '@/app/(public)/(sub-layout)/_source/components/table-empty-section'
import Table, { type TableColumn } from '@/components/table'
import { ROUTES } from '@/constants/routes'
import {
  BoardListParamsOrderingEnumType,
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
    width: { type: 'flex', value: 72, minWidth: 200 },
    textAlign: 'left',
    render: (board) => board.title,
  },
  {
    key: 'user',
    label: '작성자',
    width: { type: 'fixed', value: 120 },
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
    '-created_at') as BoardListParamsOrderingEnumType

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
        // TODO: 세부분과 필터링
        department: departmentId,
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        ordering,
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
