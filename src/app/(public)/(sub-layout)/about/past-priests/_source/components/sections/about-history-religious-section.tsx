'use client'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns'

import Table, { TableColumn } from '@/components/table'
import { ReligiousType } from '@/generated/apis/@types/data-contracts'
import { useReligiousHistoryRetrieveQuery } from '@/generated/apis/Religious/Religious.query'

const religiousColumns: TableColumn<ReligiousType>[] = [
  {
    key: 'category',
    label: '구분',
    width: { type: 'fixed', value: 120 },
    textAlign: 'center',
    render: (religious) => religious.category || '',
  },
  {
    key: 'name',
    label: '성함',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (religious) => religious.name,
  },
  {
    key: 'baptismalName',
    label: '세례명',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (religious) => religious.baptismalName,
  },
  {
    key: 'startDate',
    label: '재임기간',
    width: { type: 'flex', value: 1 },
    textAlign: 'center',
    render: (religious) =>
      `${format(new Date(religious.startDate ?? ''), 'yyyy.MM.dd')} - ${format(new Date(religious.endDate ?? ''), 'yyyy.MM.dd')}`,
  },
]

const AboutHistoryReligiousSection: React.FC = () => {
  const { data: religiouses } = useReligiousHistoryRetrieveQuery({})

  if (!religiouses) return

  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <Text textStyle="pre-heading-1" color="grey.10">
        역대 수도자
      </Text>
      <Table
        minW="680px"
        columns={religiousColumns}
        data={religiouses}
        getRowKey={(religious) => religious.id}
      />
    </Box>
  )
}

export default AboutHistoryReligiousSection
