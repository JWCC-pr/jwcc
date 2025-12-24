'use client'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import AboutDirectionMap from './about-direction-map'

const AboutDirectionPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="56px">
      <AboutDirectionMap />

      <Box display="flex" flexFlow="column nowrap" gap="16px">
        <Text textStyle="pre-heading-4" color="grey.10">
          잠원동 성당
        </Text>
        <Text textStyle="pre-body-4" color="grey.10">
          서울 서초구 잠원로 110
        </Text>
      </Box>

      <Box display="flex" flexFlow="column nowrap" gap="16px">
        <Box
          display="flex"
          flexFlow="row nowrap"
          gap="12px"
          alignItems="center"
        >
          <Text textStyle="pre-heading-4" color="grey.10">
            지하철 이용
          </Text>
          <Text textStyle="pre-body-4" color="grey.7">
            잠원역에서 도보 8분 거리
          </Text>
        </Box>
        <Text textStyle="pre-body-4" color="grey.10">
          3호선 잠원역 3번 출구에서 500m 직진 → 한신7차아파트 301동에서 오른쪽
          방향으로 300m 진행 → 경성카센타에서 왼쪽 방향으로 70m
        </Text>
      </Box>

      <Box display="flex" flexFlow="column nowrap" gap="16px">
        <Text textStyle="pre-heading-4" color="grey.10">
          버스 이용
        </Text>
        <Text textStyle="pre-body-4" color="grey.10">
          잠원성당 하차 - 143(파랑)간선, 345(파랑)간선, 4318(녹색) 지선
        </Text>
      </Box>
    </Box>
  )
}

export default AboutDirectionPage
