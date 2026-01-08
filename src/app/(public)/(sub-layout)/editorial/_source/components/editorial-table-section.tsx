'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'
import { keepPreviousData } from '@tanstack/react-query'

import { format } from 'date-fns/format'

import TableEmptySection from '@/app/(public)/(sub-layout)/_source/components/table-empty-section'
import FileDown from '@/components/file-down'
import Table, { type TableColumn } from '@/components/table'
import { WeeklyBulletinEditorialType } from '@/generated/apis/@types/data-contracts'
import {
  useEditorialsDraftListQuery,
  useEditorialsFinalListQuery,
  useEditorialsMyeongdoListQuery,
  useEditorialsTemplateListQuery,
} from '@/generated/apis/Editorials/Editorials.query'

import { EditorialType, editorialRoutes } from '../utils'
import EditorialNoSearchSection from './editorial-no-search-section'

const LIMIT = 10

interface EditorialTableSectionProps {
  type: EditorialType
  baseRoute: string
}

const EditorialTableSection: React.FC<EditorialTableSectionProps> = ({
  type,
  baseRoute,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  const title = searchParams.get('title') ?? undefined

  // 타입에 따라 다른 API 훅 사용
  const draftQuery = useEditorialsDraftListQuery({
    variables: {
      query: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        title,
      },
    },
    options: {
      placeholderData: keepPreviousData,
      enabled: type === 'draft',
    },
  })

  const finalQuery = useEditorialsFinalListQuery({
    variables: {
      query: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        title,
      },
    },
    options: {
      placeholderData: keepPreviousData,
      enabled: type === 'final',
    },
  })

  const myeongdoQuery = useEditorialsMyeongdoListQuery({
    variables: {
      query: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        title,
      },
    },
    options: {
      placeholderData: keepPreviousData,
      enabled: type === 'myeongdo',
    },
  })

  const templateQuery = useEditorialsTemplateListQuery({
    variables: {
      query: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        title,
      },
    },
    options: {
      placeholderData: keepPreviousData,
      enabled: type === 'template',
    },
  })

  // 타입에 따라 적절한 쿼리 선택
  const data =
    type === 'draft' ? draftQuery.data
    : type === 'final' ? finalQuery.data
    : type === 'myeongdo' ? myeongdoQuery.data
    : templateQuery.data

  const columns: TableColumn<WeeklyBulletinEditorialType>[] = [
    {
      key: 'title',
      label: '제목',
      width: { type: 'flex', value: 1, minWidth: 200 },
      textAlign: 'left',
      render: (editorial) => (
        <Box
          display="flex"
          flexFlow="column nowrap"
          gap="4px"
          alignItems="flex-start"
        >
          <Text
            textStyle="pre-body-6"
            lineClamp="1"
            className="hover-underline"
          >
            {editorial.title}
          </Text>
          <Box display="flex" flexFlow="row wrap" gap="4px">
            {editorial.fileSet.map((file) => (
              <FileDown
                key={file.file}
                path={file.file}
                size="s"
                enableDownload={false}
              />
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
      render: (editorial) =>
        format(new Date(editorial.createdAt), 'yyyy-MM-dd'),
    },
  ]

  const handleClick = (editorial: WeeklyBulletinEditorialType) => {
    router.push(editorialRoutes.EDITORIAL_DETAIL(type, editorial.id))
  }

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())

    router.replace(`${baseRoute}?${newSearchParams.toString()}`)
  }

  const hasTitle = !!title
  const isNoSearchResult = hasTitle && data?.count === 0

  // FIXME: 스켈레톤 UI, 빈 데이터 UI 추가
  if (!data) return
  if (!data.results) return

  return (
    <Table
      minW="700px"
      columns={columns}
      data={data.results}
      getRowKey={(editorial) => editorial.id}
      onRowClick={handleClick}
      pagination={{
        totalCount: data.count || 1,
        pageSize: LIMIT,
        currentPage: page,
        onPageChange: handlePageChange,
      }}
      emptyContent={
        isNoSearchResult ?
          <EditorialNoSearchSection colSpan={columns.length} />
        : <TableEmptySection colSpan={columns.length} />
      }
    />
  )
}

export default EditorialTableSection
