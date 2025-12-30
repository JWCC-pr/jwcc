'use client'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns'

import Table, { TableColumn } from '@/components/table'
import { ReligiousHistoryType } from '@/generated/apis/@types/data-contracts'
import { useReligiousHistoryListQuery } from '@/generated/apis/ReligiousHistory/ReligiousHistory.query'

const religiousColumns: TableColumn<ReligiousHistoryType>[] = [
  {
    key: 'category',
    label: '구분',
    width: { type: 'fixed', value: 160 },
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
    render: (religious) => {
      const startDate = format(
        new Date(religious.startDate ?? ''),
        'yyyy.MM.dd',
      )
      const endDate =
        religious.endDate === '9999-12-31' ?
          '현재'
        : format(new Date(religious.endDate ?? ''), 'yyyy.MM.dd')

      return `${startDate} - ${endDate}`
    },
  },
]

const AboutHistoryReligiousSection: React.FC = () => {
  const { data: religiouses } = useReligiousHistoryListQuery({})

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
