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

/** 카카오톡 인앱 브라우저 감지 */
const isKakaoInAppBrowser = () => {
  const ua = navigator.userAgent.toLowerCase()
  return ua.includes('kakaotalk') || ua.includes('kakao')
}

/** iOS 기기 감지 */
const isIOS = () => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

/** Blob을 DataURL로 변환 */
const blobToDataUrl = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
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

      const isKakaoBrowser = isKakaoInAppBrowser()
      const isIOSDevice = isIOS()

      setIsLoading(true)
      try {
        const proxyUrl = fileUrl

        const response = await fetch(proxyUrl)
        if (!response.ok) {
          throw new Error('파일 다운로드에 실패했습니다.')
        }

        const blob = await response.blob()
        const link = document.createElement('a')
        const fileName = getFileName(fileUrl)
        link.download = fileName

        // iOS + 카카오 브라우저: dataURL 방식 사용
        if (isKakaoBrowser && isIOSDevice) {
          const dataUrl = await blobToDataUrl(blob)
          link.href = dataUrl
        } else {
          link.href = proxyUrl
        }

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
