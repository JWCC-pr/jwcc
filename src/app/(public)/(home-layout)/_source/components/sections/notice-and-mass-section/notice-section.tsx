'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { ArrowRightIcon, CaretRightIcon } from '@phosphor-icons/react'

import { format } from 'date-fns/format'

import { ROUTES } from '@/constants/routes'
import { useNoticeListQuery } from '@/generated/apis/Notice/Notice.query'

const NoticeSection: React.FC = () => {
  const { data: notices } = useNoticeListQuery({
    variables: {
      query: {
        offset: 0,
        limit: 5,
      },
    },
  })

  // FIXME: 스켈레톤 UI 추가
  if (!notices) return null

  return (
    <Box flex="1" display="flex" flexFlow="column nowrap" gap="40px">
      <Box py="10px" display="flex" alignItems="center" gap="10px">
        <Text flex="1" textStyle="pre-heading-1" color="grey.10">
          공지사항
        </Text>
        <Link href={ROUTES.NEWS_NOTICES} _hover={{ textDecoration: 'none' }}>
          <Button variant="ghost" size="md" colorPalette="grey">
            전체 보기
            <ArrowRightIcon size="20px" />
          </Button>
        </Link>
      </Box>
      <Box display="flex" flexFlow="column nowrap">
        <Box w="full" h="1.5px" bgColor="grey.10" />
        <Box as="ul" display="flex" flexFlow="column nowrap">
          {notices.results?.map((mock) => (
            <Link
              key={mock.id}
              href={`${ROUTES.NEWS_NOTICES}/${mock.id}`}
              p="24px 16px"
              display="flex"
              alignItems="center"
              gap="20px"
              borderBottom="1px solid"
              borderBottomColor="grey.2"
              transition="all 0.2s ease-in-out"
              _last={{
                borderBottom: 'none',
              }}
              _hover={{
                bgColor: 'grey.1',
                textDecoration: 'none',
              }}
            >
              <Text
                flex="1"
                textStyle="pre-body-1"
                color="grey.10"
                lineClamp="1"
              >
                {mock.title}
              </Text>
              <Text textStyle="pre-body-6" color="grey.7">
                {format(new Date(mock.createdAt), 'yyyy-MM-dd')}
              </Text>
              <CaretRightIcon size="20px" color="#9FA4A9" />
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default NoticeSection
