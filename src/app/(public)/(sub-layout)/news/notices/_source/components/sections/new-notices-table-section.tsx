'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Table } from '@chakra-ui/react/table'
import { PushPinIcon } from '@phosphor-icons/react'

import { format } from 'date-fns/format'

import Pagination from '@/components/pagination'
import { ROUTES } from '@/constants/routes'
import { useNoticeListQuery } from '@/generated/apis/Notice/Notice.query'

/** 고정 공지사항 */
const FIXED_LIMIT = 3
/** 일반 공지사항 */
const LIMIT = 7

// 컬럼 너비 비율 (원본 값)
const COLUMN_WIDTHS = {
  title: 1080,
  createdAt: 120,
} as const

// 총합 계산
const TOTAL_WIDTH = COLUMN_WIDTHS.title + COLUMN_WIDTHS.createdAt

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
    label: '작성일',
    styles: {
      ...tableHeaderStyles,
      htmlWidth: getWidthPercentage(COLUMN_WIDTHS.createdAt),
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

const NewNoticesTableSection: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)

  const handleClick = (id: number) => {
    router.push(ROUTES.NEWS_NOTICES_DETAIL(id))
  }
  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())

    router.replace(`${ROUTES.NEWS_NOTICES}?${newSearchParams.toString()}`)
  }

  const { data: fixedNotices } = useNoticeListQuery({
    variables: {
      query: {
        offset: 0,
        limit: FIXED_LIMIT,
        is_fixed: true,
      },
    },
  })
  const { data: notices } = useNoticeListQuery({
    variables: {
      query: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        is_fixed: false,
      },
    },
  })

  // FIXME: 스켈레톤 UI, 빈 데이터 UI 추가
  if (!notices || !fixedNotices) return
  if (!notices?.results || !fixedNotices?.results) return

  return (
    <>
      <Table.ScrollArea maxW="1200px">
        <Table.Root size="sm" unstyled w="full">
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
            {[
              ...fixedNotices.results.map((notice) => ({
                ...notice,
                isFixed: true,
              })),
              ...notices.results.map((notice) => ({
                ...notice,
                isFixed: false,
              })),
            ].map((notice) => (
              <Table.Row
                key={notice.id}
                bgColor={notice.isFixed ? 'primary.1' : 'grey.0'}
                borderBottom="1px solid"
                borderColor="border.basic.1"
                cursor="pointer"
                onClick={() => handleClick(notice.id)}
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
                  <Box display="flex" alignItems="center" gap="6px">
                    {notice.isFixed && (
                      <PushPinIcon size="16px" color="#780536" />
                    )}
                    {notice.title}
                  </Box>
                </Table.Cell>
                <Table.Cell {...tableBodyRowCellStyle}>
                  {format(new Date(notice.createdAt), 'yyyy-MM-dd')}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <Box py="24px" display="flex" justifyContent="center">
        <Pagination
          size="sm"
          count={notices.count ?? 0}
          pageSize={LIMIT}
          defaultPage={page ? Number(page) : 1}
          onPageChange={(details) => handlePageChange(details.page)}
        />
      </Box>
    </>
  )
}

export default NewNoticesTableSection
