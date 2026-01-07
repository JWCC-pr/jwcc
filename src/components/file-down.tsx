'use client'

import { useCallback, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Spinner } from '@chakra-ui/react/spinner'
import { Text } from '@chakra-ui/react/text'
import { FileArrowDownIcon } from '@phosphor-icons/react'

import { toaster } from './ui/toaster'

/** URL에서 파일명 추출 (파일명만 추출) */
const getFileName = (fileUrl: string) => {
  const urlPath = new URL(fileUrl).pathname
  const fileFullPath = urlPath.split('/').pop() || 'download'
  const [fileName] = fileFullPath.split('.')
  return decodeURIComponent(fileName)
}

interface FileDownProps {
  size?: 'l' | 's'
  path: string
  enableDownload?: boolean
}

const FileDown: React.FC<FileDownProps> = ({
  path,
  size = 'l',
  enableDownload = true,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = useCallback(
    async (fileUrl: string) => {
      if (!enableDownload) return

      setIsLoading(true)
      try {
        const link = document.createElement('a')
        link.href = fileUrl
        link.download = getFileName(fileUrl)

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        console.error(error)
        toaster.create({
          type: 'error',
          title: '파일 다운로드에 실패했습니다.',
        })
      } finally {
        setIsLoading(false)
      }
    },
    [enableDownload],
  )

  const isLarge = size === 'l'
  const disabled = isLoading

  return (
    <Box
      p={isLarge ? '8px 10px' : '4px 8px'}
      display="flex"
      alignItems="center"
      gap={isLarge ? '4px' : '2px'}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      border="1px solid"
      borderColor="border.basic.1"
      borderRadius={isLarge ? '8px' : '4px'}
      bgColor="grey.0"
      onClick={disabled ? undefined : () => handleDownload(path)}
      position="relative"
      opacity={disabled ? 0.4 : 1}
    >
      {isLoading ?
        <>
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size={isLarge ? 'sm' : 'xs'} color="grey.10" />
          </Box>
          <Text
            textStyle={isLarge ? 'pre-body-6' : 'pre-caption-2'}
            color="transparent"
            visibility="hidden"
            aria-hidden="true"
            lineClamp={1}
            minW="0"
            flex="1"
          >
            {getFileName(path)}
          </Text>
        </>
      : <>
          <FileArrowDownIcon size={isLarge ? '20px' : '16px'} color="#6A6D71" />
          <Text
            textStyle={isLarge ? 'pre-body-6' : 'pre-caption-2'}
            color="grey.10"
            lineClamp={1}
            minW="0"
            flex="1"
          >
            {getFileName(path)}
          </Text>
        </>
      }
    </Box>
  )
}

export default FileDown
