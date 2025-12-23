import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import Table, { TableColumn } from '@/components/table'

/** 본당 출신 사제 */
interface NativePriest {
  /** 이름 */
  name: string
  /** 세례명 */
  baptismName: string
  /** 수품일 */
  ordinationDate: string
}
/** 본당 출신 사제 데이터 */
const NATIVE_PRIESTS: NativePriest[] = [
  {
    name: '곽성민',
    baptismName: '베네딕도',
    ordinationDate: '1976.12.08',
  },
]

const nativePriestsColumns: TableColumn<NativePriest>[] = [
  {
    key: 'name',
    label: '이름',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (nativePriest) => nativePriest.name,
  },
  {
    key: 'baptismName',
    label: '세례명',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (nativePriest) => nativePriest.baptismName,
  },
  {
    key: 'ordinationDate',
    label: '수품일',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (nativePriest) => nativePriest.ordinationDate,
  },
]

const AboutHistoryNativePriestSection: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Text textStyle="pre-heading-1" color="grey.10">
        본당 출신 사제
      </Text>
      <Table
        minW="680px"
        columns={nativePriestsColumns}
        data={NATIVE_PRIESTS}
        getRowKey={(nativePriest) => nativePriest.name}
      />
    </Box>
  )
}

export default AboutHistoryNativePriestSection
