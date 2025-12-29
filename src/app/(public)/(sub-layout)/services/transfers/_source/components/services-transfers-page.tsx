'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'
import { ArrowDownIcon, ArrowRightIcon, LinkIcon } from '@phosphor-icons/react'

import MassSection from '@/app/(public)/(home-layout)/_source/components/sections/notice-and-mass-section/mass-section'
import { ROUTES } from '@/constants/routes'
import { useIsBreakpoint } from '@/hooks/use-is-breakpoint'

import InfoList from '../../../_source/components/info-list'

/** 본당 사제 / 수도자 */
const parishClergyInfos = [
  {
    label: '사제',
    value: (
      <Box display="flex" gap="6px">
        <Text flex="1" textStyle="pre-body-4" color="grey.10">
          주임신부
          <br />
          부주임신부
          <br />
          보좌신부
        </Text>
        <Text flex="1" textStyle="pre-body-4" color="grey.10">
          박상수 바오로
          <br />
          문필정 바실리오
          <br />
          황준호 자선토마스
        </Text>
      </Box>
    ),
  },
  {
    label: '수도자',
    value: (
      <Box display="flex" gap="6px">
        <Text flex="1" textStyle="pre-body-4" color="grey.10">
          원장수녀
          <br />
          청소년 담당수녀
          <br />
          전례 담당수녀
        </Text>
        <Text flex="1" textStyle="pre-body-4" color="grey.10">
          최 스페스
          <br />
          윤 데니스
          <br />허 에녹
        </Text>
      </Box>
    ),
  },
]
/** 사무실 안내 */
const officeInfos = [
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
    value: '오전 6시 ~ 미사 종료 시',
  },
  {
    label: '휴게시간 및 휴무일',
    value: (
      <Box display="flex" flexFlow="column nowrap" gap="6px">
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

const ServicesTransfersPage: React.FC = () => {
  const isMobile = useIsBreakpoint('max', 768)

  return (
    <Box display="flex" flexDirection="column" gap="56px">
      <Text textStyle="pre-body-4" color="grey.10">
        잠원동성당에 전입해 오신 교우 여러분, 환영합니다.
        <br />
        전입교우께서는 본당 사무실을 방문해 전입신고를 해주시기 바랍니다.
      </Text>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-1" color="grey.10">
          전입신고 절차
        </Text>
        <Box
          p="20px 24px"
          display="flex"
          flexDirection={['column', 'row']}
          gap="20px"
          alignItems="center"
          rounded="10px"
          bgColor="background.basic.2"
        >
          <Text
            flex="1"
            textStyle="pre-body-4"
            color="grey.10"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            사무실 내방
            <br />
            (성명, 세례명, 전출 본당, 주소, 전화번호 필요)
          </Text>
          {isMobile ?
            <ArrowDownIcon size="24px" color="#9FA4A9" />
          : <ArrowRightIcon size="24px" color="#9FA4A9" />}
          <Text
            flex="1"
            textStyle="pre-body-4"
            color="grey.10"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            구역 및 반 확인
          </Text>
          {isMobile ?
            <ArrowDownIcon size="24px" color="#9FA4A9" />
          : <ArrowRightIcon size="24px" color="#9FA4A9" />}
          <Text
            flex="1"
            textStyle="pre-body-4"
            color="grey.10"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            교무금 통장 발급
          </Text>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <MassSection hasTitlePadding={false} />
        <Box
          p="20px 24px"
          display="flex"
          flexDirection="column"
          gap="8px"
          rounded="10px"
          bgColor="background.basic.2"
        >
          {[
            {
              label: '성모신심미사',
              description: '매월 첫 토요일 오전 10시',
            },
            {
              label: '성경미사',
              description: '매주 화요일 오전 10시',
            },
            {
              label: '성시간',
              description: '매월 첫 목요일 오후 7시 미사 후',
            },
          ].map((item) => (
            <Box key={item.label} display="flex" gap="10px" alignItems="center">
              <Text
                alignSelf="flex-start"
                flexShrink="0"
                w={['90px', '120px']}
                textStyle="pre-body-5"
                color="grey.7"
              >
                {item.label}
              </Text>
              <Text textStyle="pre-body-4" color="grey.10">
                {item.description}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-1" color="grey.10">
          본당 사제 / 수도자
        </Text>
        <InfoList items={parishClergyInfos} isFlexibleWidth />
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-1" color="grey.10">
          사목협의회
        </Text>
        <Text textStyle="pre-body-4" color="grey.10">
          사목협의회는 사제와 수도자, 총회장, 총무, 분과장들로 구성되어 있으며
          본당의 사목 관련 주요 업무를 논의하고 추진하는 평신도 사목기구입니다.
          <br />
          사목협의회 모든 단체의 문은 본당 교우 여러분께 활짝 열려 있습니다.
          <br />
          단체 가입이나 활동에 대한 문의는 본당 사무실로 해 주시기 바랍니다.
        </Text>
        <Link
          href={ROUTES.COMMUNITY_PASTORAL_COUNCIL}
          _hover={{ textDecoration: 'none' }}
        >
          <Button size="md" variant="solid" colorPalette="grey" disabled>
            <LinkIcon size="20px" color="#4E5053" />
            사목협의외 페이지 바로가기
          </Button>
        </Link>
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-1" color="grey.10">
          사무실 안내
        </Text>
        <InfoList items={officeInfos} />
        <Box
          p="20px 24px"
          display="flex"
          flexDirection="column"
          gap="10px"
          rounded="10px"
          bgColor="background.basic.2"
        >
          <Box display="flex" flexFlow="column nowrap" gap="8px">
            <Box display="flex" gap="10px">
              <Text
                flexShrink="0"
                w={['90px', '120px']}
                textStyle="pre-body-5"
                color="grey.7"
              >
                사무실 연락처
              </Text>
              <Text textStyle="pre-body-4" color="grey.10">
                02-595-2416
              </Text>
            </Box>
            <Box display="flex" gap="10px">
              <Text
                flexShrink="0"
                w={['90px', '120px']}
                textStyle="pre-body-5"
                color="grey.7"
              >
                선종, 장례 문의
              </Text>
              <Text textStyle="pre-body-4" color="grey.10">
                사무실로 연락 주시길 바랍니다.
              </Text>
            </Box>
          </Box>
          <Text textStyle="pre-body-6" color="grey.8">
            사무실 근무시간 외 급한 용무가 있으신 분은 관리실(성모동산 옆 교육관
            1층)에서 안내받으시기 바랍니다.
          </Text>
        </Box>
        <Text textStyle="pre-body-4" color="grey.10">
          교회법에 근거하여 본당 공동체를 위해 운영되고 있으며, 세례, 견진,
          혼인, 병자, 고해성사 관련 교적을 관리하고 본당의 각종 기록을
          체계적으로 등록, 보관 및 보존합니다.
        </Text>
      </Box>
    </Box>
  )
}

export default ServicesTransfersPage
