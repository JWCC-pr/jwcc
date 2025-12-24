'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { format } from 'date-fns/format'

import TableEmptySection from '@/app/(public)/(sub-layout)/_source/components/table-empty-section'
import Table, { type TableColumn } from '@/components/table'
import { ROUTES } from '@/constants/routes'
import type { PassingNoticeType } from '@/generated/apis/@types/data-contracts'
import { usePassingNoticeListQuery } from '@/generated/apis/PassingNotice/PassingNotice.query'

const LIMIT = 10

const columns: TableColumn<PassingNoticeType>[] = [
  {
    key: 'name',
    label: '고인 성함',
    width: { type: 'flex', value: 1, minWidth: 100 },
    textAlign: 'center',
    render: (passingNotice) => passingNotice.name,
  },
  {
    key: 'baptismalName',
    label: '세례명',
    width: { type: 'flex', value: 1, minWidth: 100 },
    textAlign: 'center',
    render: (passingNotice) => passingNotice.baptismalName,
  },
  {
    key: 'funeralStartAt',
    label: '장례미사',
    width: { type: 'flex', value: 1, minWidth: 120 },
    textAlign: 'center',
    render: (passingNotice) =>
      format(new Date(passingNotice.funeralStartAt), 'yyyy-MM-dd'),
  },
]

const NewsPassingNoticeTableSection: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)

  const handleClick = (passingNotice: PassingNoticeType) => {
    router.push(ROUTES.NEWS_PASSING_NOTICE_DETAIL(passingNotice.id))
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
    <Table
      minW="340px"
      columns={columns}
      data={passingNotices.results}
      getRowKey={(passingNotice) => passingNotice.id}
      onRowClick={handleClick}
      getRowProps={() => ({ bgColor: 'grey.0' })}
      pagination={{
        totalCount: passingNotices.count ?? 0,
        pageSize: LIMIT,
        currentPage: page,
        onPageChange: handlePageChange,
      }}
      emptyContent={<TableEmptySection colSpan={columns.length} />}
    />
  )
}

export default NewsPassingNoticeTableSection
