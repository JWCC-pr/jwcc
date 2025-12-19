'use client'

import { useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

import { Document, Page, pdfjs } from 'react-pdf'

import { WeeklyBulletinType } from '@/generated/apis/@types/data-contracts'

// FIXME: pdfjs 설치 후 worker src 수정
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface NewsBullentinDetailPdfSectionProps {
  bulletin: Pick<WeeklyBulletinType, 'file'>
}

const NewsBullentinDetailPdfSection: React.FC<
  NewsBullentinDetailPdfSectionProps
> = ({ bulletin }) => {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function onDocumentLoadError(error: Error) {
    console.error('PDF 로드 오류:', error)
    setLoading(false)
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    if (numPages) {
      setPageNumber((prev) => Math.min(prev + 1, numPages))
    }
  }

  return (
    <Box
      w="full"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="20px"
      py="24px"
      bgColor="background.basic.2"
      borderBottom="1px solid"
      borderColor="border.basic.1"
    >
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="10px"
        w="800px"
        maxW="100%"
      >
        {/* 왼쪽 버튼 */}
        <Box flexShrink="0">
          <IconButton
            size="lg"
            variant="solid"
            colorPalette="grey"
            rounded="8px"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
            opacity={pageNumber <= 1 ? 0.5 : 1}
            aria-label="이전 페이지"
          >
            <CaretLeftIcon size={24} />
          </IconButton>
        </Box>

        {/* PDF */}
        <Box
          w="680px"
          flexShrink="0"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="12px"
        >
          <Box
            position="relative"
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            rounded="6px"
            overflow="hidden"
            minH="600px"
          >
            {loading && (
              <Box
                position="absolute"
                inset="0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgColor="background.basic.1"
                zIndex="1"
              >
                <Text textStyle="pre-body-4" color="grey.7">
                  PDF 로딩 중...
                </Text>
              </Box>
            )}
            <Document
              file={bulletin.file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <Box
                  py="40px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text textStyle="pre-body-4" color="grey.7">
                    로딩 중...
                  </Text>
                </Box>
              }
            >
              {/* 모든 페이지를 렌더링하되, 현재 페이지만 표시 */}
              {numPages &&
                Array.from(new Array(numPages), (_, index) => (
                  <Box
                    key={`page_${index + 1}`}
                    display={pageNumber === index + 1 ? 'flex' : 'none'}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Page
                      pageNumber={index + 1}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={680}
                      height={undefined}
                    />
                  </Box>
                ))}
            </Document>
          </Box>
        </Box>

        {/* 오른쪽 버튼 */}
        <Box flexShrink="0">
          <IconButton
            size="lg"
            variant="solid"
            colorPalette="grey"
            rounded="8px"
            onClick={goToNextPage}
            disabled={!numPages || pageNumber >= numPages}
            opacity={!numPages || pageNumber >= numPages ? 0.5 : 1}
            aria-label="다음 페이지"
          >
            <CaretRightIcon size={24} />
          </IconButton>
        </Box>
      </Box>

      {numPages && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="4px"
          p="2px 8px"
          rounded="4px"
          bgColor="background.basic.4"
        >
          <Text textStyle="pre-caption-2" color="grey.8">
            {pageNumber}/{numPages}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default NewsBullentinDetailPdfSection
