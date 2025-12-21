'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import Pagination from '@/components/pagination'
import { ROUTES } from '@/constants/routes'
import { useNewsListQuery } from '@/generated/apis/News/News.query'

const LIMIT = 6

const NewsEventsPage: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())

    router.replace(`${ROUTES.NEWS_EVENT}?${newSearchParams.toString()}`)
  }

  const { data: news } = useNewsListQuery({
    variables: {
      query: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
      },
    },
  })

  // FIXME: 스켈레톤 UI, 빈 데이터 UI 추가
  if (!news) return null

  return (
    <Box>
      <Box
        py="20px"
        display="grid"
        gridTemplateColumns={[
          'repeat(1, 1fr)',
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
        ]}
        gap="16px"
        borderTop="1.5px solid"
        borderTopColor="grey.10"
      >
        {news?.results?.map((news) => (
          <Link
            key={news.id}
            href={ROUTES.NEWS_EVENT_DETAIL(news.id)}
            display="flex"
            flexDirection="column"
            alignItems="start"
            gap="0px"
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Image
              src={news.thumbnail}
              alt={news.title + ' 썸네일 이미지'}
              flex="1"
              w="full"
              aspectRatio="16/9"
              rounded="6px"
              border="1px solid"
              borderColor="border.basic.1"
              overflow="hidden"
            />

            <Box py="12px" display="flex" flexDirection="column" gap="2px">
              <Text textStyle="pre-heading-3" color="grey.10">
                {news.title}
              </Text>
              <Text textStyle="pre-caption-2" color="grey.7">
                {format(news.createdAt, 'yyyy-MM-dd')}
              </Text>
            </Box>
          </Link>
        ))}
      </Box>

      <Box py="24px" display="flex" justifyContent="center">
        <Pagination
          size="sm"
          count={news.count || 1}
          pageSize={LIMIT}
          defaultPage={page ? Number(page) : 1}
          onPageChange={(details) => handlePageChange(details.page)}
        />
      </Box>
    </Box>
  )
}

export default NewsEventsPage
