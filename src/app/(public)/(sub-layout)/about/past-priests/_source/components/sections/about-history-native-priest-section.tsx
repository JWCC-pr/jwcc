import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import Table, { TableColumn } from '@/components/table'
import { PriestType } from '@/generated/apis/@types/data-contracts'
import { usePriestHistoryRetrieveQuery } from '@/generated/apis/Priest/Priest.query'

const nativePriestsColumns: TableColumn<PriestType>[] = [
  {
    key: 'name',
    label: '이름',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (nativePriest) => nativePriest.name,
  },
  {
    key: 'baptismalName',
    label: '세례명',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (nativePriest) => nativePriest.baptismalName,
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
  const { data: pastors } = usePriestHistoryRetrieveQuery({})

  if (!pastors) return

  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Text textStyle="pre-heading-1" color="grey.10">
        본당 출신 사제
      </Text>
      <Table
        minW="680px"
        columns={nativePriestsColumns}
        data={pastors}
        getRowKey={(pastor) => pastor.id}
      />
    </Box>
  )
}

export default AboutHistoryNativePriestSection
