'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Table } from '@chakra-ui/react/table'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import FileDown from '@/components/file-down'
import Pagination from '@/components/pagination'
import { ROUTES } from '@/constants/routes'
import { useDocumentListQuery } from '@/generated/apis/Document/Document.query'

import NewsDocumentNoSearchSection from './news-document-no-search-section'

const LIMIT = 10

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
  h: '73px',
  p: '10px',
  textStyle: 'pre-body-6',
  color: 'grey.10',
  textAlign: 'center',
}

const NewsDocumentTableSection: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const title = searchParams.get('title') ?? undefined

  const handleClick = (id: number) => {
    router.push(ROUTES.NEWS_DOCUMENT_DETAIL(id))
  }
  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())

    router.replace(`${ROUTES.NEWS_DOCUMENT}?${newSearchParams.toString()}`)
  }

  const { data: documents } = useDocumentListQuery({
    variables: {
      query: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        title,
      },
    },
  })

  const hasTitle = !!title
  const isNoSearchResult = hasTitle && documents?.count === 0

  // FIXME: 스켈레톤 UI, 빈 데이터 UI 추가
  if (!documents) return

  return (
    <>
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
          {documents.results?.map((notice) => (
            <Table.Row
              key={notice.id}
              bgColor="grey.0"
              borderBottom="1px solid"
              borderColor="border.basic.1"
              cursor="pointer"
              onClick={() => handleClick(notice.id)}
              _hover={{
                bgColor: 'background.basic.2',
                '& .title': {
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
                <Box
                  display="flex"
                  flexFlow="column nowrap"
                  gap="4px"
                  alignItems="flex-start"
                >
                  <Text textStyle="pre-body-6" lineClamp="1" className="title">
                    {notice.title}
                  </Text>
                  <Box display="flex" flexFlow="row nowrap" gap="4px">
                    {notice.fileSet.map(({ file }) => (
                      <FileDown
                        key={file}
                        path={file}
                        size="s"
                        enableDownload={false}
                      />
                    ))}
                  </Box>
                </Box>
              </Table.Cell>
              <Table.Cell {...tableBodyRowCellStyle}>
                {format(new Date(notice.createdAt), 'yyyy-MM-dd')}
              </Table.Cell>
            </Table.Row>
          ))}

          {isNoSearchResult && (
            <Table.Row>
              <Table.Cell colSpan={2} p="0">
                <NewsDocumentNoSearchSection />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>

      <Box py="24px" display="flex" justifyContent="center">
        <Pagination
          size="sm"
          count={documents.count || 1}
          pageSize={LIMIT}
          defaultPage={page ? Number(page) : 1}
          onPageChange={(details) => handlePageChange(details.page)}
        />
      </Box>
    </>
  )
}

export default NewsDocumentTableSection
