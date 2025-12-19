'use client'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'

import FileDown from '@/components/file-down'
import { WeeklyBulletinType } from '@/generated/apis/@types/data-contracts'

interface NewsBullentinDetailHeaderSectionProps {
  bulletin: Pick<
    WeeklyBulletinType,
    'title' | 'file' | 'createdAt' | 'hitCount'
  >
}

const NewsBullentinDetailHeaderSection: React.FC<
  NewsBullentinDetailHeaderSectionProps
> = ({ bulletin }) => {
  return (
    <Box
      py="20px"
      display="flex"
      flexDirection="column"
      gap="10px"
      alignItems="flex-start"
    >
      <Text textStyle="pre-heading-2" color="grey.10">
        {bulletin.title}
      </Text>
      <Box display="flex" gap="10px" alignItems="center">
        <Text textStyle="pre-caption-2" color="grey.7">
          {format(bulletin.createdAt, 'yyyy-MM-dd')}
        </Text>
        <Box display="flex" gap="4px" alignItems="center">
          <Text textStyle="pre-caption-2" color="grey.7">
            조회
          </Text>
          <Text textStyle="pre-caption-2" color="grey.7">
            {bulletin.hitCount}
          </Text>
        </Box>
      </Box>
      <FileDown path={bulletin.file} />
    </Box>
  )
}

export default NewsBullentinDetailHeaderSection
