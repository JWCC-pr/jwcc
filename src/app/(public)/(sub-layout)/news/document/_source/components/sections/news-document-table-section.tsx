'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'
import { keepPreviousData } from '@tanstack/react-query'

import { format } from 'date-fns/format'

import TableEmptySection from '@/app/(public)/(sub-layout)/_source/components/table-empty-section'
import FileDown from '@/components/file-down'
import Table, { type TableColumn } from '@/components/table'
import { ROUTES } from '@/constants/routes'
import type { DocumentType } from '@/generated/apis/@types/data-contracts'
import { useDocumentListQuery } from '@/generated/apis/Document/Document.query'

import NewsDocumentNoSearchSection from './news-document-no-search-section'

const LIMIT = 10

const columns: TableColumn<DocumentType>[] = [
  {
    key: 'title',
    label: '제목',
    width: { type: 'flex', value: 1, minWidth: 200 },
    textAlign: 'left',
    render: (document) => (
      <Box
        display="flex"
        flexFlow="column nowrap"
        gap="4px"
        alignItems="flex-start"
      >
        <Text textStyle="pre-body-6" lineClamp="1" className="hover-underline">
          {document.title}
        </Text>
        <Box display="flex" flexFlow="row nowrap" gap="4px">
          {document.fileSet.map(({ file }) => (
            <FileDown key={file} path={file} size="s" enableDownload={false} />
          ))}
        </Box>
      </Box>
    ),
  },
  {
    key: 'createdAt',
    label: '작성일',
    width: { type: 'fixed', value: 120 },
    textAlign: 'center',
    render: (document) => format(new Date(document.createdAt), 'yyyy-MM-dd'),
  },
]

const NewsDocumentTableSection: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const title = searchParams.get('title') ?? undefined

  const handleClick = (document: DocumentType) => {
    router.push(ROUTES.NEWS_DOCUMENT_DETAIL(document.id))
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
    options: {
      placeholderData: keepPreviousData,
    },
  })

  const hasTitle = !!title
  const isNoSearchResult = hasTitle && documents?.count === 0

  // FIXME: 스켈레톤 UI, 빈 데이터 UI 추가
  if (!documents) return
  if (!documents.results) return

  return (
    <Table
      minW="700px"
      columns={columns}
      data={documents.results}
      getRowKey={(document) => document.id}
      onRowClick={handleClick}
      pagination={{
        totalCount: documents.count || 1,
        pageSize: LIMIT,
        currentPage: page,
        onPageChange: handlePageChange,
      }}
      emptyContent={
        isNoSearchResult ?
          <NewsDocumentNoSearchSection colSpan={columns.length} />
        : <TableEmptySection colSpan={columns.length} />
      }
    />
  )
}

export default NewsDocumentTableSection
