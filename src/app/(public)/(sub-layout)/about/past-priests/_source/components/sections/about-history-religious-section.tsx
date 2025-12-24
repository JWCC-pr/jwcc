import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import StickyColumnTable, {
  StickyColumnTableColumn,
} from '@/components/sticky-column-table'

/** 역대 수도자 */
interface Religious {
  /** 구분 */
  generation: string
  /** 성함 */
  name: string
  /** 세례명 */
  baptismName: string
  /** 재임기간 */
  tenure: string
}
/** 역대 수도자 데이터 */
const RELIGIOUSES: Religious[] = [
  // 1대
  ...[
    {
      generation: '제1대 원장수녀님',
      name: '손수금',
      baptismName: '왈부르카',
      tenure: '1982.11.06 - 1985.01.12',
    },
    {
      generation: '제1대 원장수녀님',
      name: '전정숙',
      baptismName: '세실리아',
      tenure: '1982.11.06 - 1983.06.12',
    },
    {
      generation: '제1대 원장수녀님',
      name: '김현옥',
      baptismName: '안나',
      tenure: '1982.11.06 - 1983.03',
    },
    {
      generation: '제1대 원장수녀님',
      name: '김명숙',
      baptismName: '다니엘',
      tenure: '1993.05.25 - 1986.02.17',
    },
  ],
  // 2대
  ...[
    {
      generation: '제2대 원장수녀님',
      name: '이추영',
      baptismName: '안드레아',
      tenure: '1983.96.12 - 1985.08.25',
    },
  ],
]

// 각 generation이 몇 행에 걸쳐 있는지 계산하는 헬퍼 함수
const getGenerationRowSpan = (
  item: Religious,
  index: number,
  data: Religious[],
) => {
  // 이 세대의 첫 번째 항목인지 확인
  const isFirstOfGeneration =
    index === 0 || data[index - 1].generation !== item.generation

  if (!isFirstOfGeneration) return 1

  // 같은 세대가 몇 개인지 카운트
  let count = 1
  for (let i = index + 1; i < data.length; i++) {
    if (data[i].generation === item.generation) {
      count++
    } else {
      break
    }
  }
  return count
}

// 첫 번째 항목이 아니면 렌더링 스킵
const shouldSkipGeneration = (
  item: Religious,
  index: number,
  data: Religious[],
) => {
  return index > 0 && data[index - 1].generation === item.generation
}

const religiousColumns: StickyColumnTableColumn<Religious>[] = [
  {
    key: 'type',
    label: '구분',
    width: { type: 'fixed', value: 120 },
    sticky: 'start', // 왼쪽 고정
    stickyLeft: 0,
    getRowSpan: getGenerationRowSpan,
    shouldSkipRender: shouldSkipGeneration,
    textAlign: 'center',
    render: (religious) => religious.generation,
    getCellProps: () => {
      return {
        bgColor: 'background.basic.2',
      }
    },
  },
  {
    key: 'name',
    label: '성함',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (religious) => religious.name,
  },
  {
    key: 'baptismName',
    label: '세례명',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (religious) => religious.baptismName,
  },
  {
    key: 'tenure',
    label: '재임기간',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (religious) => religious.tenure,
  },
]

const AboutHistoryReligiousSection: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Text textStyle="pre-heading-1" color="grey.10">
        역대 수도자
      </Text>
      <StickyColumnTable
        minW="680px"
        columns={religiousColumns}
        data={RELIGIOUSES}
        getRowKey={(religious) => religious.generation}
      />
    </Box>
  )
}

export default AboutHistoryReligiousSection
