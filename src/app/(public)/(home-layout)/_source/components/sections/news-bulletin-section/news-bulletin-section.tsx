'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Image } from '@chakra-ui/react/image'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { ArrowRightIcon } from '@phosphor-icons/react'

import { format } from 'date-fns/format'

import EmptySection from '@/app/(public)/(sub-layout)/_source/components/empty-section'
import { ROUTES } from '@/constants/routes'
import { useNewsLatestRetrieveQuery } from '@/generated/apis/News/News.query'
import { useWeeklyBulletinListQuery } from '@/generated/apis/WeeklyBulletin/WeeklyBulletin.query'

const NewsBulletinSection: React.FC = () => {
  const { data: news } = useNewsLatestRetrieveQuery({})

  const { data: bulletin } = useWeeklyBulletinListQuery({
    variables: {
      query: {
        offset: 0,
        limit: 1,
      },
    },
  })

  // FIXME: 스켈레톤 UI 추가
  if (!news) return null

  // FIXME: 스켈레톤 UI 추가
  if (!bulletin) return null
  if (!bulletin.results) return null

  const targetNews = news
  const targetBulletin = bulletin.results[0]

  return (
    <Box
      as="section"
      w="100%"
      maxW="1280px"
      mx="auto"
      minH="100vh"
      p={['64px 20px', '64px 40px']}
      display="flex"
      flexFlow="column nowrap"
      alignItems="center"
      justifyContent="center"
      gap="40px"
    >
      <Box w="full" display="flex" gap={['24px', '40px']}>
        <Box
          flex="1"
          py="10px"
          display="flex"
          alignItems="center"
          gap="10px"
          flexShrink={0}
        >
          <Text flex="1" textStyle="pre-heading-1" color="grey.10">
            본당 소식
          </Text>
          <Link href={ROUTES.NEWS_EVENT} _hover={{ textDecoration: 'none' }}>
            <Button variant="ghost" size="md" colorPalette="grey">
              더 보기
              <ArrowRightIcon size="20px" />
            </Button>
          </Link>
        </Box>

        <Box
          flex={['1', '1', 'initial']}
          w={['full', '330px']}
          py="10px"
          display="flex"
          alignItems="center"
          gap="10px"
          flexShrink={0}
        >
          <Text flex="1" textStyle="pre-heading-1" color="grey.10">
            본당 주보
          </Text>
          <Link href={ROUTES.NEWS_BULLETIN} _hover={{ textDecoration: 'none' }}>
            <Button variant="ghost" size="md" colorPalette="grey">
              더 보기
              <ArrowRightIcon size="20px" />
            </Button>
          </Link>
        </Box>
      </Box>

      <Box
        w="full"
        display="flex"
        gap={['24px', '40px']}
        alignItems="flex-start"
      >
        {targetNews ?
          <Link
            flex="1"
            href={ROUTES.NEWS_EVENT_DETAIL(targetNews.id)}
            display="flex"
            flexFlow="column nowrap"
            alignItems="flex-start"
            gap="2px"
            _hover={{
              textDecoration: 'none',
              '& .news-image-container': {
                boxShadow: 'shadow-center',
              },
            }}
          >
            <Box
              as="figure"
              className="news-image-container"
              flex="1"
              minH="0"
              border="1px solid"
              borderColor="border.basic.1"
              rounded="6px"
              boxShadow="shadow-bottom"
              overflow="hidden"
              display="flex"
            >
              <Image
                src={targetNews.thumbnail}
                alt="본당 소식 이미지"
                aspectRatio="16/9"
                objectFit="cover"
                objectPosition="center"
              />
            </Box>
            <Box py="12px">
              <Text textStyle="pre-heading-3" color="grey.10" lineClamp="1">
                {targetNews.title}
              </Text>
              <Text textStyle="pre-caption-2" color="grey.7">
                {format(new Date(targetNews.createdAt), 'yyyy-MM-dd')}
              </Text>
            </Box>
          </Link>
        : <EmptySection
            flex="1"
            h="388px"
            title="등록된 본당 소식이 없습니다."
          />
        }

        {targetBulletin ?
          <Link
            flex={['1', '1', 'initial']}
            w={['full', '330px']}
            href={ROUTES.NEWS_BULLETIN_DETAIL(targetBulletin.id)}
            _hover={{
              textDecoration: 'none',
              '& .bulletin-image-container': {
                boxShadow: 'shadow-bottom',
              },
            }}
          >
            <Box
              as="figure"
              flex="1"
              minH="0"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                className="bulletin-image-container"
                src={targetBulletin.thumbnail}
                alt="bulletin"
                aspectRatio="2/3"
                maxH="500px"
                objectFit="fill"
                objectPosition="center"
                border="1px solid"
                borderColor="border.basic.1"
                rounded="6px"
                overflow="hidden"
              />
            </Box>
          </Link>
        : <EmptySection
            flex={['1', '1', 'initial']}
            w={['full', '330px']}
            h="388px"
            title="등록된 주보가 없습니다."
          />
        }
      </Box>
    </Box>
  )
}

export default NewsBulletinSection
