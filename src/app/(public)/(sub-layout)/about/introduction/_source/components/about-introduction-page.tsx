'use client'

import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'
import { Text } from '@chakra-ui/react/text'

const AboutIntroductionPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="56px">
      <Text textStyle="pre-body-2" color="grey.10">
        잠원동성당은 1947년 약현본당(현 중림동 약현성당)에서 분리되어
        설립되었으며 강남, 서초지역에서 가장 오래된 전통 있는 성당입니다.
        <br />
        잠원동 일대는 병인박해 이전부터 신자들이 거주하던 신심 깊은 곳으로 설립
        당시에는 잠실리본당이었으나 1975년에 잠원동성당으로 개칭되었습니다.
        <br />
        초대 신부로는 이우철 시몬 신부가 부임했습니다.
        <br />
        <br />
        잠원동성당의 역사에서 빼놓을 수 없는 것은 ‘성심원’입니다.
        <br />
        1947년 7월 10일 약현성당 이우철 시몬 신부가 잠실리 13번지에
        고아보육시설인 성심원을 개설하고 그 안에 소성당을 건립한 것이
        잠원동성당의 시작입니다.
        <br />
        공소 신자들이 미사를 봉헌한 덕분에 정식 본당 설립 절차를 거치지 않았지만
        본당의 성격을 갖는 성당으로 인정되었습니다.
        <br />
        <br />
        6.25 전쟁으로 잠실리본당과 성심원이 파괴되었고 휴전 이후 미군과 가톨릭
        구재회의 도움을 받아 목조건물로 다시 지어졌습니다.
        <br />
        이후 성심원은 1984년 용인시로 이전되었습니다.
        <br />
        <br />
        현재의 성당 건물은 1983년 8월 28일 김수환 스테파노 추기경이 축성했으며,
        인그룹종합건축사사무소 최영진 건축가가 최초 설계,
        <br />
        1998년 김영섭 건축문화설계연구소 김영섭 건축가가 개수했습니다.
      </Text>
      <Image
        src="/images/about/introduction/image.png"
        alt="잠원동 성당 본당 소개 이미지"
        rounded="6px"
        border="1px solid"
        borderColor="border.basic.1"
        h={['120px', '240.8px', '420px']}
        aspectRatio={['343/120', '688.00/240.80', '20/7']}
        objectFit="cover"
        objectPosition="bottom"
      />
    </Box>
  )
}

export default AboutIntroductionPage
