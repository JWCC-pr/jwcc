'use client'

import { useCallback, useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react/box'

import { motion } from 'motion/react'

import Footer from '@/components/@layout/footer/footer'
import { SECTION_IDS } from '@/constants/section'
import { useIsBreakpoint } from '@/hooks/use-is-breakpoint'
import { useScrolled } from '@/hooks/useScrolled'

import CarouselSection from './sections/carousel-section'
import MobileSectionWrapper from './sections/mobile-section-wrapper'
import BulletinSection from './sections/news-bulletin-section/bulletin-section'
import NewsBulletinSection from './sections/news-bulletin-section/news-bulletin-section'
import NewsSection from './sections/news-bulletin-section/news-section'
import MassSection from './sections/notice-and-mass-section/mass-section'
import NoticeAndMassSection from './sections/notice-and-mass-section/notice-and-mass-section'
import NoticeSection from './sections/notice-and-mass-section/notice-section'
import ScheduleSection from './sections/schedule-section'

const MotionBox = motion(Box)

const HomePage: React.FC = () => {
  const { setHasScrolled } = useScrolled()
  const containerRef = useRef<HTMLDivElement>(null)
  const isDesktopBreakpoint = useIsBreakpoint('min', 1280) // 1280px 이상
  const isTabletBreakpoint = useIsBreakpoint('min', 768) // 768px 이상
  const isMobileBreakpoint = useIsBreakpoint('max', 767) // 767px 이하

  // 정확한 브레이크포인트 구분
  const isDesktop = isDesktopBreakpoint
  const isTablet = !isDesktopBreakpoint && isTabletBreakpoint
  const isMobile = isMobileBreakpoint

  // 특정 섹션으로 스크롤하는 함수
  const scrollToSection = useCallback((sectionId: string) => {
    const container = containerRef.current
    if (!container) return

    const section = container.querySelector(`#${sectionId}`) as HTMLElement
    if (!section) return

    // scrollIntoView를 사용하여 섹션으로 스크롤
    // smooth 옵션은 scrollSnap과 함께 사용하면 부드러운 스크롤이 가능합니다
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  // URL 해시 변경 감지 및 스크롤 처리
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // # 제거
      if (hash) {
        // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 스크롤
        setTimeout(() => {
          scrollToSection(hash)
        }, 100)
      }
    }

    // 초기 로드 시 해시가 있으면 스크롤
    handleHashChange()

    // 해시 변경 이벤트 리스너
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [scrollToSection])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      if (container.scrollTop > 0) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [setHasScrolled])

  return (
    <MotionBox
      as="section"
      w="100%"
      h="100vh"
      overflowY="scroll"
      ref={containerRef}
      css={{
        scrollSnapType: 'y mandatory',
        WebkitOverflowScrolling: 'touch',
        '& > *': {
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
        },
      }}
    >
      <Box id={SECTION_IDS.CAROUSEL} as="div">
        <CarouselSection />
      </Box>

      {isDesktop && (
        <>
          <Box id={SECTION_IDS.NOTICE_MASS} as="div">
            <NoticeAndMassSection />
          </Box>
          <Box id={SECTION_IDS.NEWS_BULLETIN} as="div">
            <NewsBulletinSection />
          </Box>
        </>
      )}

      {isTablet && (
        <>
          <Box id={SECTION_IDS.NOTICE} as="div">
            <MobileSectionWrapper>
              <NoticeSection />
            </MobileSectionWrapper>
          </Box>
          <Box id={SECTION_IDS.MASS} as="div">
            <MobileSectionWrapper>
              <MassSection />
            </MobileSectionWrapper>
          </Box>
          <Box id={SECTION_IDS.NEWS_BULLETIN} as="div">
            <NewsBulletinSection />
          </Box>
        </>
      )}

      {isMobile && (
        <>
          <Box id={SECTION_IDS.NOTICE} as="div">
            <MobileSectionWrapper>
              <NoticeSection />
            </MobileSectionWrapper>
          </Box>
          <Box id={SECTION_IDS.MASS} as="div">
            <MobileSectionWrapper>
              <MassSection />
            </MobileSectionWrapper>
          </Box>
          <Box id={SECTION_IDS.NEWS} as="div">
            <MobileSectionWrapper>
              <NewsSection />
            </MobileSectionWrapper>
          </Box>
          <Box id={SECTION_IDS.BULLETIN} as="div">
            <MobileSectionWrapper>
              <BulletinSection />
            </MobileSectionWrapper>
          </Box>
        </>
      )}

      <Box id={SECTION_IDS.SCHEDULE} as="div">
        <ScheduleSection />
      </Box>

      <Footer />
    </MotionBox>
  )
}

export default HomePage
