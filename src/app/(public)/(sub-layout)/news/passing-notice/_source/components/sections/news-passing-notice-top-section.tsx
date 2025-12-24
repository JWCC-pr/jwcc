'use client'

import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'
import { Text } from '@chakra-ui/react/text'

import { useContactRetrieveQuery } from '@/generated/apis/Contact/Contact.query'

const NewsPassingNoticeTopSection: React.FC = () => {
  const { data: contact } = useContactRetrieveQuery({ variables: { me: 'me' } })

  return (
    <Box display="flex" flexDirection="column" gap="12px">
      <Box
        h={['200px', '160px']}
        px="40px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bgColor="background.inverse.1"
        rounded="6px"
        position="relative"
        overflow="hidden"
      >
        <Box zIndex="2" display="flex" flexDirection="column" gap="12px">
          <Text textStyle="cat-body-3" color="grey.0">
            그리스도인에게 죽음은 삶의 끝이 아닌 영원한 생명의 시작이므로
            <br />
            주님 안에서 다시 만나리라는 희망을 가집니다.
            <br />
            고인을 위해 함께 연도를 바치며 하느님의 자비를 구합시다.
          </Text>
          <Text textStyle="cat-body-3" color="grey.0">
            †. 주님，영원한 안식을 주소서.
          </Text>
        </Box>

        <Image
          src="/images/news/passing-notice/banner.png"
          alt="선종 안내 이미지"
          pos="absolute"
          right="0"
          w="480px"
          h={['200px', '160px']}
        />
      </Box>

      <Box
        p={['20px 16px', '20px 40px']}
        display="flex"
        flexDirection={['column', 'row']}
        gap="10px"
        bgColor="background.basic.2"
        rounded="6px"
      >
        <Text w="240px" textStyle="pre-body-3" color="grey.10">
          선종 시 사무실과 연령회에
          <br />
          문의 바랍니다.
        </Text>
        <Box display="flex" flexFlow="column">
          <Box display="flex" gap="10px">
            <Text w="130px" textStyle="pre-body-5" color="grey.7">
              선종연락 (사무실)
            </Text>
            <Text textStyle="pre-body-4" color="grey.10">
              {contact?.officePhone}
            </Text>
          </Box>
          <Box display="flex" gap="10px">
            <Text w="130px" textStyle="pre-body-5" color="grey.7">
              선종연락 ({contact?.presidentName})
            </Text>
            <Text textStyle="pre-body-4" color="grey.10">
              {contact?.presidentPhone}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NewsPassingNoticeTopSection
