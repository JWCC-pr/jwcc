import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import Table, { TableColumn } from '@/components/table'

/** 역대 주임신부 */
interface Pastor {
  /** 구분 */
  type: string
  /** 이름 */
  name: string
  /** 세례명 */
  baptismName: string
  /** 재임기간 */
  tenure: string
}
/** 역대 주임신부 데이터 */
const PASTORS: Pastor[] = [
  {
    type: '제1대',
    name: '이우철',
    baptismName: '시몬',
    tenure: '1947.07.15 - 1980.05.15',
  },
  {
    type: '제2대',
    name: '이우철',
    baptismName: '시몬',
    tenure: '1947.07.15 - 1980.05.15',
  },
  {
    type: '제3대',
    name: '이우철',
    baptismName: '시몬',
    tenure: '1947.07.15 - 1980.05.15',
  },
  {
    type: '제4대',
    name: '이우철',
    baptismName: '시몬',
    tenure: '1947.07.15 - 1980.05.15',
  },
]

const pastorsColumns: TableColumn<Pastor>[] = [
  {
    key: 'type',
    label: '구분',
    width: { type: 'fixed', value: 120 },
    textAlign: 'center',
    render: (pastor) => pastor.type,
  },
  {
    key: 'name',
    label: '이름',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (pastor) => pastor.name,
  },
  {
    key: 'baptismName',
    label: '세례명',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (pastor) => pastor.baptismName,
  },
  {
    key: 'tenure',
    label: '재임기간',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (pastor) => pastor.tenure,
  },
]

const AboutHistoryPastorSection: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Text textStyle="pre-heading-1" color="grey.10">
        역대 주임신부
      </Text>
      <Table
        minW="680px"
        columns={pastorsColumns}
        data={PASTORS}
        getRowKey={(pastor) => pastor.type}
      />
    </Box>
  )
}

export default AboutHistoryPastorSection
