'use client'

import { Box } from '@chakra-ui/react/box'

import CommunityParishTableSection from './sections/community-parish-table-section'

const tableOneData = [
  // 1구역
  ...[
    { area: `1구역`, class: `1반`, detailAddress: `한신2차 101동` },
    { area: `1구역`, class: `2반`, detailAddress: `한신2차 102동` },
    { area: `1구역`, class: `3반`, detailAddress: `한신2차 103동, 104동` },
    { area: `1구역`, class: `4반`, detailAddress: `한신2차 105동` },
    { area: `1구역`, class: `5반`, detailAddress: `한신2차 106동, 107동` },
  ],
  // 2구역
  ...[
    { area: `2구역`, class: `1반`, detailAddress: `한신2차 108동` },
    { area: `2구역`, class: `2반`, detailAddress: `한신2차 109동` },
    { area: `2구역`, class: `3반`, detailAddress: `한신2차 110동` },
    { area: `2구역`, class: `4반`, detailAddress: `한신2차 111동` },
    { area: `2구역`, class: `5반`, detailAddress: `한신2차 112동` },
    { area: `2구역`, class: `6반`, detailAddress: `한신2차 113동` },
  ],
  // 3구역
  ...[
    {
      area: `3구역`,
      class: `1반`,
      detailAddress: `잠원중앙하이츠, 킴스빌리지`,
    },
    { area: `3구역`, class: `2반`, detailAddress: `반포한신타워` },
    {
      area: `3구역`,
      class: `3반`,
      detailAddress: `청구블루힐, 오페라하우스, 신반포중앙하이츠, 시티아파트`,
    },
  ],
  // 4구역 A
  ...[
    { area: `4구역 A`, class: `1반`, detailAddress: `한신4차 201동` },
    { area: `4구역 A`, class: `2반`, detailAddress: `한신4차 202동` },
    { area: `4구역 A`, class: `3반`, detailAddress: `한신4차 203동` },
    { area: `4구역 A`, class: `4반`, detailAddress: `한신4차 207동` },
    { area: `4구역 A`, class: `5반`, detailAddress: `한신4차 208동` },
    { area: `4구역 A`, class: `6반`, detailAddress: `한신4차 209동` },
  ],
  // 4구역 B
  ...[
    { area: `4구역 B`, class: `1반 (7)`, detailAddress: `한신4차 204동` },
    { area: `4구역 B`, class: `2반 (8)`, detailAddress: `한신4차 205동` },
    { area: `4구역 B`, class: `3반 (9)`, detailAddress: `한신4차 206동` },
    { area: `4구역 B`, class: `4반 (10)`, detailAddress: `한신4차 210동` },
    { area: `4구역 B`, class: `5반 (11)`, detailAddress: `한신4차 211동` },
    { area: `4구역 B`, class: `6반 (12)`, detailAddress: `한신4차 212동` },
  ],
  // 5구역
  ...[
    { area: `5구역`, class: `1반`, detailAddress: `아크로리버뷰 101동` },
    { area: `5구역`, class: `2반`, detailAddress: `아크로리버뷰 102동` },
    { area: `5구역`, class: `3반`, detailAddress: `아크로리버뷰 103동` },
    { area: `5구역`, class: `4반`, detailAddress: `아크로리버뷰 104동` },
    { area: `5구역`, class: `5반`, detailAddress: `아크로리버뷰 105동` },
    { area: `5구역`, class: `6반`, detailAddress: `한신16차, 청구빌라트` },
  ],
  // 6구역
  ...[
    { area: `6구역`, class: `1반`, detailAddress: `반포센트럴자이 101동` },
    {
      area: `6구역`,
      class: `2반`,
      detailAddress: `반포센트럴자이 102동, 103동, 104동`,
    },
    {
      area: `6구역`,
      class: `3반`,
      detailAddress: `반포센트럴자이 105동, 106동`,
    },
    {
      area: `6구역`,
      class: `4반`,
      detailAddress: `반포센트럴자이 107동,\n시티, 두산위브`,
    },
    {
      area: `6구역`,
      class: `5반`,
      detailAddress: `반포르엘 101동, 102동, 103동`,
    },
    {
      area: `6구역`,
      class: `6반`,
      detailAddress: `반포르엘 104동, 105동, 106동, 107동`,
    },
    {
      area: `6구역`,
      class: `7반`,
      detailAddress: `반포르엘2차 201동, 202동, 203동`,
    },
  ],
  // 7구역
  ...[
    { area: `7구역`, class: `1반`, detailAddress: `한신7차 301동` },
    { area: `7구역`, class: `2반`, detailAddress: `한신7차 302동` },
    { area: `7구역`, class: `3반`, detailAddress: `한신7차 303동` },
    {
      area: `7구역`,
      class: `4반`,
      detailAddress: `디에이치르블랑(신반포22차 재건축)`,
    },
    {
      area: `7구역`,
      class: `5반`,
      detailAddress: `한신그린, 메이플라워, 리버빌라트`,
    },
  ],
  // 8구역
  ...[
    { area: `8구역`, class: `1반`, detailAddress: `메이플자이 101동` },
    { area: `8구역`, class: `2반`, detailAddress: `메이플자이 102동` },
    { area: `8구역`, class: `3반`, detailAddress: `메이플자이 103동` },
    { area: `8구역`, class: `4반`, detailAddress: `메이플자이 104동` },
    { area: `8구역`, class: `5반`, detailAddress: `메이플자이 105동` },
    { area: `8구역`, class: `6반`, detailAddress: `메이플자이 106동` },
  ],
  // 9구역
  ...[
    { area: `9구역`, class: `1반`, detailAddress: `메이플자이 107동` },
    { area: `9구역`, class: `2반`, detailAddress: `한신타운` },
    { area: `9구역`, class: `3반`, detailAddress: `한신20차` },
    { area: `9구역`, class: `4반`, detailAddress: `메이플자이 108동` },
    { area: `9구역`, class: `5반`, detailAddress: `메이플자이 109동` },
    { area: `9구역`, class: `6반`, detailAddress: `메이플자이 110동` },
    { area: `9구역`, class: `7반`, detailAddress: `메이플자이 111동` },
    { area: `9구역`, class: `8반`, detailAddress: `메이플자이 112동` },
    { area: `9구역`, class: `9반`, detailAddress: `메이플자이 113동` },
    { area: `9구역`, class: `10반`, detailAddress: `메이플자이 114동` },
  ],
  // 10구역
  ...[
    { area: `10구역`, class: `1반`, detailAddress: `금호베스트빌` },
    { area: `10구역`, class: `2반`, detailAddress: `메이플자이 208동` },
    { area: `10구역`, class: `3반`, detailAddress: `메이플자이 209동` },
    { area: `10구역`, class: `4반`, detailAddress: `메이플자이 210동` },
    { area: `10구역`, class: `5반`, detailAddress: `메이플자이 211동` },
    { area: `10구역`, class: `6반`, detailAddress: `메이플자이 212동` },
    { area: `10구역`, class: `7반`, detailAddress: `메이플자이 213동` },
    { area: `10구역`, class: `8반`, detailAddress: `메이플자이 214동` },
    { area: `10구역`, class: `9반`, detailAddress: `메이플자이 215동` },
  ],
]

const tableTwoData = [
  // 11구역
  ...[
    { area: `11구역`, class: `1반`, detailAddress: `메이플자이 201동` },
    { area: `11구역`, class: `2반`, detailAddress: `메이플자이 202동` },
    { area: `11구역`, class: `3반`, detailAddress: `메이플자이 203동` },
    { area: `11구역`, class: `4반`, detailAddress: `메이플자이 204동` },
    { area: `11구역`, class: `5반`, detailAddress: `한신21차, 노블레스빌` },
    { area: `11구역`, class: `6반`, detailAddress: `현대훼미리` },
    { area: `11구역`, class: `7반`, detailAddress: `메이플자이 205동` },
    { area: `11구역`, class: `8반`, detailAddress: `메이플자이 206동` },
    { area: `11구역`, class: `9반`, detailAddress: `메이플자이 207동` },
  ],
  // 12구역
  ...[
    { area: `12구역`, class: `1반`, detailAddress: `한신12차 324동, 325동` },
    { area: `12구역`, class: `2반`, detailAddress: `한신12차 326동` },
    { area: `12구역`, class: `3반`, detailAddress: `신반포르엘 101동` },
    { area: `12구역`, class: `4반`, detailAddress: `신반포르엘 102동, 103동` },
    { area: `12구역`, class: `5반`, detailAddress: `신화` },
  ],
  // 13구역
  ...[
    { area: `13구역`, class: `1반`, detailAddress: `잠원한신 1동, 2동` },
    { area: `13구역`, class: `2반`, detailAddress: `잠원한신 3동, 4동` },
    { area: `13구역`, class: `3반`, detailAddress: `잠원한신 5동, 6동` },
    { area: `13구역`, class: `4반`, detailAddress: `잠원한신 7동` },
    { area: `13구역`, class: `5반`, detailAddress: `한신27차` },
  ],
  // 14구역
  ...[
    { area: `14구역`, class: `1반`, detailAddress: `신반포래미안팰리스 101동` },
    { area: `14구역`, class: `2반`, detailAddress: `신반포래미안팰리스 102동` },
    { area: `14구역`, class: `3반`, detailAddress: `신반포래미안팰리스 103동` },
    { area: `14구역`, class: `4반`, detailAddress: `신반포래미안팰리스 105동` },
    { area: `14구역`, class: `5반`, detailAddress: `신반포래미안팰리스 106동` },
    { area: `14구역`, class: `6반`, detailAddress: `신반포래미안팰리스 107동` },
    { area: `14구역`, class: `7반`, detailAddress: `신반포래미안팰리스 108동` },
  ],
  // 15구역
  ...[
    { area: `15구역`, class: `1반`, detailAddress: `한신19차 330동` },
    { area: `15구역`, class: `2반`, detailAddress: `한신19차 331동` },
    { area: `15구역`, class: `3반`, detailAddress: `한신25차 334동` },
    { area: `15구역`, class: `4반`, detailAddress: `한신25차 345동` },
    { area: `15구역`, class: `5반`, detailAddress: `한신26차, 실크빌라트` },
    { area: `15구역`, class: `6반`, detailAddress: `한신로얄` },
    {
      area: `15구역`,
      class: `7반`,
      detailAddress: `진양빌라트, CJ빌리지,\n청구 102동`,
    },
    { area: `15구역`, class: `8반`, detailAddress: `청구 101동` },
  ],
  // 16구역
  ...[
    {
      area: `16구역`,
      class: `1반`,
      detailAddress: `한강 1동,\n세인트빌, 서전빌라, 리버빌라, 잠원동포스코오티에르 (신반포18차 재건축)`,
    },
    {
      area: `16구역`,
      class: `2반`,
      detailAddress: `한강 2동,\n지오빌, 빌플라리스, 티에라하우스, 상지리치빌`,
    },
    {
      area: `16구역`,
      class: `3반`,
      detailAddress: `한강 3동,\n5동, 한강하우스`,
    },
    { area: `16구역`, class: `4반`, detailAddress: `한강 6동` },
    { area: `16구역`, class: `5반`, detailAddress: `잠원훼미리 1동, 3동` },
    { area: `16구역`, class: `6반`, detailAddress: `잠원훼미리 2동` },
  ],
  // 17구역
  ...[
    { area: `17구역`, class: `1반`, detailAddress: `롯데캐슬1차 101동, 102동` },
    {
      area: `17구역`,
      class: `2반`,
      detailAddress: `롯데캐슬1차 103동, 104동, 105동, 106동`,
    },
    {
      area: `17구역`,
      class: `3반`,
      detailAddress: `롯데캐슬2차 201동, 202동, 203동`,
    },
    {
      area: `17구역`,
      class: `4반`,
      detailAddress: `롯데캐슬2차 204동, 205동, 206동`,
    },
    { area: `17구역`, class: `5반`, detailAddress: `롯데캐슬2차 207동, 208동` },
  ],
  // 18구역
  ...[
    {
      area: `18구역`,
      class: `1반`,
      detailAddress: `래미안리오센트 101동, 102동, 103동`,
    },
    {
      area: `18구역`,
      class: `2반`,
      detailAddress: `래미안리오센트 104동, 105동, 106동, 107동`,
    },
    { area: `18구역`, class: `3반`, detailAddress: `미주파스텔` },
    { area: `18구역`, class: `4반`, detailAddress: `강변 1동, 4동` },
    { area: `18구역`, class: `5반`, detailAddress: `강변 2동, 3동` },
    { area: `18구역`, class: `6반`, detailAddress: `잠원현대` },
  ],
  // 19구역
  ...[
    { area: `19구역`, class: `1반`, detailAddress: `신반포자이 101동, 102동` },
    { area: `19구역`, class: `2반`, detailAddress: `신반포자이 103동, 104동` },
    { area: `19구역`, class: `3반`, detailAddress: `신반포자이 105동` },
    { area: `19구역`, class: `4반`, detailAddress: `신반포자이 106동` },
    { area: `19구역`, class: `5반`, detailAddress: `신반포자이 107동` },
  ],
  // 20구역
  ...[
    {
      area: `20구역`,
      class: `1반`,
      detailAddress: `동아 101동, 102동,\n브라운스톤, 대뜨아르`,
    },
    { area: `20구역`, class: `2반`, detailAddress: `동아 103동, 104동` },
    { area: `20구역`, class: `3반`, detailAddress: `동아 105동, 106동` },
    { area: `20구역`, class: `4반`, detailAddress: `동아 107동, 108동` },
  ],
  // 21구역
  ...[
    { area: `21구역`, class: `1반`, detailAddress: `잠원동 6~16번지` },
    {
      area: `21구역`,
      class: `2반`,
      detailAddress: `킴스타워, 새서울, 동일빌라`,
    },
    {
      area: `21구역`,
      class: `3반`,
      detailAddress: `보미리젠트, 대주피오레, 월드메르디앙, 태승`,
    },
    {
      area: `21구역`,
      class: `4반`,
      detailAddress: `잠원동 30번지, 잠원동 35~39번지`,
    },
    {
      area: `21구역`,
      class: `5반`,
      detailAddress: `대우아이빌, 잠원동 40~48번지`,
    },
  ],
]

const CommunityParishAreaPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection={['column', 'column', 'row']} gap="40px">
      <CommunityParishTableSection data={tableOneData} />
      <CommunityParishTableSection data={tableTwoData} />
    </Box>
  )
}

export default CommunityParishAreaPage
