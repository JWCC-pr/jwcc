'use client'

import { useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react/box'

import { motion } from 'motion/react'

import Footer from '@/components/@layout/footer/footer'
import { useScrolled } from '@/hooks/useScrolled'

import CarouselSection from './sections/carousel-section'
import NewsBulletinSection from './sections/news-bulletin-section/news-bulletin-section'
import NoticeAndMassSection from './sections/notice-and-mass-section/notice-and-mass-section'
import ScheduleSection from './sections/schedule-section'

const MotionBox = motion(Box)

const HomePage: React.FC = () => {
  const { setHasScrolled } = useScrolled()
  const containerRef = useRef<HTMLDivElement>(null)

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
      <NoticeAndMassSection />
      <NewsBulletinSection />
      <ScheduleSection />

      <Footer />
    </MotionBox>
  )
}

export default HomePage
