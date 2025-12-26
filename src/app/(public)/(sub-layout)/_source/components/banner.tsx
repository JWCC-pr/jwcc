import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'

interface BannerProps {
  content: React.ReactNode
  image: {
    pc: string
    tablet: string
    mobile: string
  }
}

const Banner: React.FC<BannerProps> = ({ content, image }) => {
  return (
    <Box
      h={['200px', '160px']}
      px={['16px', '40px']}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      bgColor="background.inverse.1"
      rounded="6px"
      position="relative"
      overflow="hidden"
    >
      <Box zIndex="2">{content}</Box>

      <>
        <Image
          src={image.pc}
          alt="배너 이미지"
          display={['none', 'none', 'block']}
          pos="absolute"
          right="0"
          w="480px"
          h="160px"
        />
        <Image
          src={image.tablet}
          alt="배너 이미지"
          display={['none', 'block', 'none']}
          pos="absolute"
          right="0"
          w="480px"
          h="160px"
        />
        <Image
          src={image.mobile}
          alt="배너 이미지"
          display={['block', 'none']}
          pos="absolute"
          right="0"
          h="200px"
        />
      </>
    </Box>
  )
}

export default Banner
