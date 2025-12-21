'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Table } from '@chakra-ui/react/table'

import { format } from 'date-fns/format'

import EmptySection from '@/app/(public)/(sub-layout)/_source/components/empty-section'
import Pagination from '@/components/pagination'
import { ROUTES } from '@/constants/routes'
import { usePassingNoticeListQuery } from '@/generated/apis/PassingNotice/PassingNotice.query'

const LIMIT = 10

// 컬럼 너비 비율 (원본 값)
const COLUMN_WIDTHS = {
  name: 400,
  baptismName: 400,
  funeralService: 400,
} as const

// 총합 계산
const TOTAL_WIDTH =
  COLUMN_WIDTHS.name + COLUMN_WIDTHS.baptismName + COLUMN_WIDTHS.funeralService

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
    label: '고인 성함',
    styles: {
      ...tableHeaderStyles,
      htmlWidth: getWidthPercentage(COLUMN_WIDTHS.name),
      textAlign: 'center',
    },
  },
  {
    label: '세례명',
    styles: {
      ...tableHeaderStyles,
      htmlWidth: getWidthPercentage(COLUMN_WIDTHS.baptismName),
      textAlign: 'center',
    },
  },
  {
    label: '장례미사',
    styles: {
      ...tableHeaderStyles,
      htmlWidth: getWidthPercentage(COLUMN_WIDTHS.funeralService),
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

const NewsPassingNoticeTableSection: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)

  const handleClick = (id: number) => {
    router.push(ROUTES.NEWS_PASSING_NOTICE_DETAIL(id))
  }
  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())

    router.replace(
      `${ROUTES.NEWS_PASSING_NOTICE}?${newSearchParams.toString()}`,
    )
  }

  const { data: passingNotices } = usePassingNoticeListQuery({
    variables: {
      query: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
      },
    },
  })

  // FIXME: 스켈레톤 UI, 빈 데이터 UI 추가
  if (!passingNotices) return
  if (!passingNotices?.results) return

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
            {passingNotices.results.map((passingNotice) => (
              <Table.Row
                key={passingNotice.id}
                bgColor="grey.0"
                borderBottom="1px solid"
                borderColor="border.basic.1"
                cursor="pointer"
                onClick={() => handleClick(passingNotice.id)}
                _hover={{
                  bgColor: 'background.basic.2',
                }}
              >
                <Table.Cell {...tableBodyRowCellStyle}>
                  {passingNotice.name}
                </Table.Cell>
                <Table.Cell {...tableBodyRowCellStyle}>
                  {passingNotice.baptismalName}
                </Table.Cell>
                <Table.Cell {...tableBodyRowCellStyle}>
                  {format(new Date(passingNotice.funeralStartAt), 'yyyy-MM-dd')}
                </Table.Cell>
              </Table.Row>
            ))}

            {passingNotices.results.length === 0 && (
              <EmptySection colSpan={3} />
            )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <Box py="24px" display="flex" justifyContent="center">
        <Pagination
          size="sm"
          count={passingNotices.count ?? 0}
          pageSize={LIMIT}
          defaultPage={page ? Number(page) : 1}
          onPageChange={(details) => handlePageChange(details.page)}
        />
      </Box>
    </>
  )
}

export default NewsPassingNoticeTableSection
