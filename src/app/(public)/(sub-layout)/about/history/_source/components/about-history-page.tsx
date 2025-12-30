import { Box } from '@chakra-ui/react/box'
import { Timeline } from '@chakra-ui/react/timeline'

interface HistoryEvent {
  year: string
  events: string[]
}

const historyData: HistoryEvent[] = [
  {
    year: '1947',
    events: ['제1대 이우철 시몬 신부 부임,\n잠실리본당 설립'],
  },
  {
    year: '1950 - 1953',
    events: ['6.25 전쟁 피난, 파괴'],
  },
  {
    year: '1954',
    events: ['성심원 내 목조 성당 건립'],
  },
  {
    year: '1977',
    events: ['잠원동본당으로 개명'],
  },
  {
    year: '1980',
    events: ['제2대 탁현수 아우구스티노 신부 부임', '성심원과 본당 분리'],
  },
  {
    year: '1982',
    events: ['제3대 이기헌 베드로 신부 부임'],
  },
  {
    year: '1983',
    events: ['심전 신축 부지 확보'],
  },
  {
    year: '1984',
    events: ['사도직, 신심단체, 꾸리아 구성', '본당 신축 봉헌식'],
  },
  {
    year: '1987',
    events: ['제4대 장대의 루도비코 신부 부임'],
  },
  {
    year: '1992 - 1994',
    events: ['교육관 신축'],
  },
  {
    year: '1994',
    events: ['제5대 김수창 야고보 신부 부임'],
  },
  {
    year: '1995',
    events: ['야외미사, 본당의 날 제정'],
  },
  {
    year: '1997',
    events: ['본당 50년사 출간'],
  },
  {
    year: '1998',
    events: ['가정의료분과 장립'],
  },
  {
    year: '1999',
    events: ['제6대 양품 에우세비오 신부 부임'],
  },
  {
    year: '2001',
    events: ['본당 홈페이지 개설'],
  },
  {
    year: '2003',
    events: ['하느님께 드리는 편지'],
  },
  {
    year: '2004',
    events: ['제7대 이병문 베드로 신부 부임'],
  },
  {
    year: '2005',
    events: ['구립 어린이집 수탁'],
  },
  {
    year: '2007',
    events: ['본당 60주년 행사'],
  },
  {
    year: '2009',
    events: ['이병문 베드로 신부 선종', '제8대 염수의 요셉 신부 부임'],
  },
  {
    year: '2010 - 2013',
    events: ['환경 개선, 교적 정리'],
  },
  {
    year: '2011',
    events: [
      '엔젤스 합창단(현 엔젤스 발달장애인 주일학교) 장단',
      '캄보디아 봉사',
      '교회사 학교 개설',
    ],
  },
  {
    year: '2014',
    events: ['제9대 박항오 마르티노 신부 부임'],
  },
  {
    year: '2015',
    events: ['승강기 및 빛의 길 설치', '북카페 개설'],
  },
  {
    year: '2016',
    events: ['교리학교 개설'],
  },
  {
    year: '2017',
    events: ['파티마 성모상 봉헌', '본당 70주년 행사'],
  },
  {
    year: '2018',
    events: ['본당 70년사 출간'],
  },
  {
    year: '2019',
    events: ['제10대 이강구 마르코 신부 부임'],
  },
  {
    year: '2020 - 2024',
    events: ['성경 찬양미사 봉헌'],
  },
  {
    year: '2020',
    events: ['코로나19로 신자 참례 미사 중지'],
  },
  {
    year: '2022',
    events: ['코로나19 거리두기 해제, 미사 참례 완전 정상화'],
  },
  {
    year: '2023',
    events: ['초등 자부화 설립 및 아빠와 함께 추억만들기 운영'],
  },
  {
    year: '2024',
    events: ['제11대 박상수 바오로 신부 부임'],
  },
]

const AboutHistoryPage: React.FC = () => {
  return (
    <Timeline.Root>
      {historyData.map((item, index) => (
        <Timeline.Item key={`${item.year}-${index}`}>
          <Box
            w="full"
            textAlign="right"
            textStyle="cat-heading-2"
            color="primary.4"
            pb="40px"
          >
            {item.year}
          </Box>
          <Timeline.Connector>
            <Timeline.Separator />
            <Timeline.Indicator>
              <Box w="6px" h="6px" bgColor="grey.0" rounded="full" />
            </Timeline.Indicator>
          </Timeline.Connector>
          <Timeline.Content>
            {item.events.map((event, eventIndex) => (
              <Timeline.Description
                key={eventIndex}
                as="ul"
                listStyle="disc"
                pl="24px"
              >
                <Box as="li" whiteSpace="pre-line">
                  {event}
                </Box>
              </Timeline.Description>
            ))}
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline.Root>
  )
}

export default AboutHistoryPage
