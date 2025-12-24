import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import Table, { TableColumn } from '@/components/table'

/** 역대 부주임신부 및 보좌신부 */
interface AssistantPastor {
  /** 보좌체제 */
  assistantType: string
  /** 구분 */
  type: string
  /** 이름 */
  name: string
  /** 세례명 */
  baptismName: string
  /** 재임기간 */
  tenure: string
}
/** 역대 부주임신부 및 보좌신부 데이터 */
const ASSISTANT_PASTORS: AssistantPastor[] = [
  {
    assistantType: '1보좌체제',
    type: '보좌',
    name: '김정진',
    baptismName: '바오로',
    tenure: '1950.04.15 - 1950.12.31',
  },
]

const assistantPastorsColumns: TableColumn<AssistantPastor>[] = [
  {
    key: 'assistantType',
    label: '보좌체제',
    width: { type: 'fixed', value: 120 },
    textAlign: 'center',
    render: (assistantPastor) => assistantPastor.assistantType,
  },
  {
    key: 'type',
    label: '구분',
    width: { type: 'fixed', value: 120 },
    textAlign: 'center',
    render: (assistantPastor) => assistantPastor.type,
  },
  {
    key: 'name',
    label: '이름',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (assistantPastor) => assistantPastor.name,
  },
  {
    key: 'baptismName',
    label: '세례명',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (assistantPastor) => assistantPastor.baptismName,
  },
  {
    key: 'tenure',
    label: '재임기간',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (assistantPastor) => assistantPastor.tenure,
  },
]

const AboutHistoryAssistantPastorSection: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Text textStyle="pre-heading-1" color="grey.10">
        역대 부주임신부 및 보좌신부
      </Text>
      <Table
        minW="680px"
        columns={assistantPastorsColumns}
        data={ASSISTANT_PASTORS}
        getRowKey={(assistantPastor) => assistantPastor.type}
      />
    </Box>
  )
}

export default AboutHistoryAssistantPastorSection
