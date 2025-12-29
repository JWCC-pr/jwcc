'use client'

import { useEffect, useRef, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { CaretUpIcon } from '@phosphor-icons/react'

import { AnimatePresence, motion } from 'motion/react'

import { ROUTES } from '@/constants/routes'
import {
  HomeQuickMenuSection1Icon,
  HomeQuickMenuSection2Icon,
  HomeQuickMenuSection3Icon,
  HomeQuickMenuSection4Icon,
  HomeQuickMenuSection5Icon,
  HomeQuickMenuSection6Icon,
} from '@/generated/icons/MyIcons'

const MotionCaretUpIcon = motion(CaretUpIcon)

const QuickMenuItems = [
  {
    icon: (
      <HomeQuickMenuSection1Icon
        w={['36px', '60px', '84px']}
        h={['36px', '60px', '84px']}
        p={['6px', '10px']}
        bgColor="#fff"
        rounded="8px"
      />
    ),
    label: 'WYD',
    value: `https://wydseoul.org`,
  },
  {
    icon: (
      <HomeQuickMenuSection2Icon
        w={['36px', '60px', '84px']}
        h={['36px', '60px', '84px']}
        p={['6px', '10px']}
        bgColor="#fff"
        rounded="8px"
      />
    ),
    label: '굿뉴스',
    value: `https://www.catholic.or.kr`,
  },
  {
    icon: (
      <HomeQuickMenuSection3Icon
        w={['36px', '60px', '84px']}
        h={['36px', '60px', '84px']}
        p={['6px', '10px']}
        bgColor="#fff"
        rounded="8px"
      />
    ),
    label: '예비신자 안내',
    value: ROUTES.SERVICES_CATECHUMEN,
  },
  {
    icon: (
      <HomeQuickMenuSection4Icon
        w={['36px', '60px', '84px']}
        h={['36px', '60px', '84px']}
        p={['6px', '10px']}
        bgColor="#fff"
        rounded="8px"
      />
    ),
    label: '혼인성사 예약 안내',
    value: ROUTES.SERVICES_MARRIAGE,
  },
  {
    icon: (
      <HomeQuickMenuSection5Icon
        w={['36px', '60px', '84px']}
        h={['36px', '60px', '84px']}
        p={['6px', '10px']}
        bgColor="#fff"
        rounded="8px"
      />
    ),
    label: '선종 안내',
    value: ROUTES.NEWS_PASSING_NOTICE,
  },
  {
    icon: (
      <HomeQuickMenuSection6Icon
        w={['36px', '60px', '84px']}
        h={['36px', '60px', '84px']}
        p={['6px', '10px']}
        bgColor="#fff"
        rounded="8px"
      />
    ),
    label: '오시는 길',
    value: ROUTES.ABOUT_DIRECTION,
  },
]

const MotionBox = motion(Box)

const QuickMenuSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [shouldCenter, setShouldCenter] = useState(true)
  const containerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const checkScroll = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const contentWidth = containerRef.current.scrollWidth
        setShouldCenter(contentWidth <= containerWidth)
      }
    }

    // 초기 체크 (렌더링 완료 후)
    requestAnimationFrame(() => {
      setTimeout(checkScroll, 0)
    })

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkScroll)

    // MutationObserver로 컨텐츠 변경 감지
    const observer = new MutationObserver(checkScroll)
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      })
    }

    return () => {
      window.removeEventListener('resize', checkScroll)
      observer.disconnect()
    }
  }, [isOpen])

  return (
    <Box position="fixed" bottom="0" left="0" right="0" zIndex="1">
      <AnimatePresence>
        {!isOpen && (
          <MotionBox
            key="collapsed"
            onClick={() => setIsOpen(true)}
            cursor="pointer"
            bgColor="primary.4"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="8px"
            p="6px 10px"
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            zIndex={1}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.2, delay: 0.1 },
            }}
          >
            <MotionCaretUpIcon
              size="16px"
              color="white"
              animate={{ rotate: 0 }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 300,
              }}
            />
            <Text color="grey.0" textStyle="cat-caption-1">
              Quick Menu
            </Text>
          </MotionBox>
        )}
        {isOpen && (
          <MotionBox
            key="expanded"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            bgColor="primary.4"
            position="relative"
            zIndex={2}
          >
            <Box
              onClick={() => setIsOpen(false)}
              cursor="pointer"
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="8px"
              p="6px 10px"
            >
              <MotionCaretUpIcon
                size="16px"
                color="white"
                animate={{ rotate: 180 }}
                transition={{
                  type: 'spring',
                  damping: 20,
                  stiffness: 300,
                }}
              />
              <Text color="grey.0" textStyle="cat-caption-1">
                Quick Menu
              </Text>
            </Box>

            <Box
              as="ul"
              ref={containerRef}
              h={['auto', '163px']}
              p="12px 40px"
              display={['grid', 'flex']}
              gridTemplateColumns={['repeat(3, 1fr)', 'initial']}
              alignItems="center"
              justifyContent={shouldCenter ? 'center' : 'flex-start'}
              gap={['0px', '0px', '10px']}
              overflowX="auto"
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {QuickMenuItems.map((item) => (
                <Link
                  href={item.value}
                  {...(item.value.startsWith('http') && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  })}
                  key={item.label}
                  flexShrink="0"
                  p="12px"
                  w={['full', '0px', '140px']}
                  flex={['initial', '1', 'initial']}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={['8px', '12px']}
                  rounded="8px"
                  _hover={{
                    bgColor: 'white-transparent.300',
                    textDecoration: 'none',
                  }}
                >
                  {item.icon}
                  <Text
                    color="grey.0"
                    textStyle="pre-caption-1"
                    whiteSpace="nowrap"
                  >
                    {item.label}
                  </Text>
                </Link>
              ))}
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default QuickMenuSection
