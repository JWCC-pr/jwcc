'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Table } from '@chakra-ui/react/table'

import { format } from 'date-fns/format'

import Pagination from '@/components/pagination'
import { ROUTES } from '@/constants/routes'

const LIMIT = 10

// 컬럼 너비 비율 (원본 값)
const COLUMN_WIDTHS = {
  title: 60,
  writer: 10,
  createdAt: 12,
  updatedAt: 12,
  viewCount: 8,
  commentCount: 8,
  likeCount: 8,
} as const

// 총합 계산
const TOTAL_WIDTH =
  COLUMN_WIDTHS.title +
  COLUMN_WIDTHS.writer +
  COLUMN_WIDTHS.createdAt +
  COLUMN_WIDTHS.updatedAt +
  COLUMN_WIDTHS.viewCount +
  COLUMN_WIDTHS.commentCount +
  COLUMN_WIDTHS.likeCount

// 100% 기준으로 정규화된 비율 계산
const getWidthPercentage = (width: number) =>
  `${((width / TOTAL_WIDTH) * 100).toFixed(2)}%`

const items = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `게시글 제목 ${index + 1}`,
  writer: `작성자 ${index + 1}`,
  createdAt: `2025-01-01`,
  updatedAt: `2025-01-01`,
  viewCount: 10 * index,
  commentCount: 10 * index,
  likeCount: 10 * index,
}))

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
    label: '수정일',
    styles: {
      ...tableHeaderStyles,
      htmlWidth: getWidthPercentage(COLUMN_WIDTHS.updatedAt),
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
  const page = searchParams.get('page')

  const handleClick = (id: number) => {
    router.push(ROUTES.NEWS_FREE_BOARD_DETAIL(id))
  }
  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())

    router.replace(`${ROUTES.NEWS_FREE_BOARD}?${newSearchParams.toString()}`)
  }

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
          {items.map((item) => (
            <Table.Row
              key={item.id}
              borderBottom="1px solid"
              borderColor="border.basic.1"
              cursor="pointer"
              onClick={() => handleClick(item.id)}
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
                {item.title}
              </Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>{item.writer}</Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>
                {format(new Date(item.createdAt), 'yyyy-MM-dd')}
              </Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>
                {format(new Date(item.updatedAt), 'yyyy-MM-dd')}
              </Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>
                {item.viewCount.toLocaleString()}
              </Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>
                {item.commentCount.toLocaleString()}
              </Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>
                {item.likeCount.toLocaleString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Box py="24px" display="flex" justifyContent="center">
        <Pagination
          size="sm"
          // FIXME: API
          count={100}
          pageSize={LIMIT}
          defaultPage={page ? Number(page) : 1}
          onPageChange={(details) => handlePageChange(details.page)}
        />
      </Box>
    </>
  )
}

export default NewFreeBoardTableSection
