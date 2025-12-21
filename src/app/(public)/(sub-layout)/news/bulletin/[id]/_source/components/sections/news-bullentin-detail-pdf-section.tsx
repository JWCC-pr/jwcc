'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

import { animate, motion, useMotionValue } from 'motion/react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { WeeklyBulletinType } from '@/generated/apis/@types/data-contracts'

// FIXME: pdfjs 설치 후 worker src 수정
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const MotionBox = motion(Box)

const ANIMATION_DURATION = 0.3
const ANIMATION_EASE = [0.4, 0, 0.2, 1] as const
const DRAG_THRESHOLD = 50
const GAP = 40

interface NewsBullentinDetailPdfSectionProps {
  bulletin: Pick<WeeklyBulletinType, 'file'>
}

const NewsBullentinDetailPdfSection: React.FC<
  NewsBullentinDetailPdfSectionProps
> = ({ bulletin }) => {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [containerHeight, setContainerHeight] = useState<number>(0)
  const [isDragging, setIsDragging] = useState(false)

  const pdfContainerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)

  // 컨테이너 크기 계산 (디바이스별 비율 적용)
  useEffect(() => {
    const updateSize = () => {
      if (!pdfContainerRef.current) return

      const width = pdfContainerRef.current.offsetWidth
      setContainerWidth(width)

      // 디바이스별 비율 계산
      // mobile (< 768px): 5:7
      // tablet (768px ~ 1024px): 6:7
      // pc (>= 1024px): 5:4
      const screenWidth = window.innerWidth
      let aspectRatio = 5 / 4 // pc 기본값

      if (screenWidth < 768) {
        aspectRatio = 5 / 7 // mobile
      } else if (screenWidth < 1024) {
        aspectRatio = 6 / 7 // tablet
      }

      const height = width / aspectRatio
      setContainerHeight(height)
    }

    // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 크기 계산
    setTimeout(updateSize, 100)
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function onDocumentLoadError(error: Error) {
    console.error('PDF 로드 오류:', error)
    setLoading(false)
  }

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop()
      animationRef.current = null
    }
  }, [])

  const goToPrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1))
  }, [])

  const goToNextPage = useCallback(() => {
    if (numPages) {
      setPageNumber((prev) => Math.min(prev + 1, numPages))
    }
  }, [numPages])

  // 페이지 변경 시 애니메이션
  useEffect(() => {
    if (!numPages || containerWidth <= 0 || isDragging) return

    stopAnimation()

    const targetX = -(pageNumber - 1) * (containerWidth + GAP)

    animationRef.current = animate(x, targetX, {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
    })

    return () => {
      stopAnimation()
    }
  }, [pageNumber, containerWidth, numPages, x, isDragging, stopAnimation])

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    stopAnimation()
  }, [stopAnimation])

  const handleDragEnd = useCallback(
    (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: { offset: { x: number }; velocity: { x: number } },
    ) => {
      setIsDragging(false)

      // 드래그 방향과 거리에 따라 페이지 전환
      if (Math.abs(info.offset.x) > DRAG_THRESHOLD) {
        if (info.offset.x > 0 && pageNumber > 1) {
          // 오른쪽으로 드래그 - 이전 페이지
          goToPrevPage()
        } else if (info.offset.x < 0 && numPages && pageNumber < numPages) {
          // 왼쪽으로 드래그 - 다음 페이지
          goToNextPage()
        } else {
          // 경계에서 드래그 - 원래 위치로 복귀
          const targetX = -(pageNumber - 1) * (containerWidth + GAP)
          animate(x, targetX, {
            duration: ANIMATION_DURATION,
            ease: ANIMATION_EASE,
          })
        }
      } else {
        // 드래그 거리가 짧으면 원래 위치로 복귀
        const targetX = -(pageNumber - 1) * (containerWidth + GAP)
        animate(x, targetX, {
          duration: ANIMATION_DURATION,
          ease: ANIMATION_EASE,
        })
      }
    },
    [containerWidth, pageNumber, numPages, goToPrevPage, goToNextPage, x],
  )

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
        w={['100%', '100%', '800px']}
        maxW="100%"
        px={['12px', '12px', '0']}
      >
        {/* 왼쪽 버튼 */}
        <Box flexShrink="0" display={['none', 'flex']}>
          <IconButton
            size="lg"
            variant="outline"
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

        {/* PDF Container */}
        <Box
          ref={pdfContainerRef}
          flexShrink="0"
          w={['100%', `calc(100% - 120px)`, '680px']}
          maxW="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="12px"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="relative"
            w="100%"
            h={containerHeight > 0 ? `${containerHeight}px` : 'auto'}
            minH="400px"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            rounded="6px"
            overflow="hidden"
            bgColor="background.basic.1"
            cursor={isDragging ? 'grabbing' : 'grab'}
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
              <MotionBox
                display="flex"
                alignItems="center"
                gap={`${GAP}px`}
                h="100%"
                style={{
                  x,
                }}
                drag="x"
                dragElastic={0.05}
                dragConstraints={{
                  left:
                    numPages && containerWidth > 0 ?
                      -(numPages - 1) * (containerWidth + GAP)
                    : 0,
                  right: 0,
                }}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                dragMomentum={false}
              >
                {numPages &&
                  Array.from(new Array(numPages), (_, index) => {
                    const pageIndex = index + 1
                    // 현재 페이지와 뒤 3페이지만 렌더링 (미리 로드)
                    const shouldRender =
                      pageIndex >= pageNumber && pageIndex <= pageNumber + 3

                    return (
                      <Box
                        key={`page_${pageIndex}`}
                        flexShrink="0"
                        w={`${containerWidth}px`}
                        h={`${containerHeight}px`}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        overflow="hidden"
                      >
                        {
                          shouldRender ?
                            <Box
                              w="100%"
                              h="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              css={{
                                '& > .react-pdf__Page': {
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                                '& > .react-pdf__Page > canvas': {
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  width: 'auto !important',
                                  height: 'auto !important',
                                  objectFit: 'contain',
                                },
                              }}
                            >
                              <Page
                                pageNumber={pageIndex}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                height={containerHeight}
                                loading={
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    h="100%"
                                  >
                                    <Text textStyle="pre-body-4" color="grey.7">
                                      페이지 로딩 중...
                                    </Text>
                                  </Box>
                                }
                              />
                            </Box>
                            // Placeholder to maintain layout
                          : <Box w="100%" h="100%" />
                        }
                      </Box>
                    )
                  })}
              </MotionBox>
            </Document>
          </Box>
        </Box>

        {/* 오른쪽 버튼 */}
        <Box flexShrink="0" display={['none', 'flex']}>
          <IconButton
            size="lg"
            variant="outline"
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

      {/* 페이지 인디케이터 */}
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
