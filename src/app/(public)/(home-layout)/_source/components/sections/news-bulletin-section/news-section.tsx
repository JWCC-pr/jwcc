'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Image } from '@chakra-ui/react/image'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { ArrowRightIcon } from '@phosphor-icons/react'

import { ROUTES } from '@/constants/routes'

const NewsSection: React.FC = () => {
  return (
    <Box flex="1" display="flex" flexFlow="column nowrap" gap="40px" h="100%">
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

      <Box
        as="figure"
        flex="1"
        minH="0"
        borderColor="border.basic.1"
        rounded="6px"
        boxShadow="shadow-bottom"
        overflow="hidden"
        display="flex"
      >
        <Image
          src="/images/home/church-news-section/news.jpg"
          alt="본당 소식 이미지"
          aspectRatio="16/9"
          objectFit="cover"
          objectPosition="center"
        />
      </Box>
    </Box>
  )
}

export default NewsSection
