'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import EmptySection from '@/app/(public)/(sub-layout)/_source/components/empty-section'
import Pagination from '@/components/pagination'
import { ROUTES } from '@/constants/routes'
import { useWeeklyBulletinListQuery } from '@/generated/apis/WeeklyBulletin/WeeklyBulletin.query'

const LIMIT = 8

const NewsBulletinPage: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())

    router.replace(`${ROUTES.NEWS_BULLETIN}?${newSearchParams.toString()}`)
  }

  const { data: bulletins } = useWeeklyBulletinListQuery({
    variables: {
      query: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
      },
    },
  })

  if (!bulletins) return null
  if (!bulletins.results) return null

  return (
    <Box display="flex" flexDirection="column">
      <Box
        py="20px"
        display="grid"
        gridTemplateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']}
        gap="20px 16px"
        borderTop="1.5px solid"
        borderTopColor="grey.10"
      >
        {bulletins.results.map((bulletin) => {
          const thumbnail = bulletin.thumbnail

          return (
            <Link
              key={bulletin.id}
              href={ROUTES.NEWS_BULLETIN_DETAIL(bulletin.id)}
              display="flex"
              flexDirection="column"
              alignItems="start"
              gap="0px"
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Image
                src={thumbnail}
                alt={bulletin.title + ' 썸네일 이미지'}
                flex="1"
                aspectRatio="2/3"
                rounded="6px"
                border="1px solid"
                borderColor="border.basic.1"
                overflow="hidden"
              />

              <Box py="12px" display="flex" flexDirection="column">
                <Text textStyle="pre-heading-3" color="grey.10" lineClamp="1">
                  {bulletin.title}
                </Text>
                <Box pt="6px" display="flex" gap="10px">
                  <Text textStyle="pre-caption-2" color="grey.7">
                    {format(bulletin.createdAt, 'yyyy-MM-dd')}
                  </Text>
                  <Box display="flex" alignItems="center" gap="4px">
                    <Text textStyle="pre-caption-2" color="grey.7">
                      조회
                    </Text>
                    <Text textStyle="pre-caption-2" color="grey.7">
                      {bulletin.hitCount}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Link>
          )
        })}
      </Box>

      {bulletins.results.length === 0 && <EmptySection />}

      <Box py="24px" display="flex" justifyContent="center">
        <Pagination
          size="sm"
          count={bulletins?.count || 1}
          pageSize={LIMIT}
          defaultPage={page ? Number(page) : 1}
          onPageChange={(details) => handlePageChange(details.page)}
        />
      </Box>
    </Box>
  )
}

export default NewsBulletinPage
