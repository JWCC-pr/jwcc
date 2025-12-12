'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import {
  CaretLeftIcon,
  CaretRightIcon,
  HeadsetIcon,
  PauseIcon,
  PlayIcon,
} from '@phosphor-icons/react'

import { animate, motion, useMotionValue } from 'motion/react'

const MotionBox = motion(Box)
const MotionImage = motion(Image)

const imageSrcs = [
  '/images/home/1.jpg',
  '/images/home/2.jpg',
  '/images/home/3.jpg',
  '/images/home/4.jpg',
  '/images/home/5.jpg',
]

const AUTO_SWIPE_INTERVAL = 5000 // 5초
const ANIMATION_DURATION = 0.5
const ANIMATION_EASE = [0.4, 0, 0.2, 1] as const
const DRAG_THRESHOLD_RATIO = 0.25 // 25%
const DRAG_VELOCITY_THRESHOLD = 300
const DRAG_ELASTIC = 0.2

const CarouselSection: React.FC = () => {
  // 무한 루프를 위해 이미지 배열 복제: [마지막, ...원본, 첫번째]
  const extendedImages = useMemo(
    () => [imageSrcs[imageSrcs.length - 1], ...imageSrcs, imageSrcs[0]],
    [],
  )
  const extendedTotal = extendedImages.length
  const FIRST_INDEX = 1
  const LAST_INDEX = extendedTotal - 2

  // 실제 인덱스는 1부터 시작 (복제된 배열의 중간 부분)
  const [currentIndex, setCurrentIndex] = useState(FIRST_INDEX)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoSwipeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const isJumpingRef = useRef(false)

  const showIndex = useMemo(() => {
    if (currentIndex <= FIRST_INDEX) return FIRST_INDEX
    if (currentIndex >= imageSrcs.length) return imageSrcs.length
    return currentIndex
  }, [currentIndex])

  // 컨테이너 너비 가져오기
  const getContainerWidth = useCallback(() => {
    return containerRef.current?.offsetWidth ?? 0
  }, [])

  // 애니메이션 중지
  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop()
      animationRef.current = null
    }
  }, [])

  // 자동 스와이프 타이머 정리
  const clearAutoSwipeTimer = useCallback(() => {
    if (autoSwipeTimerRef.current) {
      clearInterval(autoSwipeTimerRef.current)
      autoSwipeTimerRef.current = null
    }
  }, [])

  // 자동 스와이프 시작
  const startAutoSwipe = useCallback(() => {
    clearAutoSwipeTimer()

    if (!isPlaying || isDragging) return

    autoSwipeTimerRef.current = setInterval(() => {
      if (!containerRef.current) return

      const containerWidth = getContainerWidth()
      setCurrentIndex((prev) => {
        const next = prev + 1
        if (next >= extendedTotal - 1) {
          isJumpingRef.current = true
          animate(x, -(extendedTotal - 1) * containerWidth, {
            duration: ANIMATION_DURATION,
            ease: ANIMATION_EASE,
          }).then(() => {
            x.set(-FIRST_INDEX * containerWidth)
            setCurrentIndex(FIRST_INDEX)
            isJumpingRef.current = false
          })
          return extendedTotal - 1
        }
        return next
      })
    }, AUTO_SWIPE_INTERVAL)
  }, [
    isPlaying,
    isDragging,
    extendedTotal,
    x,
    getContainerWidth,
    clearAutoSwipeTimer,
  ])

  // 끝에서 처음으로 점프
  const jumpToFirst = useCallback(
    (withAnimation = false) => {
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
    [extendedTotal, x, getContainerWidth],
  )

  // 처음에서 마지막으로 점프
  const jumpToLast = useCallback(
    (withAnimation = false) => {
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
    [x, getContainerWidth, LAST_INDEX],
  )

  // 자동 스와이프
  useEffect(() => {
    startAutoSwipe()
    return clearAutoSwipeTimer
  }, [startAutoSwipe, clearAutoSwipeTimer])

  // 초기 위치 설정
  useEffect(() => {
    const containerWidth = getContainerWidth()
    if (!containerWidth) return
    x.set(-currentIndex * containerWidth)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 인덱스 변경 시 애니메이션 (드래그 중이 아닐 때만)
  useEffect(() => {
    if (!containerRef.current || isDragging || isJumpingRef.current) return

    const containerWidth = getContainerWidth()
    if (!containerWidth) return

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
    getContainerWidth,
    jumpToFirst,
    jumpToLast,
    stopAnimation,
  ])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + 1
      if (next >= extendedTotal - 1) {
        jumpToFirst(true)
        return extendedTotal - 1
      }
      return next
    })
  }, [extendedTotal, jumpToFirst])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1
      if (prevIndex <= 0) {
        jumpToLast(true)
        return 0
      }
      return prevIndex
    })
  }, [jumpToLast])

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
    clearAutoSwipeTimer()
    stopAnimation()
  }, [clearAutoSwipeTimer, stopAnimation])

  const handleDrag = useCallback(() => {
    const containerWidth = getContainerWidth()
    if (!containerWidth) return

    const currentX = x.get()
    const currentPosition = -currentX / containerWidth

    if (currentPosition >= extendedTotal - 1) {
      jumpToFirst()
    } else if (currentPosition <= 0) {
      jumpToLast()
    }
  }, [extendedTotal, x, getContainerWidth, jumpToFirst, jumpToLast])

  const handleDragEnd = useCallback(
    (
      _: MouseEvent | TouchEvent | PointerEvent,
      info: { offset: { x: number }; velocity: { x: number } },
    ) => {
      const containerWidth = getContainerWidth()
      if (!containerWidth) return

      setIsDragging(false)

      // 점프 중이면 자동 스와이프만 재개
      if (isJumpingRef.current) {
        if (isPlaying) {
          startAutoSwipe()
        }
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
          duration: 0.3,
          ease: ANIMATION_EASE,
        })
      }

      // 드래그 종료 후 자동 스와이프 재개
      if (isPlaying) {
        startAutoSwipe()
      }
    },
    [
      getContainerWidth,
      isPlaying,
      currentIndex,
      x,
      goToPrev,
      goToNext,
      stopAnimation,
      startAutoSwipe,
    ],
  )

  return (
    <MotionBox
      as="figure"
      w="100%"
      h="100vh"
      position="relative"
      overflow="hidden"
      flexShrink={0}
      ref={containerRef}
    >
      <MotionBox
        display="flex"
        w={`${extendedTotal * 100}%`}
        h="100%"
        style={{ x }}
        drag="x"
        dragElastic={DRAG_ELASTIC}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileDrag={{ cursor: 'grabbing' }}
        cursor="grab"
      >
        {extendedImages.map((imageSrc, index) => (
          <MotionImage
            key={`${imageSrc}-${index}`}
            src={imageSrc}
            alt={`${index + 1}번째 메인페이지 배경이미지`}
            w={`${100 / extendedTotal}%`}
            h="100%"
            objectFit="cover"
            objectPosition="center"
            display="block"
            flexShrink={0}
            draggable={false}
            userSelect="none"
          />
        ))}
      </MotionBox>

      <Box
        position="absolute"
        inset="0"
        display="flex"
        justifyContent="center"
        flexFlow="column nowrap"
        gap="64px"
        px="40px"
        pointerEvents="none"
      >
        <Box display="flex" flexFlow="column nowrap" gap="16px">
          <Box display="flex" flexFlow="column nowrap" gap="6px">
            <Text textStyle="pre-body-6" color="grey.0">
              2025년 본당 사목목표
            </Text>
            <Text textStyle="cat-display-2" color="grey.0">
              희망의 순례자,
              <br />
              길을 나서며
            </Text>
          </Box>
          <Text textStyle="cat-body-4" color="white-transparent.600">
            1947년에 설립된 잠원동성당은 서울 강남·서초 지역에서 가장 오래된
            성당으로,
            <br />
            오랜 시간 신앙의 중심지 역할을 해왔습니다.
          </Text>
        </Box>
        <Link
          href="https://missa.cbck.or.kr/DailyMissa"
          target="_blank"
          rel="noopener noreferrer"
          flexShrink="0"
          w="160px"
          h="48px"
          display="flex"
          flexFlow="row nowrap"
          gap="8px"
          alignItems="center"
          justifyContent="center"
          px="28px"
          rounded="full"
          border="1px solid"
          borderColor="white-transparent.300"
          bgColor="white-transparent.200"
          backdropFilter="blur(10px)"
          pointerEvents="auto"
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text textStyle="pre-body-3" color="grey.0">
            매일 미사
          </Text>
          <HeadsetIcon size="24px" fill="#fff" />
        </Link>
        <Box
          w="fit-content"
          display="flex"
          gap="24px"
          alignItems="center"
          pointerEvents="auto"
        >
          <Box display="flex" flexFlow="row nowrap">
            {Array.from({ length: imageSrcs.length }).map((_, index) => (
              <Box
                key={index}
                w="40px"
                h="3px"
                bgColor={showIndex > index ? 'grey.0' : 'white-transparent.400'}
              />
            ))}
          </Box>
          <Text textStyle="pre-body-6" color="grey.0">
            {showIndex}/{imageSrcs.length}
          </Text>
          <Box display="flex" gap="8px" alignItems="center">
            <CaretLeftIcon
              size="20px"
              color="#fff"
              cursor="pointer"
              onClick={goToPrev}
            />
            <Box cursor="pointer" onClick={togglePlayPause}>
              {isPlaying ?
                <PauseIcon size="16px" weight="fill" color="#fff" />
              : <PlayIcon size="16px" weight="fill" color="#fff" />}
            </Box>
            <CaretRightIcon
              size="20px"
              color="#fff"
              cursor="pointer"
              onClick={goToNext}
            />
          </Box>
        </Box>
      </Box>
    </MotionBox>
  )
}

export default CarouselSection
