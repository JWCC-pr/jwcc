'use client'

import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { usePriestListQuery } from '@/generated/apis/Priest/Priest.query'
import { useReligiousListQuery } from '@/generated/apis/Religious/Religious.query'

import AboutPriestsList from './about-priests-list'

const AboutPriestsPage: React.FC = () => {
  const { data: priests } = usePriestListQuery({
    variables: {
      query: {
        offset: 0,
        limit: 3,
      },
    },
  })
  const { data: religiouses } = useReligiousListQuery({
    variables: {
      query: {
        offset: 0,
        limit: 3,
      },
    },
  })

  // FIXME: 스켈레톤
  if (!priests || !religiouses) return null
  if (!priests.results || !religiouses.results) return null

  return (
    <Box display="flex" flexDirection="column" gap="56px">
      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-1" color="grey.10">
          본당 사제
        </Text>
        <AboutPriestsList
          lists={priests.results.map((priest) => ({
            ...priest,
            startDate: priest.ordinationDate,
          }))}
        />
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-1" color="grey.10">
          본당 수도자
        </Text>
        <AboutPriestsList lists={religiouses.results} />
      </Box>
    </Box>
  )
}

export default AboutPriestsPage
