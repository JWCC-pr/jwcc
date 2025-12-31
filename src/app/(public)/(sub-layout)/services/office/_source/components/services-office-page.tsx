import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import Banner from '@/app/(public)/(sub-layout)/_source/components/banner'

import InfoList from '../../../_source/components/info-list'

const officeWorkTimes = [
  {
    label: '평일',
    value: '오전 9시 ~ 오후 6시',
  },
  {
    label: '토요일',
    value: '오전 9시 ~ 미사 종료 시',
  },
  {
    label: '주일',
    value: '오전 9시 ~ 미사 종료 시',
  },
  {
    label: '휴게시간 및 휴무일',
    value: (
      <Box display="flex" flexDirection="column" gap="6px">
        <Text textStyle="pre-body-4" color="grey.10">
          점심시간 낮 12시 30분 ~ 오후 2시
          <br />
          월요일 및 공휴일, 대체공휴일, 근로자의 날 휴무
        </Text>
        <Text textStyle="pre-body-6" color="grey.8">
          ※ 단, 대축일 및 설, 추석 등 교회 전례행사에 특별한 사정이 있을 때는
          정상근무
        </Text>
      </Box>
    ),
  },
]

const ServicesOfficePage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="56px">
      <Banner
        content={
          <Text textStyle="pre-caption-1" color="grey.0">
            교회법에 근거하여 본당 공동체를 위해 운영되고 있으며,
            <br />
            세례, 견진, 혼인, 병자, 고해성사 관련 교적을 관리하고
            <br />
            본당의 각종 기록을 체계적으로 등록, 보관 및 보존합니다.
          </Text>
        }
        image={{
          pc: '/images/services/office/p-banner.png',
          tablet: '/images/services/office/t-banner.png',
          mobile: '/images/services/office/m-banner.png',
        }}
      />

      <Box display="flex" flexDirection="column" gap="24px">
        <InfoList items={officeWorkTimes} />

        <Box
          p="20px 24px"
          display="flex"
          flexDirection="column"
          gap="10px"
          rounded="10px"
          bgColor="background.basic.2"
        >
          <Box display="flex" flexDirection="column" gap="8px">
            <Box display="flex" gap="10px">
              <Text w="120px" textStyle="pre-body-5" color="grey.7">
                사무실 연락처
              </Text>
              <Text textStyle="pre-body-4" color="grey.10">
                02-595-2416
              </Text>
            </Box>
            <Box display="flex" gap="10px">
              <Text w="120px" textStyle="pre-body-5" color="grey.7">
                선종, 장례 문의
              </Text>
              <Text textStyle="pre-body-4" color="grey.10">
                사무실로 연락 주시기 바랍니다.
              </Text>
            </Box>
          </Box>
          <Text textStyle="pre-body-6" color="grey.8">
            사무실 근무시간 외 급한 용무가 있으신 분은 관리실(성모동산 옆 교육관
            1층)에서 안내받으시기 바랍니다.
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default ServicesOfficePage
