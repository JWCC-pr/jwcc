'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import AdminEditorContent from '@/app/(public)/(sub-layout)/_source/components/admin-editor-content'
import { toaster } from '@/components/ui/toaster'
import { ROUTES } from '@/constants/routes'
import { useNewsRetrieveQuery } from '@/generated/apis/News/News.query'
import useMe from '@/hooks/useMe'

interface NewsEventDetailPageProps {
  newsId: number
}

const NewsEventDetailPage: React.FC<NewsEventDetailPageProps> = ({
  newsId,
}) => {
  const { isParishMember } = useMe()
  const router = useRouter()
  const { data: news } = useNewsRetrieveQuery({
    variables: {
      id: newsId,
    },
  })

  useEffect(() => {
    if (!news) return
    if (news.isPublic || isParishMember) return

    router.replace(ROUTES.NEWS_EVENT)

    setTimeout(() => {
      toaster.create({
        type: 'error',
        title: '본당 신자만 접근 가능합니다.',
      })
    }, 0)
  }, [news, router, isParishMember])

  if (!news) return null

  return (
    <Box display="flex" flexDirection="column">
      <Box
        py="20px"
        display="flex"
        flexDirection="column"
        gap="10px"
        borderTop="1.5px solid"
        borderTopColor="grey.10"
        borderBottom="1px solid"
        borderBottomColor="border.basic.1"
      >
        <Text textStyle="pre-heading-2" color="grey.10">
          {news.title}
        </Text>
        <Text textStyle="pre-caption-2" color="grey.7">
          {format(news.createdAt, 'yyyy-MM-dd')}
        </Text>
      </Box>

      <AdminEditorContent body={news.body} />

      <Box py="16px" display="flex" justifyContent="center">
        <Box onClick={() => router.back()} cursor="pointer">
          <Button
            type="button"
            size="md"
            variant="solid"
            colorPalette="grey"
            w="120px"
          >
            목록으로
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default NewsEventDetailPage
