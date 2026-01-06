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

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
const cMapUrl = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`

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
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const x = useMotionValue(0)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)

  // 컨테이너 크기 계산 및 canvas 높이 측정
  useEffect(() => {
    if (!pdfContainerRef.current) return

    const updateSize = () => {
      if (!pdfContainerRef.current) return

      const width = pdfContainerRef.current.offsetWidth
      setContainerWidth(width)
    }

    // canvas 높이 측정
    const measureCanvasHeight = () => {
      // 첫 번째 페이지의 canvas 높이를 측정
      const firstPageElement = pageRefs.current.get(1)
      if (firstPageElement) {
        const canvas = firstPageElement.querySelector('canvas')
        if (canvas) {
          const canvasHeight = canvas.offsetHeight || canvas.height
          if (canvasHeight > 0) {
            setContainerHeight(canvasHeight)
          }
        }
      }
    }

    // 초기 크기 계산
    updateSize()

    // ResizeObserver로 컨테이너 크기 변경 감지
    const resizeObserver = new ResizeObserver(() => {
      updateSize()
      // 크기 변경 후 canvas 높이 재측정
      setTimeout(measureCanvasHeight, 100)
    })

    resizeObserver.observe(pdfContainerRef.current)

    // window resize 이벤트도 감지
    window.addEventListener('resize', () => {
      updateSize()
      setTimeout(measureCanvasHeight, 100)
    })

    // canvas 높이 측정 (PDF 로드 후)
    if (numPages && containerWidth > 0) {
      setTimeout(measureCanvasHeight, 200)
    }

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateSize)
    }
  }, [numPages, containerWidth])

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
        alignItems="flex-start"
        justifyContent="center"
        gap="10px"
        w={['100%', '100%', '800px']}
        maxW="100%"
        px={['12px', '12px', '0']}
      >
        {/* 왼쪽 버튼 */}
        <Box flexShrink="0" display={['none', 'flex']} alignSelf="center">
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
          flex="1"
          minW="0"
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
            alignItems="flex-start"
            justifyContent="flex-start"
            rounded="6px"
            overflow="visible"
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
              options={{ cMapUrl, verbosity: 0 }}
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
                bgColor="background.basic.2"
              >
                {numPages &&
                  Array.from(new Array(numPages), (_, index) => {
                    const pageIndex = index + 1

                    return (
                      <Box
                        key={`page_${pageIndex}`}
                        ref={(el: HTMLDivElement | null) => {
                          if (el) {
                            pageRefs.current.set(pageIndex, el)
                          } else {
                            pageRefs.current.delete(pageIndex)
                          }
                        }}
                        flexShrink="0"
                        w={`${containerWidth}px`}
                        h={
                          containerHeight > 0 ? `${containerHeight}px` : 'auto'
                        }
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="center"
                        position="relative"
                        overflow="visible"
                      >
                        <Box
                          w="100%"
                          h="auto"
                          display="flex"
                          alignItems="flex-start"
                          justifyContent="center"
                          bgColor="background.basic.2"
                          css={{
                            '& > .react-pdf__Page': {
                              display: 'flex',
                              alignItems: 'flex-start',
                              justifyContent: 'center',
                            },
                            '& > .react-pdf__Page > canvas': {
                              width: '100% !important',
                              height: 'auto !important',
                              maxWidth: '100%',
                            },
                          }}
                        >
                          <Page
                            pageNumber={pageIndex}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            width={containerWidth}
                            onRenderSuccess={() => {
                              // canvas 렌더링 후 높이 측정
                              const pageElement =
                                pageRefs.current.get(pageIndex)
                              if (pageElement && pageIndex === 1) {
                                const canvas =
                                  pageElement.querySelector('canvas')
                                if (canvas) {
                                  const canvasHeight =
                                    canvas.offsetHeight || canvas.height
                                  if (canvasHeight > 0) {
                                    setContainerHeight(canvasHeight)
                                  }
                                }
                              }
                            }}
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
                      </Box>
                    )
                  })}
              </MotionBox>
            </Document>
          </Box>
        </Box>

        {/* 오른쪽 버튼 */}
        <Box flexShrink="0" display={['none', 'flex']} alignSelf="center">
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
