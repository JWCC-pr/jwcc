'use client'

import { useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react/box'

import { motion } from 'motion/react'

import Footer from '@/components/@layout/footer/footer'
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
      <CarouselSection />

      {isDesktop && (
        <>
          <NoticeAndMassSection />
          <NewsBulletinSection />
        </>
      )}

      {isTablet && (
        <>
          <MobileSectionWrapper>
            <NoticeSection />
          </MobileSectionWrapper>
          <MobileSectionWrapper>
            <MassSection />
          </MobileSectionWrapper>
          <NewsBulletinSection />
        </>
      )}

      {isMobile && (
        <>
          <MobileSectionWrapper>
            <NoticeSection />
          </MobileSectionWrapper>
          <MobileSectionWrapper>
            <MassSection />
          </MobileSectionWrapper>
          <MobileSectionWrapper>
            <NewsSection />
          </MobileSectionWrapper>
          <MobileSectionWrapper>
            <BulletinSection />
          </MobileSectionWrapper>
        </>
      )}

      <ScheduleSection />

      <Footer />
    </MotionBox>
  )
}

export default HomePage
