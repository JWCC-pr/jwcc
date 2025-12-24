import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns'

import Table, { TableColumn } from '@/components/table'
import { AssociateType } from '@/generated/apis/@types/data-contracts'
import { usePriestAssociateHistoryRetrieveQuery } from '@/generated/apis/Priest/Priest.query'

const assistantPastorsColumns: TableColumn<AssociateType>[] = [
  {
    key: 'assistantSystem',
    label: '보좌체제',
    width: { type: 'fixed', value: 120 },
    textAlign: 'center',
    render: (assistantPastor) => assistantPastor.assistantSystem,
  },
  {
    key: 'division',
    label: '구분',
    width: { type: 'fixed', value: 120 },
    textAlign: 'center',
    render: (assistantPastor) => assistantPastor.division,
  },
  {
    key: 'name',
    label: '이름',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (assistantPastor) => assistantPastor.name,
  },
  {
    key: 'baptismalName',
    label: '세례명',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (assistantPastor) => assistantPastor.baptismalName,
  },
  {
    key: 'startDate',
    label: '재임기간',
    width: { type: 'fixed', value: 180 },
    textAlign: 'center',
    render: (assistantPastor) =>
      `${format(new Date(assistantPastor.startDate ?? ''), 'yyyy.MM.dd')} - ${format(new Date(assistantPastor.endDate ?? ''), 'yyyy.MM.dd')}`,
  },
]

const AboutHistoryAssistantPastorSection: React.FC = () => {
  const { data: assistantPastors } = usePriestAssociateHistoryRetrieveQuery({})

  if (!assistantPastors) return

  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Text textStyle="pre-heading-1" color="grey.10">
        역대 부주임신부 및 보좌신부
      </Text>
      <Table
        minW="680px"
        columns={assistantPastorsColumns}
        data={assistantPastors}
        getRowKey={(assistantPastor) => assistantPastor.id}
      />
    </Box>
  )
}

export default AboutHistoryAssistantPastorSection
