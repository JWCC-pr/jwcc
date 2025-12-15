import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Image } from '@chakra-ui/react/image'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { ArrowRightIcon } from '@phosphor-icons/react'

const BulletinSection: React.FC = () => {
  return (
    <Box w="330px" display="flex" flexFlow="column nowrap" gap="40px" h="100%">
      <Box
        py="10px"
        display="flex"
        alignItems="center"
        gap="10px"
        flexShrink={0}
      >
        <Text flex="1" textStyle="pre-heading-1" color="grey.10">
          주보
        </Text>
        <Link href={`#/bulletin TODO:`} _hover={{ textDecoration: 'none' }}>
          <Button variant="ghost" size="md" colorPalette="grey">
            더 보기
            <ArrowRightIcon size="20px" />
          </Button>
        </Link>
      </Box>

      <Box
        as="figure"
        flex="1"
        minH="0"
        border="1px solid"
        borderColor="border.basic.1"
        rounded="6px"
        boxShadow="shadow-bottom"
        overflow="hidden"
        display="flex"
      >
        <Image
          src="/images/home/church-news-section/bulletin.png"
          alt="bulletin"
          aspectRatio="4/5"
          objectFit="fill"
          objectPosition="center"
        />
      </Box>
    </Box>
  )
}

export default BulletinSection
