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

  // 초기 위치 설정
  useEffect(() => {
    const containerWidth = getContainerWidth()
    if (!containerWidth) return
    x.set(-FIRST_INDEX * containerWidth)
    setIsInitialized(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      py="20px"
      display="flex"
      flexDirection="column"
      gap="10px"
      bgColor="background.basic.2"
    >
      <Box
        ref={containerRef}
        maxW="800px"
        mx="auto"
        display="flex"
        alignItems="center"
        gap="12px"
        aspectRatio="16/9"
      >
        {totalImages > 1 && (
          <IconButton
            size="lg"
            variant="outline"
            colorPalette="grey"
            rounded="8px"
            onClick={goToPrev}
            aria-label="이전 이미지"
          >
            <CaretLeftIcon size="24px" />
          </IconButton>
        )}

        <Box
          ref={imageContainerRef}
          flex="1"
          position="relative"
          overflow="hidden"
          rounded="6px"
          aspectRatio="16/9"
          style={{
            opacity: isInitialized ? 1 : 0,
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

        {totalImages > 1 && (
          <IconButton
            size="lg"
            variant="outline"
            colorPalette="grey"
            rounded="8px"
            onClick={goToNext}
            aria-label="다음 이미지"
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
