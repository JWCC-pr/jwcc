'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Table } from '@chakra-ui/react/table'

import { format } from 'date-fns/format'

import EmptySection from '@/app/(public)/(sub-layout)/_source/components/empty-section'
import Pagination from '@/components/pagination'
import { ROUTES } from '@/constants/routes'
import { useBoardListQuery } from '@/generated/apis/Board/Board.query'

const LIMIT = 10

// 컬럼 너비 비율 (원본 값)
const COLUMN_WIDTHS = {
  title: 72,
  writer: 10,
  createdAt: 12,
  viewCount: 8,
  commentCount: 8,
  likeCount: 8,
} as const

// 총합 계산
const TOTAL_WIDTH =
  COLUMN_WIDTHS.title +
  COLUMN_WIDTHS.writer +
  COLUMN_WIDTHS.createdAt +
  COLUMN_WIDTHS.viewCount +
  COLUMN_WIDTHS.commentCount +
  COLUMN_WIDTHS.likeCount

// 100% 기준으로 정규화된 비율 계산
const getWidthPercentage = (width: number) =>
  `${((width / TOTAL_WIDTH) * 100).toFixed(2)}%`

const tableHeaderStyles = {
  h: '40px',
  p: '0 10px',
  textStyle: 'pre-caption-1',
  color: 'grey.8',
}
const tableHeaders = [
  {
    label: '제목',
    styles: {
      ...tableHeaderStyles,
      htmlWidth: getWidthPercentage(COLUMN_WIDTHS.title),
      textAlign: 'left',
    },
  },
  {
    label: '작성자',
    styles: {
      ...tableHeaderStyles,
      htmlWidth: getWidthPercentage(COLUMN_WIDTHS.writer),
      textAlign: 'center',
    },
  },
  {
    label: '작성일',
    styles: {
      ...tableHeaderStyles,
      htmlWidth: getWidthPercentage(COLUMN_WIDTHS.createdAt),
      textAlign: 'center',
    },
  },
  {
    label: '조회수',
    styles: {
      ...tableHeaderStyles,
      htmlWidth: getWidthPercentage(COLUMN_WIDTHS.viewCount),
      textAlign: 'center',
    },
  },
  {
    label: '댓글',
    styles: {
      ...tableHeaderStyles,
      htmlWidth: getWidthPercentage(COLUMN_WIDTHS.commentCount),
      textAlign: 'center',
    },
  },
  {
    label: '좋아요',
    styles: {
      ...tableHeaderStyles,
      htmlWidth: getWidthPercentage(COLUMN_WIDTHS.likeCount),
      textAlign: 'center',
    },
  },
]
const tableBodyRowCellStyle = {
  h: '64px',
  p: '10px',
  textStyle: 'pre-body-6',
  color: 'grey.10',
  textAlign: 'center',
}

const NewFreeBoardTableSection: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)

  const handleClick = (id: number) => {
    router.push(ROUTES.NEWS_FREE_BOARD_DETAIL(id))
  }
  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())

    router.replace(`${ROUTES.NEWS_FREE_BOARD}?${newSearchParams.toString()}`)
  }

  const { data: boards } = useBoardListQuery({
    variables: {
      query: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
      },
    },
  })

  // FIXME: 스켈레톤 UI, 빈 데이터 UI 추가
  if (!boards) return
  if (!boards.results) return

  return (
    <>
      <Table.Root size="sm" unstyled>
        <Table.Header borderTop="1.5px solid" borderColor="grey.10">
          <Table.Row borderBottom="1px solid" borderColor="border.basic.1">
            {tableHeaders.map((header) => (
              <Table.ColumnHeader key={header.label} {...header.styles}>
                {header.label}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {boards.results.map((board) => (
            <Table.Row
              key={board.id}
              borderBottom="1px solid"
              borderColor="border.basic.1"
              cursor="pointer"
              onClick={() => handleClick(board.id)}
              _hover={{
                bgColor: 'background.basic.2',
                '& > *:first-of-type': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Table.Cell
                {...tableBodyRowCellStyle}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                {board.title}
              </Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>
                {board.user.name}
              </Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>
                {format(new Date(board.createdAt), 'yyyy-MM-dd')}
              </Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>
                {board.hitCount.toLocaleString()}
              </Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>
                {board.commentCount.toLocaleString()}
              </Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>
                {board.likeCount.toLocaleString()}
              </Table.Cell>
            </Table.Row>
          ))}

          {boards.results.length === 0 && (
            <EmptySection
              title="등록된 게시글이 없습니다."
              colSpan={tableHeaders.length}
            />
          )}
        </Table.Body>
      </Table.Root>

      <Box py="24px" display="flex" justifyContent="center">
        <Pagination
          size="sm"
          count={boards.count ?? 0}
          pageSize={LIMIT}
          defaultPage={page ? Number(page) : 1}
          onPageChange={(details) => handlePageChange(details.page)}
        />
      </Box>
    </>
  )
}

export default NewFreeBoardTableSection
