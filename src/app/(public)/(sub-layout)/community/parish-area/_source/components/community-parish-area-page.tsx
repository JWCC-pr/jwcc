'use client'

import { Box } from '@chakra-ui/react/box'

import CommunityParishTableSection from './sections/community-parish-table-section'

const tableOneData = [
  // 1구역
  ...[
    { area: '1구역', class: '1반', detailAddress: '한신2차 101동' },
    { area: '1구역', class: '2반', detailAddress: '한신2차 102동' },
    { area: '1구역', class: '3반', detailAddress: '한신2차 103동, 104동' },
    { area: '1구역', class: '4반', detailAddress: '한신2차 105동' },
    { area: '1구역', class: '5반', detailAddress: '한신2차 106동, 107동' },
  ],
  // 2구역
  ...[
    { area: '2구역', class: '1반', detailAddress: '한신2차 108동' },
    { area: '2구역', class: '2반', detailAddress: '한신2차 109동' },
    { area: '2구역', class: '3반', detailAddress: '한신2차 110동' },
    { area: '2구역', class: '4반', detailAddress: '한신2차 111동' },
    { area: '2구역', class: '5반', detailAddress: '한신2차 112동' },
    { area: '2구역', class: '5반', detailAddress: '한신2차 113동' },
  ],
]

const tableTwoData = [
  // 11구역
  ...[
    { area: '11구역', class: '1반', detailAddress: '메이플자이 201동' },
    { area: '11구역', class: '2반', detailAddress: '메이플자이 202동' },
    { area: '11구역', class: '3반', detailAddress: '메이플자이 203동' },
    { area: '11구역', class: '4반', detailAddress: '메이플자이 204동' },
    { area: '11구역', class: '5반', detailAddress: '한신21차, 노블레스빌' },
    { area: '11구역', class: '6반', detailAddress: '현대훼미리' },
    { area: '11구역', class: '7반', detailAddress: '메이플자이 205동' },
    { area: '11구역', class: '8반', detailAddress: '메이플자이 206동' },
    { area: '11구역', class: '9반', detailAddress: '메이플자이 207동' },
  ],
  // 12구역
  ...[
    { area: '12구역', class: '1반', detailAddress: '한신12차 324동, 325동' },
    { area: '12구역', class: '2반', detailAddress: '한신12차 326동' },
    { area: '12구역', class: '3반', detailAddress: '신반포르엘 101동' },
    { area: '12구역', class: '4반', detailAddress: '신반포르엘 102동, 103동' },
    { area: '12구역', class: '5반', detailAddress: '신화' },
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
