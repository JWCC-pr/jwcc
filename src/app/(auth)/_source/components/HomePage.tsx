'use client'

import { Box } from '@chakra-ui/react/box'

import { motion } from 'motion/react'

import CarouselSection from './sections/carousel-section'
import ChurchNewsSection from './sections/church-news-section'
import NoticeAndMassSection from './sections/notice-and-mass-section'
import ScheduleSection from './sections/schedule-section'

const MotionBox = motion(Box)

const HomePage: React.FC = () => {
  return (
    <MotionBox
      as="section"
      w="100%"
      h="100vh"
      overflowY="scroll"
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
      <ChurchNewsSection />
      <ScheduleSection />
    </MotionBox>
  )
}

export default HomePage
