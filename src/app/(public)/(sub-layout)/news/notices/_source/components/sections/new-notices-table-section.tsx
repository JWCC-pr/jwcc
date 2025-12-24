'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'
import { PushPinIcon } from '@phosphor-icons/react'

import { format } from 'date-fns/format'

import Table, { type TableColumn } from '@/components/table'
import { ROUTES } from '@/constants/routes'
import type { NoticeType } from '@/generated/apis/@types/data-contracts'
import { useNoticeListQuery } from '@/generated/apis/Notice/Notice.query'

/** 고정 공지사항 */
const FIXED_LIMIT = 3
/** 일반 공지사항 */
const LIMIT = 7

type NoticeWithFixed = NoticeType & { isFixed: boolean }

const columns: TableColumn<NoticeWithFixed>[] = [
  {
    key: 'title',
    label: '제목',
    width: { type: 'flex', value: 1, minWidth: 200 },
    textAlign: 'left',
    render: (notice) => (
      <Box display="flex" alignItems="center" gap="6px">
        {notice.isFixed && (
          <Box
            flexShrink="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="16px"
            h="16px"
          >
            <PushPinIcon size="16px" color="#780536" />
          </Box>
        )}
        <Text textStyle="pre-body-4" color="grey.10" lineClamp="1">
          {notice.title}
        </Text>
      </Box>
    ),
  },
  {
    key: 'createdAt',
    label: '작성일',
    width: { type: 'fixed', value: 120 },
    textAlign: 'center',
    render: (notice) => format(new Date(notice.createdAt), 'yyyy-MM-dd'),
  },
]

const NewNoticesTableSection: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)

  const handleClick = (notice: NoticeWithFixed) => {
    router.push(ROUTES.NEWS_NOTICES_DETAIL(notice.id))
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

  const combinedNotices: NoticeWithFixed[] = [
    ...fixedNotices.results.map((notice) => ({
      ...notice,
      isFixed: true,
    })),
    ...notices.results.map((notice) => ({
      ...notice,
      isFixed: false,
    })),
  ]

  return (
    <Table
      columns={columns}
      data={combinedNotices}
      getRowKey={(notice) => notice.id}
      onRowClick={handleClick}
      getRowProps={(notice) => ({
        bgColor: notice.isFixed ? 'primary.1' : 'grey.0',
      })}
      pagination={{
        totalCount: notices.count ?? 0,
        pageSize: LIMIT,
        currentPage: page,
        onPageChange: handlePageChange,
      }}
    />
  )
}

export default NewNoticesTableSection
