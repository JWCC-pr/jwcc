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

const NewsSection: React.FC = () => {
  const { data: news } = useNewsLatestRetrieveQuery({})

  // FIXME: 스켈레톤 UI 추가
  if (!news) return

  const targetNews = news

  return (
    <Box
      flex="1"
      display="flex"
      flexFlow="column nowrap"
      gap={['24px', '40px']}
    >
      <Box
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

      {targetNews ?
        <Link
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
      : <EmptySection h="388px" title="등록된 본당 소식이 없습니다." />}
    </Box>
  )
}

export default NewsSection
