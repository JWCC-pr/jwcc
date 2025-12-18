import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import { format } from 'date-fns/format'
import { ko } from 'date-fns/locale'

import { PassingNoticeType } from '@/generated/apis/@types/data-contracts'

const formatDate = (
  date: string,
  formatString = 'yyyy년 MM월 dd일 (EEE), HH:mm',
) => {
  return format(new Date(date), formatString, { locale: ko })
}

interface NewsPassingNoticeDetailInfoSectionProps {
  passingNotice: Pick<
    PassingNoticeType,
    | 'name'
    | 'baptismalName'
    | 'age'
    | 'passingAt'
    | 'funeralStartAt'
    | 'funeralEndAt'
    | 'encoffinmentAt'
    | 'departureAt'
    | 'funeralMassAt'
    | 'funeralMassLocation'
    | 'funeralHallAddress'
    | 'chiefMourner'
  >
}

const NewsPassingNoticeDetailInfoSection: React.FC<
  NewsPassingNoticeDetailInfoSectionProps
> = ({ passingNotice }) => {
  const rename1 = [
    { label: '고인 성함', value: passingNotice.name },
    { label: '세례명', value: passingNotice.baptismalName },
    { label: '나이', value: passingNotice.age + '세' },
  ]
  const rename2 = [
    { label: '선종일시', value: formatDate(passingNotice.passingAt) },
    {
      label: '장례 기간',
      value:
        formatDate(passingNotice.funeralStartAt, 'yyyy년 MM월 dd일 (EEE)') +
        ' ~ ' +
        formatDate(passingNotice.funeralEndAt, 'yyyy년 MM월 dd일 (EEE)'),
    },
    { label: '입관 일정', value: formatDate(passingNotice.encoffinmentAt) },
    { label: '발인 일정', value: formatDate(passingNotice.departureAt) },
    { label: '장례미사 일정', value: formatDate(passingNotice.funeralMassAt) },
    { label: '장례 미사 장소', value: passingNotice.funeralMassLocation },
    { label: '빈소 위치', value: passingNotice.funeralHallAddress },
    { label: '상주', value: passingNotice.chiefMourner },
  ]

  return (
    <Box py="24px" display="flex" flexDirection="column" gap="20px">
      <Box display="flex" flexFlow="column" gap="8px">
        {rename1.map((item) => (
          <Box key={item.label} display="flex" gap="10px">
            <Text w="80px" textStyle="pre-body-5" color="grey.7">
              {item.label}
            </Text>
            <Text textStyle="pre-body-4" color="grey.10">
              {item.value}
            </Text>
          </Box>
        ))}
      </Box>

      <Box
        p="20px 24px"
        rounded="10px"
        bgColor="background.basic.2"
        display="flex"
        flexDirection="column"
        gap="8px"
      >
        {rename2.map((item) => (
          <Box key={item.label} display="flex" gap="10px">
            <Text w="120px" textStyle="pre-body-5" color="grey.7">
              {item.label}
            </Text>
            <Text textStyle="pre-body-4" color="grey.10">
              {item.value}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default NewsPassingNoticeDetailInfoSection
