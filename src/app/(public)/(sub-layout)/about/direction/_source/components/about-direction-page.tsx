import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

const AboutDirectionPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="56px">
      <Box w="full" h={['240px', '420px', '420px']}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.7717681530453!2d127.00466957632746!3d37.5133007720525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3e826356787%3A0xcd9976ae83d3473a!2z7LKc7KO86rWQIOyeoOybkOuPmSDshLHri7k!5e0!3m2!1sko!2skr!4v1766480410866!5m2!1sko!2skr"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Box>

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
