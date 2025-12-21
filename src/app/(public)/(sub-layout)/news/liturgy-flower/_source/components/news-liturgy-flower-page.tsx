'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Image } from '@chakra-ui/react/image'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { ImageIcon } from '@phosphor-icons/react'

import { format } from 'date-fns/format'

import Pagination from '@/components/pagination'
import { ROUTES } from '@/constants/routes'
import { useLiturgyFlowerListQuery } from '@/generated/apis/LiturgyFlower/LiturgyFlower.query'
import useMe from '@/hooks/useMe'

const LIMIT = 6

const NewsLiturgyFlowerPage: React.FC = () => {
  const { isHeonhwaMember } = useMe()

  const router = useRouter()
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())

    router.replace(
      `${ROUTES.NEWS_LITURGY_FLOWER}?${newSearchParams.toString()}`,
    )
  }

  const { data: liturgyFlowerList } = useLiturgyFlowerListQuery({
    variables: {
      query: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
      },
    },
  })

  return (
    <Box display="flex" flexDirection="column">
      <Box py="20px" display="flex" justifyContent="flex-end">
        {isHeonhwaMember && (
          <Link
            href={ROUTES.NEWS_LITURGY_FLOWER_CREATE}
            _hover={{ textDecoration: 'none' }}
          >
            <Button
              type="button"
              size="md"
              variant="solid"
              colorPalette="primary"
            >
              <ImageIcon size="20px" color="#FFF" />
              이미지 업로드
            </Button>
          </Link>
        )}
      </Box>

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
        {liturgyFlowerList?.results?.map((liturgyFlower) => {
          const thumbnail = liturgyFlower.imageSet[0].image

          return (
            <Link
              key={liturgyFlower.id}
              href={ROUTES.NEWS_LITURGY_FLOWER_DETAIL(liturgyFlower.id)}
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
                alt={liturgyFlower.title + ' 썸네일 이미지'}
                flex="1"
                w="full"
                aspectRatio="16/9"
                rounded="6px"
                border="1px solid"
                borderColor="border.basic.1"
                overflow="hidden"
              />

              <Box py="12px" display="flex" flexDirection="column">
                <Text textStyle="pre-heading-3" color="grey.10" lineClamp="1">
                  {liturgyFlower.title}
                </Text>
                <Box pt="6px" display="flex" flexDirection="column" gap="2px">
                  <Text textStyle="pre-body-5" color="grey.10">
                    {liturgyFlower.user.name}
                  </Text>
                  <Box display="flex" alignItems="center" gap="10px">
                    <Text textStyle="pre-caption-2" color="grey.7">
                      {format(liturgyFlower.createdAt, 'yyyy-MM-dd')}
                    </Text>
                    <Box display="flex" alignItems="center" gap="4px">
                      <Text textStyle="pre-caption-2" color="grey.7">
                        조회
                      </Text>
                      <Text textStyle="pre-caption-2" color="grey.7">
                        {liturgyFlower.hitCount}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          )
        })}
      </Box>

      <Box py="24px" display="flex" justifyContent="center">
        <Pagination
          size="sm"
          count={liturgyFlowerList?.count || 1}
          pageSize={LIMIT}
          defaultPage={page ? Number(page) : 1}
          onPageChange={(details) => handlePageChange(details.page)}
        />
      </Box>
    </Box>
  )
}

export default NewsLiturgyFlowerPage
