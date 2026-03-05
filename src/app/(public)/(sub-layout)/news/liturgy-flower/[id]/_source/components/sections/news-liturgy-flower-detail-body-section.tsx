'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Image } from '@chakra-ui/react/image'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { useGesture } from '@use-gesture/react'

import { animate, motion, useMotionValue } from 'motion/react'

import { LiturgyFlowerType } from '@/generated/apis/@types/data-contracts'

const MotionBox = motion(Box)
const MotionImage = motion(Image)

const ANIMATION_DURATION = 0.3
const ANIMATION_EASE = [0.4, 0, 0.2, 1] as const
const DRAG_THRESHOLD_RATIO = 0.25 // 25%
const DRAG_VELOCITY_THRESHOLD = 300
const PINCH_SCALE_MIN = 1
const PINCH_SCALE_MAX = 4
const EDGE_PAN_THRESHOLD = 50

interface NewsLiturgyFlowerDetailBodySectionProps {
  liturgyFlower: Pick<LiturgyFlowerType, 'imageSet'>
}

type DragMemo = {
  startPanX: number
  startPanY: number
  mode: 'carousel' | 'pan'
}

const NewsLiturgyFlowerDetailBodySection: React.FC<
  NewsLiturgyFlowerDetailBodySectionProps
> = ({ liturgyFlower }) => {
  const images = useMemo(
    () => liturgyFlower.imageSet || [],
    [liturgyFlower.imageSet],
  )
  const totalImages = images.length

  const extendedImages = useMemo(() => {
    if (totalImages <= 1) return images
    return [images[images.length - 1], ...images, images[0]]
  }, [images, totalImages])

  const extendedTotal = extendedImages.length
  const FIRST_INDEX = totalImages > 1 ? 1 : 0
  const LAST_INDEX = totalImages > 1 ? extendedTotal - 2 : 0

  const [currentIndex, setCurrentIndex] = useState(FIRST_INDEX)
  const [isDragging, setIsDragging] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const x = useMotionValue(0)
  const scale = useMotionValue(1)
  const panX = useMotionValue(0)
  const panY = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const isJumpingRef = useRef(false)
  const isDraggingRef = useRef(false)
  const currentIndexRef = useRef(FIRST_INDEX)
  const scaleRef = useRef(1)

  const showIndex = useMemo(() => {
    if (totalImages <= 1) return 1
    if (currentIndex <= FIRST_INDEX) return FIRST_INDEX
    if (currentIndex >= totalImages + 1) return totalImages
    return currentIndex
  }, [currentIndex, totalImages, FIRST_INDEX])

  // 컨테이너 너비 가져오기
  const getContainerWidth = useCallback(() => {
    return imageContainerRef.current?.offsetWidth ?? 0
  }, [])

  // 애니메이션 중지
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop()
      animationRef.current = null
    }
  }, [])

  // 끝에서 처음으로 점프
  const jumpToFirst = useCallback(
    (withAnimation = false) => {
      if (totalImages <= 1) return
      const containerWidth = getContainerWidth()
      if (!containerWidth) return

      isJumpingRef.current = true

      if (withAnimation) {
        animate(x, -(extendedTotal - 1) * containerWidth, {
          duration: ANIMATION_DURATION,
          ease: ANIMATION_EASE,
        }).then(() => {
          x.set(-FIRST_INDEX * containerWidth)
          setCurrentIndex(FIRST_INDEX)
          isJumpingRef.current = false
        })
      } else {
        x.set(-FIRST_INDEX * containerWidth)
        setTimeout(() => {
          setCurrentIndex(FIRST_INDEX)
          isJumpingRef.current = false
        }, 0)
      }
    },
    [totalImages, extendedTotal, x, getContainerWidth, FIRST_INDEX],
  )

  // 처음에서 마지막으로 점프
  const jumpToLast = useCallback(
    (withAnimation = false) => {
      if (totalImages <= 1) return
      const containerWidth = getContainerWidth()
      if (!containerWidth) return

      isJumpingRef.current = true

      if (withAnimation) {
        animate(x, 0, {
          duration: ANIMATION_DURATION,
          ease: ANIMATION_EASE,
        }).then(() => {
          x.set(-LAST_INDEX * containerWidth)
          setCurrentIndex(LAST_INDEX)
          isJumpingRef.current = false
        })
      } else {
        x.set(-LAST_INDEX * containerWidth)
        setTimeout(() => {
          setCurrentIndex(LAST_INDEX)
          isJumpingRef.current = false
        }, 0)
      }
    },
    [totalImages, x, getContainerWidth, LAST_INDEX],
  )

  // 초기 위치 설정 및 컨테이너 크기 감지
  useEffect(() => {
    let rafId: number | null = null
    let retryCount = 0
    const MAX_RETRIES = 10

    const initializePosition = () => {
      const containerWidth = getContainerWidth()
      if (!containerWidth) {
        retryCount++
        if (retryCount < MAX_RETRIES) {
          rafId = requestAnimationFrame(initializePosition)
        } else {
          setIsInitialized(true)
        }
        return
      }
      x.set(-FIRST_INDEX * containerWidth)
      setIsInitialized(true)
    }

    initializePosition()

    const container = imageContainerRef.current
    if (!container) {
      if (rafId) cancelAnimationFrame(rafId)
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      const containerWidth = getContainerWidth()
      if (containerWidth) {
        if (!isDraggingRef.current && !isJumpingRef.current) {
          const targetX = -currentIndexRef.current * containerWidth
          x.set(targetX)
        }
        if (!isInitialized) {
          setIsInitialized(true)
        }
      }
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // currentIndex 변경 시 ref 업데이트
  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  // 인덱스 변경 시 애니메이션 (드래그 중이 아닐 때만)
  useEffect(() => {
    if (!containerRef.current || isDragging || isJumpingRef.current) return

    const containerWidth = getContainerWidth()
    if (!containerWidth) return

    if (totalImages <= 1) {
      x.set(0)
      return
    }

    if (currentIndex >= extendedTotal - 1) {
      jumpToFirst()
      return
    }

    if (currentIndex <= 0) {
      jumpToLast()
      return
    }

    stopAnimation()
    const targetX = -currentIndex * containerWidth
    animationRef.current = animate(x, targetX, {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASE,
    })
  }, [
    currentIndex,
    x,
    isDragging,
    extendedTotal,
    totalImages,
    getContainerWidth,
    jumpToFirst,
    jumpToLast,
    stopAnimation,
  ])

  // 줌 리셋
  const resetZoom = useCallback(() => {
    animate(scale, 1, { duration: 0.2 })
    animate(panX, 0, { duration: 0.2 })
    animate(panY, 0, { duration: 0.2 })
    scaleRef.current = 1
    setIsZoomed(false)
  }, [scale, panX, panY])

  const goToNext = useCallback(() => {
    if (totalImages <= 1) return
    if (scaleRef.current > 1) resetZoom()
    setCurrentIndex((prev) => {
      const next = prev + 1
      if (next >= extendedTotal - 1) {
        jumpToFirst(true)
        return extendedTotal - 1
      }
      return next
    })
  }, [totalImages, extendedTotal, jumpToFirst, resetZoom])

  const goToPrev = useCallback(() => {
    if (totalImages <= 1) return
    if (scaleRef.current > 1) resetZoom()
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1
      if (prevIndex <= 0) {
        jumpToLast(true)
        return 0
      }
      return prevIndex
    })
  }, [totalImages, jumpToLast, resetZoom])

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
            // 확대 상태 → 팬 모드
            memo = {
              startPanX: panX.get(),
              startPanY: panY.get(),
              mode: 'pan' as const,
            } satisfies DragMemo
          } else {
            // 기본 상태 → 캐루셀 모드
            memo = {
              startPanX: 0,
              startPanY: 0,
              mode: 'carousel' as const,
            } satisfies DragMemo
            setIsDragging(true)
            isDraggingRef.current = true
          }
        }

        const typedMemo = memo as DragMemo
        if (!typedMemo) return memo

        // 팬 모드 (확대 상태에서 한 손가락 드래그)
        if (typedMemo.mode === 'pan') {
          const containerWidth = getContainerWidth()
          const containerHeight = imageContainerRef.current?.offsetHeight ?? 0
          const maxPanX = (containerWidth * (scaleRef.current - 1)) / 2
          const maxPanY = (containerHeight * (scaleRef.current - 1)) / 2

          const newPanX = typedMemo.startPanX + mx
          const newPanY = typedMemo.startPanY + my

          // 가장자리에서 수평으로 더 드래그하면 캐루셀 모드로 전환
          const isHorizontalDrag = Math.abs(mx) > Math.abs(my) * 1.5
          if (
            isHorizontalDrag &&
            Math.abs(mx) > EDGE_PAN_THRESHOLD &&
            totalImages > 1
          ) {
            const atLeftEdge = typedMemo.startPanX >= maxPanX - 2 && mx > 0
            const atRightEdge = typedMemo.startPanX <= -maxPanX + 2 && mx < 0

            if (atLeftEdge || atRightEdge) {
              // 줌 리셋 후 캐루셀 모드로 전환
              resetZoom()
              typedMemo.mode = 'carousel'
              setIsDragging(true)
              isDraggingRef.current = true
            }
          }

          if (typedMemo.mode === 'pan') {
            panX.set(Math.min(maxPanX, Math.max(-maxPanX, newPanX)))
            panY.set(Math.min(maxPanY, Math.max(-maxPanY, newPanY)))
            return memo
          }
        }

        // 캐루셀 모드 (기본 상태에서 한 손가락 드래그)
        if (totalImages <= 1) return memo

        const containerWidth = getContainerWidth()
        if (!containerWidth) return memo

        const baseX = -currentIndexRef.current * containerWidth
        x.set(baseX + mx)

        // 무한 루프 래핑
        const currentX = x.get()
        const currentPosition = -currentX / containerWidth
        if (currentPosition >= extendedTotal - 1) {
          jumpToFirst()
        } else if (currentPosition <= 0) {
          jumpToLast()
        }

        // 드래그 종료 시 슬라이드 결정
        if (last) {
          setIsDragging(false)
          isDraggingRef.current = false

          if (!isJumpingRef.current) {
            const threshold = containerWidth * DRAG_THRESHOLD_RATIO

            if (Math.abs(mx) > threshold || vx > DRAG_VELOCITY_THRESHOLD) {
              if (mx > 0) goToPrev()
              else goToNext()
            } else {
              // 원래 위치로 복귀
              stopAnimation()
              const targetX = -currentIndexRef.current * containerWidth
              animationRef.current = animate(x, targetX, {
                duration: 0.2,
                ease: ANIMATION_EASE,
              })
            }
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

  if (totalImages === 0) return null

  const displayIndex = totalImages <= 1 ? 1 : showIndex

  return (
    <Box
      py="24px"
      display="flex"
      flexDirection="column"
      gap="10px"
      bgColor="background.basic.2"
    >
      <Box
        ref={containerRef}
        maxW="800px"
        mx="auto"
        px="12px"
        display="flex"
        alignItems="center"
        gap="12px"
        w="100%"
      >
        {totalImages > 1 && (
          <IconButton
            size="lg"
            variant="outline"
            colorPalette="grey"
            display={['none', 'flex']}
            rounded="8px"
            onClick={goToPrev}
            aria-label="이전 이미지"
            flexShrink={0}
          >
            <CaretLeftIcon size="24px" />
          </IconButton>
        )}

        <Box
          flex="1"
          w="100%"
          position="relative"
          style={{
            paddingBottom: '56.25%', // 16:9 비율
          }}
        >
          <Box
            ref={imageContainerRef}
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            overflow="hidden"
            rounded="6px"
            style={{
              opacity: isInitialized ? 1 : 0,
              transition: isInitialized ? 'opacity 0.2s ease-in-out' : 'none',
              touchAction: 'none',
            }}
            {...bindGesture()}
          >
            <MotionBox
              display="flex"
              w={`${extendedTotal * 100}%`}
              h="100%"
              style={{ x }}
              cursor={
                isZoomed ? 'move'
                : totalImages > 1 ?
                  'grab'
                : 'default'
              }
            >
              {extendedImages.map((image, index) => (
                <Box
                  key={`${image.id}-${index}`}
                  w={`${100 / extendedTotal}%`}
                  h="100%"
                  flexShrink={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <MotionImage
                    src={image.image}
                    alt="미사꽃 이미지"
                    maxW="100%"
                    maxH="100%"
                    objectFit="contain"
                    draggable={false}
                    userSelect="none"
                    style={
                      index === currentIndex ?
                        { scale, x: panX, y: panY }
                      : undefined
                    }
                  />
                </Box>
              ))}
            </MotionBox>
          </Box>
        </Box>

        {totalImages > 1 && (
          <IconButton
            size="lg"
            variant="outline"
            colorPalette="grey"
            display={['none', 'flex']}
            rounded="8px"
            onClick={goToNext}
            aria-label="다음 이미지"
            flexShrink={0}
          >
            <CaretRightIcon size="24px" />
          </IconButton>
        )}
      </Box>

      {totalImages > 1 && (
        <Box
          alignSelf="center"
          w="fit-content"
          p="2px 8px"
          rounded="4px"
          bgColor="background.basic.4"
          textStyle="pre-caption-2"
          color="grey.8"
        >
          {displayIndex}/{totalImages}
        </Box>
      )}
    </Box>
  )
}

export default NewsLiturgyFlowerDetailBodySection
