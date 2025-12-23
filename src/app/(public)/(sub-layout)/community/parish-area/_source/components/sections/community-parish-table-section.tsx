import StickyColumnTable, {
  StickyColumnTableColumn,
} from '@/components/sticky-column-table'

/** 본당 관할 구역도 테이블 */
interface CommunityParishTable {
  /** 구역 */
  area: string
  /** 반 */
  class: string
  /** 상세 주소 */
  detailAddress: string
}

// 각 generation이 몇 행에 걸쳐 있는지 계산하는 헬퍼 함수
const getAreaRowSpan = (
  item: CommunityParishTable,
  index: number,
  data: CommunityParishTable[],
) => {
  // 이 구역의 첫 번째 항목인지 확인
  const isFirstOfGeneration = index === 0 || data[index - 1].area !== item.area

  if (!isFirstOfGeneration) return 1

  // 같은 구역이 몇 개인지 카운트
  let count = 1
  for (let i = index + 1; i < data.length; i++) {
    if (data[i].area === item.area) {
      count++
    } else {
      break
    }
  }
  return count
}

// 첫 번째 항목이 아니면 렌더링 스킵
const shouldSkipArea = (
  item: CommunityParishTable,
  index: number,
  data: CommunityParishTable[],
) => {
  return index > 0 && data[index - 1].area === item.area
}

const communityParishTableColumns: StickyColumnTableColumn<CommunityParishTable>[] =
  [
    {
      key: 'area',
      label: '구역',
      width: { type: 'fixed', value: 120 },
      textAlign: 'center',
      render: (communityParishTable) => communityParishTable.area,
      sticky: 'start',
      stickyLeft: 0,
      getRowSpan: getAreaRowSpan,
      shouldSkipRender: shouldSkipArea,
      getCellProps: () => {
        return {
          bgColor: 'background.basic.2',
        }
      },
    },
    {
      key: 'class',
      label: '반',
      width: { type: 'fixed', value: 120 },
      textAlign: 'center',
      render: (communityParishTable) => communityParishTable.class,
    },
    {
      key: 'detailAddress',
      label: '상세 주소',
      width: { type: 'flex', value: 1 },
      textAlign: 'left',
      render: (communityParishTable) => communityParishTable.detailAddress,
    },
  ]

interface CommunityParishTableSectionProps {
  data: CommunityParishTable[]
}

const CommunityParishTableSection: React.FC<
  CommunityParishTableSectionProps
> = ({ data }) => {
  return (
    <StickyColumnTable
      minW={['680px', '680px', '580px']}
      columns={communityParishTableColumns}
      data={data}
      getRowKey={(assistantPastor) => assistantPastor.detailAddress}
    />
  )
}

export default CommunityParishTableSection
