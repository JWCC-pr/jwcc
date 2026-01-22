'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Image } from '@chakra-ui/react/image'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { ArrowRightIcon } from '@phosphor-icons/react'

import EmptySection from '@/app/(public)/(sub-layout)/_source/components/empty-section'
import { ROUTES } from '@/constants/routes'
import { useWeeklyBulletinListQuery } from '@/generated/apis/WeeklyBulletin/WeeklyBulletin.query'

const BulletinSection: React.FC = () => {
  const { data: bulletin } = useWeeklyBulletinListQuery({
    variables: {
      query: {
        offset: 0,
        limit: 1,
      },
    },
  })

  // FIXME: 스켈레톤 UI 추가
  if (!bulletin) return null
  if (!bulletin.results) return null

  const targetBulletin = bulletin.results[0]

  return (
    <Box
      flex={['1', '1', 'initial']}
      w={['full', '330px']}
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
          본당 주보
        </Text>
        <Link href={ROUTES.NEWS_BULLETIN} _hover={{ textDecoration: 'none' }}>
          <Button variant="ghost" size="md" colorPalette="grey">
            더 보기
            <ArrowRightIcon size="20px" />
          </Button>
        </Link>
      </Box>

      {targetBulletin ?
        <Link
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
      : <EmptySection h="388px" title="등록된 주보가 없습니다." />}
    </Box>
  )
}

export default BulletinSection
