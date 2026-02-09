'use client'

import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

interface LinkPreviewData {
  title?: string
  description?: string
  image?: string
  siteName?: string
  favicon?: string
  url: string
}

interface LinkPreviewProps {
  url: string
  className?: string
}

/**
 * 링크 미리보기 카드 컴포넌트
 * 외부 URL의 Open Graph 메타 데이터를 표시합니다.
 */
export const LinkPreview: React.FC<LinkPreviewProps> = ({ url, className }) => {
  const [data, setData] = useState<LinkPreviewData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(
          `/api/link-preview?url=${encodeURIComponent(url)}`,
        )

        if (!response.ok) {
          throw new Error('Failed to fetch preview')
        }

        const previewData = (await response.json()) as LinkPreviewData
        setData(previewData)
      } catch (err) {
        console.error('Link preview error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load preview')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPreview()
  }, [url])

  // 로딩 중
  if (isLoading) {
    return (
      <Box
        mt="12px"
        p="16px"
        border="1px solid"
        borderColor="border.basic.1"
        borderRadius="8px"
        bg="grey.1"
        className={className}
      >
        <Text textStyle="pre-caption-2" color="grey.7">
          링크 미리보기 로딩 중...
        </Text>
      </Box>
    )
  }

  // 에러 발생 시 간단한 링크만 표시
  if (error || !data) {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        _hover={{ textDecoration: 'none' }}
        className={className}
      >
        <Box
          mt="12px"
          p="12px"
          border="1px solid"
          borderColor="border.basic.1"
          borderRadius="8px"
          display="block"
          _hover={{ bg: 'grey.1' }}
        >
          <Text textStyle="pre-caption-2" color="blue.500">
            {url}
          </Text>
        </Box>
      </Link>
    )
  }

  // 이미지가 없으면 렌더링하지 않음
  if (!data.image) {
    return null
  }

  // 정상 렌더링 (title → description → image 순서로 col 배치)
  return (
    <Link
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      _hover={{ textDecoration: 'none' }}
      className={className}
      w="fit-content"
      maxW="300px"
      mb="12px"
    >
      <Box
        border="1px solid"
        borderColor="border.basic.1"
        borderRadius="8px"
        overflow="hidden"
        transition="all 0.2s"
        _hover={{ bg: 'grey.1', borderColor: 'grey.4' }}
        display="flex"
        flexFlow="column"
      >
        <Box p="16px" display="flex" flexFlow="column" gap="8px">
          <Box display="flex" alignItems="center" gap="6px">
            {data.favicon && (
              <Image src={data.favicon} alt="favicon" w="16px" h="16px" />
            )}
            <Text textStyle="pre-caption-2" color="grey.7" lineClamp={1}>
              {data.siteName || new URL(data.url).hostname}
            </Text>
          </Box>
          {data.title && (
            <Text
              textStyle="pre-body-4"
              color="grey.10"
              fontWeight="600"
              lineClamp={2}
            >
              {data.title}
            </Text>
          )}
          {data.description && (
            <Text textStyle="pre-caption-1" color="grey.8" lineClamp={3}>
              {data.description}
            </Text>
          )}
        </Box>
        <Box
          w="full"
          aspectRatio="1.91"
          overflow="hidden"
          borderTop="1px solid"
          borderColor="border.basic.1"
        >
          <Image
            src={data.image}
            alt={data.title || 'Link preview image'}
            objectFit="cover"
            w="full"
            h="full"
            m="0 !important"
          />
        </Box>
      </Box>
    </Link>
  )
}

export default LinkPreview
