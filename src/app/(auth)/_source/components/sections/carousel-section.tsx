'use client'

import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'

import { motion } from 'motion/react'

const MotionBox = motion(Box)
const MotionImage = motion(Image)

const imageSrcs = [
  '/images/home/1.jpg',
  '/images/home/2.jpg',
  '/images/home/3.jpg',
  '/images/home/4.jpg',
  '/images/home/5.jpg',
]

const CarouselSection: React.FC = () => {
  const index = 0
  const imageSrc = imageSrcs[index]

  return (
    <MotionBox
      key={imageSrc}
      as="figure"
      w="100%"
      h="100vh"
      position="relative"
      overflow="hidden"
      flexShrink={0}
    >
      <MotionImage
        src={imageSrc}
        alt={`${index + 1}번째 메인페이지 배경이미지`}
        w="100%"
        h="100%"
        objectFit="cover"
        objectPosition="center"
        display="block"
      />
    </MotionBox>
  )
}

export default CarouselSection
