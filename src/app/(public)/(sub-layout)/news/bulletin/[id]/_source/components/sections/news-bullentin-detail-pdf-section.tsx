'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { useGesture } from '@use-gesture/react'

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
const PINCH_SCALE_MIN = 1
const PINCH_SCALE_MAX = 4
const EDGE_PAN_THRESHOLD = 50

interface NewsBullentinDetailPdfSectionProps {
  bulletin: Pick<WeeklyBulletinType, 'file'>
}

type DragMemo = {
  startPanX: number
  startPanY: number
  mode: 'carousel' | 'pan'
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
  const [isZoomed, setIsZoomed] = useState(false)

  const pdfContainerRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map())
  const x = useMotionValue(0)
  const scale = useMotionValue(1)
  const panX = useMotionValue(0)
  const panY = useMotionValue(0)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const pageNumberRef = useRef(1)
  const scaleRef = useRef(1)

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

  // 줌 리셋
  const resetZoom = useCallback(() => {
    animate(scale, 1, { duration: 0.2 })
    animate(panX, 0, { duration: 0.2 })
    animate(panY, 0, { duration: 0.2 })
    scaleRef.current = 1
    setIsZoomed(false)
  }, [scale, panX, panY])

  const goToPrevPage = useCallback(() => {
    if (scaleRef.current > 1) resetZoom()
    setPageNumber((prev) => Math.max(prev - 1, 1))
  }, [resetZoom])

  const goToNextPage = useCallback(() => {
    if (numPages) {
      if (scaleRef.current > 1) resetZoom()
      setPageNumber((prev) => Math.min(prev + 1, numPages))
    }
  }, [numPages, resetZoom])

  // pageNumber 변경 시 ref 업데이트
  useEffect(() => {
    pageNumberRef.current = pageNumber
  }, [pageNumber])

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

  // 모든 제스처 통합 처리 (@use-gesture로 드래그 + 핀치 모두 관리)
  const bindGesture = useGesture(
    {
      onDrag: ({
        movement: [mx, my],
        velocity: [vx],
        first,
        last,
        memo,
        pinching,
        cancel,
      }) => {
        if (pinching) {
          cancel()
          return memo
        }

        // 드래그 시작 시 모드 결정
        if (first) {
          stopAnimation()
          const currentScale = scaleRef.current

          if (currentScale > 1) {
            memo = {
              startPanX: panX.get(),
              startPanY: panY.get(),
              mode: 'pan' as const,
            } satisfies DragMemo
          } else {
            memo = {
              startPanX: 0,
              startPanY: 0,
              mode: 'carousel' as const,
            } satisfies DragMemo
            setIsDragging(true)
          }
        }

        const typedMemo = memo as DragMemo
        if (!typedMemo) return memo

        // 팬 모드 (확대 상태에서 한 손가락 드래그)
        if (typedMemo.mode === 'pan') {
          const cw = containerWidth
          const ch = containerHeight || 400
          const maxPanX = (cw * (scaleRef.current - 1)) / 2
          const maxPanY = (ch * (scaleRef.current - 1)) / 2

          const newPanX = typedMemo.startPanX + mx
          const newPanY = typedMemo.startPanY + my

          // 가장자리에서 수평으로 더 드래그하면 캐루셀 모드로 전환
          const isHorizontalDrag = Math.abs(mx) > Math.abs(my) * 1.5
          if (
            isHorizontalDrag &&
            Math.abs(mx) > EDGE_PAN_THRESHOLD &&
            numPages &&
            numPages > 1
          ) {
            const atLeftEdge = typedMemo.startPanX >= maxPanX - 2 && mx > 0
            const atRightEdge = typedMemo.startPanX <= -maxPanX + 2 && mx < 0

            if (atLeftEdge || atRightEdge) {
              resetZoom()
              typedMemo.mode = 'carousel'
              setIsDragging(true)
            }
          }

          if (typedMemo.mode === 'pan') {
            panX.set(Math.min(maxPanX, Math.max(-maxPanX, newPanX)))
            panY.set(Math.min(maxPanY, Math.max(-maxPanY, newPanY)))
            return memo
          }
        }

        // 캐루셀 모드 (기본 상태에서 한 손가락 드래그)
        if (!numPages || numPages <= 1) return memo

        if (containerWidth <= 0) return memo

        const baseX = -(pageNumberRef.current - 1) * (containerWidth + GAP)
        x.set(baseX + mx)

        // 드래그 종료 시 페이지 결정
        if (last) {
          setIsDragging(false)

          if (Math.abs(mx) > DRAG_THRESHOLD || vx > 300) {
            if (mx > 0 && pageNumberRef.current > 1) {
              goToPrevPage()
            } else if (mx < 0 && pageNumberRef.current < numPages) {
              goToNextPage()
            } else {
              // 경계에서 드래그 - 원래 위치로 복귀
              const targetX =
                -(pageNumberRef.current - 1) * (containerWidth + GAP)
              animate(x, targetX, {
                duration: ANIMATION_DURATION,
                ease: ANIMATION_EASE,
              })
            }
          } else {
            // 드래그 거리가 짧으면 원래 위치로 복귀
            const targetX =
              -(pageNumberRef.current - 1) * (containerWidth + GAP)
            animate(x, targetX, {
              duration: ANIMATION_DURATION,
              ease: ANIMATION_EASE,
            })
          }
        }

        return memo
      },
      onPinch: ({ offset: [s] }) => {
        const clampedScale = Math.min(
          PINCH_SCALE_MAX,
          Math.max(PINCH_SCALE_MIN, s),
        )
        scale.set(clampedScale)
        scaleRef.current = clampedScale

        if (clampedScale > 1 && !isZoomed) {
          setIsZoomed(true)
        } else if (clampedScale <= 1 && isZoomed) {
          panX.set(0)
          panY.set(0)
          setIsZoomed(false)
        }
      },
      onPinchEnd: () => {
        if (scaleRef.current <= 1) {
          resetZoom()
        }
      },
    },
    {
      drag: {
        filterTaps: true,
        pointer: { touch: true },
      },
      pinch: {
        scaleBounds: { min: PINCH_SCALE_MIN, max: PINCH_SCALE_MAX },
        rubberband: true,
        from: () => [scaleRef.current, 0],
        pointer: { touch: true },
      },
    },
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
            overflow="hidden"
            bgColor="background.basic.1"
            cursor={
              isZoomed ? 'move'
              : isDragging ?
                'grabbing'
              : 'grab'
            }
            style={{ touchAction: 'none' }}
            {...bindGesture()}
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
                style={{ x }}
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
                        <MotionBox
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
                          style={
                            pageIndex === pageNumber ?
                              { scale, x: panX, y: panY }
                            : undefined
                          }
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
                        </MotionBox>
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
