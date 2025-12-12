'use client'

import { Box } from '@chakra-ui/react/box'

import { motion } from 'motion/react'

import CarouselSection from './sections/carousel-section'
import NewsBulletinSection from './sections/news-bulletin-section/news-bulletin-section'
import NoticeAndMassSection from './sections/notice-and-mass-section/notice-and-mass-section'
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
      <NewsBulletinSection />
      <ScheduleSection />
    </MotionBox>
  )
}

export default HomePage
