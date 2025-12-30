'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { IconButton } from '@chakra-ui/react/button'
import { Image } from '@chakra-ui/react/image'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

import { animate, motion, useMotionValue } from 'motion/react'

import { LiturgyFlowerType } from '@/generated/apis/@types/data-contracts'

const MotionBox = motion(Box)

const ANIMATION_DURATION = 0.3
const ANIMATION_EASE = [0.4, 0, 0.2, 1] as const
const DRAG_THRESHOLD_RATIO = 0.25 // 25%
const DRAG_VELOCITY_THRESHOLD = 300
const DRAG_ELASTIC = 0.1

interface NewsLiturgyFlowerDetailBodySectionProps {
  liturgyFlower: Pick<LiturgyFlowerType, 'imageSet'>
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
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const isJumpingRef = useRef(false)
  const isDraggingRef = useRef(false)
  const currentIndexRef = useRef(FIRST_INDEX)

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
          // 컨테이너 크기가 아직 계산되지 않았으면 다음 프레임에 재시도
          rafId = requestAnimationFrame(initializePosition)
        } else {
          // 최대 재시도 횟수에 도달했으면 강제로 초기화
          setIsInitialized(true)
        }
        return
      }
      x.set(-FIRST_INDEX * containerWidth)
      setIsInitialized(true)
    }

    // 초기화 시도
    initializePosition()

    // ResizeObserver로 컨테이너 크기 변경 감지
    const container = imageContainerRef.current
    if (!container) {
      if (rafId) cancelAnimationFrame(rafId)
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      const containerWidth = getContainerWidth()
      if (containerWidth) {
        // 크기가 변경되었을 때 현재 인덱스에 맞게 위치 조정
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

    // 끝에 도달했을 때 처음으로 점프
    if (currentIndex >= extendedTotal - 1) {
      jumpToFirst()
      return
    }

    // 처음 이전으로 갔을 때 마지막으로 점프
    if (currentIndex <= 0) {
      jumpToLast()
      return
    }

    // 정상적인 슬라이드 이동
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

  const goToNext = useCallback(() => {
    if (totalImages <= 1) return
    setCurrentIndex((prev) => {
      const next = prev + 1
      if (next >= extendedTotal - 1) {
        jumpToFirst(true)
        return extendedTotal - 1
      }
      return next
    })
  }, [totalImages, extendedTotal, jumpToFirst])

  const goToPrev = useCallback(() => {
    if (totalImages <= 1) return
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1
      if (prevIndex <= 0) {
        jumpToLast(true)
        return 0
      }
      return prevIndex
    })
  }, [totalImages, jumpToLast])

  const handleDragStart = useCallback(() => {
    if (totalImages <= 1) return
    setIsDragging(true)
    isDraggingRef.current = true
    stopAnimation()
  }, [totalImages, stopAnimation])

  const handleDrag = useCallback(() => {
    if (totalImages <= 1) return
    const containerWidth = getContainerWidth()
    if (!containerWidth) return

    const currentX = x.get()
    const currentPosition = -currentX / containerWidth

    if (currentPosition >= extendedTotal - 1) {
      jumpToFirst()
    } else if (currentPosition <= 0) {
      jumpToLast()
    }
  }, [
    totalImages,
    extendedTotal,
    x,
    getContainerWidth,
    jumpToFirst,
    jumpToLast,
  ])

  const handleDragEnd = useCallback(
    (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: { offset: { x: number }; velocity: { x: number } },
    ) => {
      if (totalImages <= 1) return

      const containerWidth = getContainerWidth()
      if (!containerWidth) return

      setIsDragging(false)
      isDraggingRef.current = false

      // 점프 중이면 처리하지 않음
      if (isJumpingRef.current) {
        return
      }

      const threshold = containerWidth * DRAG_THRESHOLD_RATIO

      // 드래그 거리나 속도가 임계값을 넘으면 슬라이드 변경
      if (
        Math.abs(info.offset.x) > threshold ||
        Math.abs(info.velocity.x) > DRAG_VELOCITY_THRESHOLD
      ) {
        if (info.offset.x > 0) {
          goToPrev()
        } else {
          goToNext()
        }
      } else {
        // 원래 위치로 복귀
        stopAnimation()
        const targetX = -currentIndex * containerWidth
        animationRef.current = animate(x, targetX, {
          duration: 0.2,
          ease: ANIMATION_EASE,
        })
      }
    },
    [
      totalImages,
      getContainerWidth,
      currentIndex,
      x,
      goToPrev,
      goToNext,
      stopAnimation,
    ],
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
            }}
          >
            <MotionBox
              display="flex"
              w={`${extendedTotal * 100}%`}
              h="100%"
              style={{ x }}
              drag={totalImages > 1 ? 'x' : false}
              dragElastic={DRAG_ELASTIC}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              whileDrag={{ cursor: 'grabbing' }}
              cursor={totalImages > 1 ? 'grab' : 'default'}
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
                  <Image
                    src={image.image}
                    alt="미사꽃 이미지"
                    maxW="100%"
                    maxH="100%"
                    objectFit="contain"
                    draggable={false}
                    userSelect="none"
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
