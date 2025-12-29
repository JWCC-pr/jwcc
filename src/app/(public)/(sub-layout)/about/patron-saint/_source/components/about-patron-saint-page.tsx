import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'
import { Text } from '@chakra-ui/react/text'

import {
  AboutPatronSaintQuotationMarkLeftIcon,
  AboutPatronSaintQuotationMarkRightIcon,
} from '@/generated/icons/MyIcons'

const AboutPatronSaintPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="56px">
      <Box display="flex" gap="40px" flexFlow={['column', 'row']}>
        <Image
          src="/images/about/patron-saint/image.jpg"
          border="1px solid"
          borderColor="border.basic.1"
          rounded="6px"
          h={['400px', '405px', '500px']}
        />
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          gap="20px"
          justifyContent="center"
        >
          <Box display="flex" flexDirection="column" maxW="570px" mx="auto">
            <AboutPatronSaintQuotationMarkLeftIcon w="24px" h="16px" />
            <Text textStyle="cat-heading-2" color="grey.10" textAlign="center">
              저의 하느님,
              <br />
              당신을 믿고 찬미하며 의지하고 사랑하나이다.
              <br />
              당신을 믿지 않고 찬미하지 않으며
              <br />
              의지하지 않고 사랑하지 않는 자들을 위해 기도하오니
              <br />
              용서해주소서.
            </Text>
            <AboutPatronSaintQuotationMarkRightIcon
              w="24px"
              h="16px"
              alignSelf="flex-end"
            />
          </Box>
          <Text textStyle="pre-body-6" color="grey.6" textAlign="center">
            파티마의 기도
          </Text>
        </Box>
      </Box>

      <Text textStyle="pre-body-4" color="grey.10">
        잠원동성당의 주보성인은 &apos;파티마 성모&apos;입니다.
        <br />
        성모님은 1917년 포르투갈 파티마에서 세 어린 목동 루치아, 프란치스코,
        히야친타에게 여러 차례 발현하시어 죄인들의 회개와 세계 평화를 위해
        부탁하셨습니다.
        <br />
        “전쟁이 끝나고 세상에 평화가 오도록 매일 묵주기도를 바쳐라.”
        <br />
        “기도하여라, 죄인들을 위해 아주 많이 기도하고 많은 희생을 바쳐라.”
        <br />
        성모님은 희생과 봉사, 그리고 매주 첫 토요일 성모 신심으로 미사를
        봉헌하기를 부탁하셨습니다. 특히 매일 묵주기도를 바치라고 말씀하셨습니다.
        <br />
        <br />
        이러한 가르침을 받아 잠원동성당은 주보성인인 성모님의 뜻에 따라 충실히
        티없으신 성모신심을 지켜내는 성당으로 거듭나고 있습니다.
      </Text>
    </Box>
  )
}

export default AboutPatronSaintPage
