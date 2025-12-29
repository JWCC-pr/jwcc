import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns'

import Table, { TableColumn } from '@/components/table'
import { PastorHistoryType } from '@/generated/apis/@types/data-contracts'
import { usePastorHistoryListQuery } from '@/generated/apis/PastorHistory/PastorHistory.query'

const pastorsColumns: TableColumn<PastorHistoryType>[] = [
  {
    key: 'category',
    label: '구분',
    width: { type: 'fixed', value: 120 },
    textAlign: 'center',
    render: (pastor) => pastor.category,
  },
  {
    key: 'name',
    label: '이름',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (pastor) => pastor.name,
  },
  {
    key: 'baptismalName',
    label: '세례명',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (pastor) => pastor.baptismalName,
  },
  {
    key: 'startDate',
    label: '재임기간',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (pastor) =>
      `${format(new Date(pastor.startDate ?? ''), 'yyyy.MM.dd')} - ${format(new Date(pastor.endDate ?? ''), 'yyyy.MM.dd')}`,
  },
]

const AboutHistoryPastorSection: React.FC = () => {
  const { data: pastorHistory } = usePastorHistoryListQuery({})

  if (!pastorHistory) return

  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Text textStyle="pre-heading-1" color="grey.10">
        역대 주임신부
      </Text>
      <Table
        minW="680px"
        columns={pastorsColumns}
        data={pastorHistory}
        getRowKey={(pastor) => pastor.id}
      />
    </Box>
  )
}

export default AboutHistoryPastorSection
