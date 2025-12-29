import { Box } from '@chakra-ui/react/box'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

import Banner from '@/app/(public)/(sub-layout)/_source/components/banner'

import InfoList from '../../../_source/components/info-list'

const infoList = [
  {
    label: '사진',
    value: (
      <Box display="flex" flexDirection="column" gap="6px">
        <Box display="flex" gap="6px" flexDirection={['column', 'row']}>
          <Box flex="1" display="flex" flexDirection="column" gap="2px">
            <Text textStyle="pre-body-5" color="grey.10">
              레브 포토그래피 (임정은)
            </Text>
            <Text textStyle="pre-body-4" color="grey.10">
              <a href="tel:02-511-3131">02-511-3131</a>
              <br />
              <a href="tel:010-2355-9008">010-2355-9008</a>
            </Text>
          </Box>
          <Box flex="1" display="flex" flexDirection="column" gap="2px">
            <Text textStyle="pre-body-5" color="grey.10">
              올제스튜디오 (임미선 대표)
            </Text>
            <Text textStyle="pre-body-4" color="grey.10">
              <a href="tel:02-3453-2003">02-3453-2003</a>
              <br />
              <a href="tel:010-8723-3340">010-8723-3340</a>
            </Text>
          </Box>
        </Box>
        <Text textStyle="pre-body-6" color="grey.8">
          사진은 2개 지정업체 중{' '}
          <Text as="u" textUnderlinePosition="under">
            1개 업체 선택 후 직접 업체로 연락
          </Text>
          하여 예약하시면 됩니다.
        </Text>
      </Box>
    ),
  },
  {
    label: '꽃장식',
    value: (
      <Box display="flex" flexDirection="column" gap="6px">
        <Box display="flex" gap="6px" flexDirection={['column', 'row']}>
          <Box flex="1" display="flex" flexDirection="column" gap="2px">
            <Text textStyle="pre-body-5" color="grey.10">
              스타일엔(김성아)
            </Text>
            <Text textStyle="pre-body-4" color="grey.10">
              <a href="tel:010-2783-8789">010-2783-8789</a> 생화
              <br />
              60만원
            </Text>
          </Box>
        </Box>
        <Text textStyle="pre-body-6" color="grey.8">
          신부대기실 꽃장식 꾸밈은{' '}
          <Text as="u" textUnderlinePosition="under">
            지정업체로 직접 연락하여 예약
          </Text>
          하시면 됩니다.
        </Text>
      </Box>
    ),
  },
  {
    label: '식사',
    value: (
      <Box display="flex" flexDirection="column" gap="6px">
        <Box display="flex" gap="6px" flexDirection={['column', 'row']}>
          <Box flex="1" display="flex" flexDirection="column" gap="2px">
            <Text textStyle="pre-body-5" color="grey.10">
              한스로얄뷔페 (김진수 전무)
            </Text>
            <Text textStyle="pre-body-4" color="grey.10">
              <a href="tel:02-777-9964">02-777-9964</a>
              <br />
              <a href="tel:010-9037-2513">010-9037-2513</a>
            </Text>
          </Box>
        </Box>
        <Text textStyle="pre-body-6" color="grey.8">
          ※ 최소 예약 인원 : 200명 이상
        </Text>
      </Box>
    ),
  },
]

const ServicesMarriagePage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="56px">
      <Banner
        content={
          <Text textStyle="pre-caption-1" color="grey.0">
            혼인미사를 받고자 하시는 예비 부부를 진심으로 축하드리오며
            <br />
            주님의 은총이 충만하시길 기원합니다.
            <br />
            일생을 두고 잊지 못할 거룩하고 기쁜 순간이 될 하느님 안에서
            <br />
            사랑의 언약을 성대하고 거룩하게 거행하려는 두 분의 뜻에
            <br />
            합당하도록 본당에서는 아래와 같이 안내드립니다.
          </Text>
        }
        image={{
          pc: '/images/services/marriage/p-banner.png',
          tablet: '/images/services/marriage/t-banner.png',
          mobile: '/images/services/marriage/m-banner.png',
        }}
      />

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-2" color="grey.10">
          1. 혼인미사 신청
        </Text>
        <Text textStyle="pre-body-4" color="grey.10">
          혼인 날짜를 확정하신 후 직접 방문 접수하셔야 합니다. (예약금 40만원)
        </Text>
        <Box
          p="20px 24px"
          display="flex"
          flexDirection="column"
          gap="8px"
          rounded="10px"
          bgColor="background.basic.2"
        >
          <Box display="flex" gap="10px">
            <Text
              flexShrink="0"
              w="120px"
              textStyle="pre-body-5"
              color="grey.7"
            >
              예식 일정
            </Text>
            <Text textStyle="pre-body-4" color="grey.10">
              토요일 낮 12시, 오후 3시 (총 2대)
            </Text>
          </Box>
          <Box display="flex" gap="10px">
            <Text
              flexShrink="0"
              w="120px"
              textStyle="pre-body-5"
              color="grey.7"
            >
              피로연장 사용 안내
            </Text>
            <Text textStyle="pre-body-4" color="grey.10">
              지하1층 연회실 (400명 이상 예약 시 지하 강당 개방)
            </Text>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-2" color="grey.10">
          2. 예약 시 이행 조건
        </Text>
        <Box display="flex" flexDirection="column" gap="8px">
          <Text textStyle="pre-heading-4" color="grey.10">
            피로연 / 사진
          </Text>
          <Box
            as="ol"
            textStyle="pre-body-4"
            color="grey.10"
            listStyle="decimal"
            pl="20px"
          >
            <Text as="li">
              피로연, 사진, 신부대기실 꽃꾸밈 업체는 본 성당에서 지정되어
              있습니다.
            </Text>
            <Text as="li">아래 사항은 변경할 수 없습니다.</Text>

            <Box
              as="ul"
              py="8px"
              textStyle="pre-body-4"
              color="grey.10"
              listStyle="disc"
              pl="12px"
            >
              <Text as="li">지정업체 (피로연 / 사진 / 신부대기실 꽃꾸밈)</Text>
              <Text as="li">피로연 장소</Text>
              <Text as="li">혼인 일시</Text>
            </Box>

            <Text as="li">
              성당 안에서는 전례상 외부 사진사 촬영 및 개인적인 동영상 촬영은
              허용되지 않습니다.
            </Text>
            <Text as="li">
              피로연장 사용 시간은 혼인 시작 시간으로부터 2시간 동안입니다.
            </Text>
            <Text as="li">
              예약 시 이행조건이 맞지 않으면 예약이 불가하오니 유념해 주시기
              바랍니다.
            </Text>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          <Text textStyle="pre-heading-4" color="grey.10">
            예식비용
          </Text>
          <Box
            as="ol"
            textStyle="pre-body-4"
            color="grey.10"
            listStyle="decimal"
            pl="20px"
          >
            <Text as="li">
              <Text as="u" textUnderlinePosition="under">
                ‘혼인미사 감사예물’은 본당 신자 120만원 (타 본당 신자 140만원)
              </Text>
              입니다.
            </Text>
            <Text as="li">
              본당 신자 기준은{' '}
              <Text as="u" textUnderlinePosition="under">
                ‘본당에 교적이 있으며, 최근 1년간 교무금을 납부하고 있는 신자’
              </Text>
              에 한합니다.
            </Text>
            <Text as="li">
              <Text as="u" textUnderlinePosition="under">
                계약의 취소 또는 해약의 경우 예약금은 일체 반환되지 않으며,
                감사헌금으로 봉헌
              </Text>
              됩니다. (기부금 영수증 발급)
            </Text>
            <Text as="li">
              <Text as="u" textUnderlinePosition="under">
                주례 감사예물은 혼인 전 주례 신부님께 직접 전달합니다.
              </Text>
            </Text>
            <Text as="li">
              <Text as="u" textUnderlinePosition="under">
                사인펜, 방명록, 축의금 담을 봉투, 식권 등은 사전 뷔페업체와
                협의하며,
              </Text>
              <br />
              <Text as="u" textUnderlinePosition="under">
                뷔페업체를 이용하지 않는 경우 사인펜, 방명록, 축의금 담을 봉투
                등은 혼주 측에서 준비
              </Text>
              하여야 합니다.
            </Text>
            <Text as="li">
              피로연(뷔페) 단가는 1인당{' '}
              <Text as="u" textUnderlinePosition="under">
                49,500원 / 55,000원 / 60,500원(부가세 포함)
              </Text>{' '}
              중 택 1하여야 합니다. (음/주류는 업체와 상의)
            </Text>
          </Box>
          <Text textStyle="pre-body-4" color="grey.10">
            아래 사진, 신부대기실, 피로연 비용은 해당 업체와 협의하시면 됩니다.
          </Text>
        </Box>
        <InfoList items={infoList} isFlexibleWidth />
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-2" color="grey.10">
          3. 혼인 당사자 준비사항
        </Text>
        <Box display="flex" flexDirection="column" gap="8px">
          <Text textStyle="pre-heading-4" color="grey.10">
            혼인 면담
          </Text>
          <Text textStyle="pre-body-4" color="grey.10">
            잠원동성당 교적자 혼인 면담 :
            <br />
            <Text as="u" textUnderlinePosition="under">
              매주 토요일 오후 4시, 면담 2주 전
            </Text>{' '}
            미리 신청하여 신부님과 시간 약속 잡아야 합니다.
          </Text>
        </Box>

        <Box
          p="28px 36px"
          display="flex"
          flexDirection="column"
          gap="12px"
          rounded="10px"
          border="1px solid"
          borderColor="border.basic.1"
        >
          <Text textStyle="pre-body-1" color="grey.8">
            혼인 면담 시 구비서류
          </Text>
          <Box display="flex" gap="8px" flexDirection={['column', 'row']}>
            <Box
              flex="1"
              p="28px 36px"
              display="flex"
              flexDirection="column"
              gap="12px"
              rounded="8px"
              bgColor="primary.1"
            >
              <Text textStyle="pre-body-3" color="primary.4">
                본인들이 사전 직접 준비할 서류
              </Text>
              <Box display="flex" flexDirection="column">
                <Box
                  as="ul"
                  listStyle="disc"
                  pl="20px"
                  textStyle="pre-body-4"
                  color="grey.10"
                >
                  {[
                    <>
                      혼인관계증명서(상세) : 거주지 주민센터 발행 또는 정부24(
                      <Link
                        href="https://www.gov.kr"
                        target="_blank"
                        textDecoration="underline"
                        color="primary.3"
                      >
                        www.gov.kr
                      </Link>
                      ) 발행 (신랑, 신부 각 1통)
                    </>,
                    '세례증명서 원본 (본당에서 발급 가능 / 해외 제외) : 신랑, 신부 각 1통',
                    '혼인강좌 수료증 (혼인교리 시행하는 성당에서 발급)',
                  ].map((item, index) => (
                    <Text as="li" key={index}>
                      {item}
                    </Text>
                  ))}
                </Box>
                <Text textStyle="pre-body-6" color="primary.3">
                  ※ 혼인교리 신청 방법 : 서울대교구 사목국 홈페이지{' '}
                  <Link
                    href="https://www.samok.or.kr"
                    target="_blank"
                    textDecoration="underline"
                    color="primary.3"
                  >
                    www.samok.or.kr
                  </Link>{' '}
                  에서 신청
                </Text>
              </Box>
            </Box>
            <Box
              flex="1"
              p="28px 36px"
              display="flex"
              flexDirection="column"
              gap="12px"
              rounded="8px"
              bgColor="background.basic.2"
            >
              <Text textStyle="pre-body-3" color="primary.4">
                본당 사무실에 와서 작성할 서류
              </Text>
              <Box display="flex" flexDirection="column">
                <Box
                  as="ul"
                  listStyle="disc"
                  pl="20px"
                  textStyle="pre-body-4"
                  color="grey.10"
                >
                  {[
                    '혼인 신청서',
                    '혼인 전 당사자 진술서',
                    <>
                      혼인 허가서 :{' '}
                      <Text as="span" color="accent.red2">
                        교적 본당
                      </Text>
                      에서 발급
                    </>,
                    '(관면혼일 경우) 혼인장애 관면서',
                  ].map((item, index) => (
                    <Text as="li" key={index}>
                      {item}
                    </Text>
                  ))}
                </Box>
                <Text textStyle="pre-body-6" color="primary.3">
                  ※ 혼인교리 신청 방법 : 서울대교구 사목국 홈페이지{' '}
                  <Link
                    href="https://www.samok.or.kr"
                    target="_blank"
                    textDecoration="underline"
                    color="primary.3"
                  >
                    www.samok.or.kr
                  </Link>{' '}
                  에서 신청
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-2" color="grey.10">
          4. 서류 작성 절차
        </Text>
        <Box display="flex" flexDirection="column" gap="8px">
          <Text textStyle="pre-heading-4" color="grey.10">
            본당 신자인 경우
          </Text>
          <Text textStyle="pre-body-4" color="grey.10">
            <Text as="u" textUnderlinePosition="under">
              주례권 위임에 관한 내용이 있으면 면담 시 말씀하시기 바랍니다.
            </Text>
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          <Text textStyle="pre-heading-4" color="grey.10">
            타 본당 신자인 경우
          </Text>
          <Text textStyle="pre-body-4" color="grey.10">
            <Text as="u" textUnderlinePosition="under">
              주례 사제는 반드시 당사자가 직접 섭외
            </Text>
            하셔야 하며,{' '}
            <Text as="u" textUnderlinePosition="under">
              혼인 예정일 1개월 전까지 이를 확정하여 사무실에 통보
            </Text>
            하여야 합니다.
          </Text>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-2" color="grey.10">
          5. 유의 사항
        </Text>
        <Box display="flex" flexDirection="column" gap="12px">
          <Text textStyle="pre-heading-4" color="grey.10">
            혼인 당일 준비할 사항
          </Text>
          <Box display="flex" flexDirection="column" gap="1px">
            {[
              `혼인반지 : 당일 사무실 또는 전례 담당 수녀님이나 미사 해설자에게 30분 전까지 직접 전달`,
              `코사지 꽃과 흰 장갑 (양가 부모님과 신랑,신부 혼인 당사자용)`,
              `남, 여 증인 각 1명 (직계가족 제외, 비신자 가능)`,
              `혼인미사 예약은 본당 신자에게 우선권이 있으며, 혼인 당사자가 타 본당 신자인 경우 주례사제를 모시고 오셔야 합니다.\n특별한 경우 혼인 담당 신부님과 상의해 주례권을 본당(혼인예식)에 위임하실 수 있습니다.`,
            ].map((item, index) => (
              <Box display="flex" key={index}>
                <Text
                  flexShrink="0"
                  w="56px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bgColor="primary.1"
                  textStyle="cat-heading-3"
                  color="primary.4"
                >
                  0{index + 1}
                </Text>
                <Text
                  flex="1"
                  p="16px"
                  textStyle="pre-body-4"
                  color="grey.10"
                  bgColor="background.basic.2"
                  whiteSpace="pre-line"
                >
                  {item}
                </Text>
              </Box>
            ))}
          </Box>
          <Box
            as="ul"
            listStyle="disc"
            pl="20px"
            textStyle="pre-body-4"
            color="grey.10"
          >
            <Text as="li">
              본당 주차장이 협소해 혼주 가족 차량만 주차 가능합니다. 하객들은
              가급적 대중교통을 이용해 주시고, 다른 차량은 인근 공영 주차장을
              이용해 주시기 바랍니다.
            </Text>
            <Text as="li">
              혼인 당사자는 혼인 전에 고해성사를 하여 내적인 준비를 해야 합니다.
            </Text>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          <Text textStyle="pre-heading-4" color="grey.10">
            기타사항
          </Text>
          <Box
            as="ol"
            textStyle="pre-body-4"
            color="grey.10"
            listStyle="decimal"
            pl="20px"
          >
            <Text as="li">
              본당에서는{' '}
              <Text as="span" color="accent.red2">
                화환 및 단체 깃발 거치가 불가합니다.
              </Text>
              <br />
              단, 화분(동양난, 서양난)과 꽃바구니, 헌미(사랑의 쌀)은 접수
              가능합니다.
            </Text>
            <Box
              my="8px"
              p="20px 24px"
              display="flex"
              flexDirection="column"
              gap="8px"
              rounded="10px"
              bgColor="background.basic.2"
              ml="-20px"
            >
              <Text textStyle="pre-body-5" color="grey.7">
                사랑의 쌀 기증 방법
              </Text>
              <Box
                as="ul"
                listStyle="disc"
                pl="20px"
                textStyle="pre-body-4"
                color="grey.10"
              >
                <Text as="li">10만원 (쌀 2포 + 리본값)을 지정 계좌로 입금</Text>
                <Text as="li">
                  우리은행 1005-003-407909 (천주교 잠원동성당)
                </Text>
                <Text as="li">
                  입금증에 송금인 이름을 적어 팩스(02-534-9591) 송부 또는 사무실
                  직접 제출
                </Text>
              </Box>
              <Text textStyle="pre-body-6" color="grey.8">
                ※ 입금계좌 : 우리은행 1005-003-407909 (천주교 잠원동성당)
              </Text>
            </Box>
            <Text as="li">
              기부한 헌미(사랑의 쌀)은 본당 빈첸시오회를 통해 불우이웃을 돕는데
              기증하실 수 있습니다.
            </Text>
            <Text as="li">
              청첩장에는 반드시{' '}
              <Text as="u" textUnderlinePosition="under">
                ‘화환은 정중히 사양하고 헌미(사랑의 쌀)로 대신한다’
              </Text>
              는 문구를 넣어주십시오.
            </Text>
            <Text as="li">
              혼인미사 비용 잔금은 혼인일 2주 전까지 완납해 주시기 바랍니다.
            </Text>
            <Text as="li">
              기부금 영수증 발급을 원하실 경우{' '}
              <Text as="u" textUnderlinePosition="under">
                발급 희망자의 성함으로 비용을 납부하셔야 발급 가능
              </Text>
              합니다.
            </Text>
            <Text as="li">
              개인정보 수집 이용 제공 동의서와 국세청 연말정산 간소화 서비스를
              위한 주민등록번호 수집 동의서를 미리 작성해 주시기 바랍니다.
            </Text>
          </Box>
        </Box>
        <Box
          p="20px 24px"
          display="flex"
          flexDirection="column"
          gap="8px"
          rounded="10px"
          bgColor="background.basic.2"
        >
          <Box display="flex" gap="10px">
            <Text w="120px" textStyle="pre-body-5" color="grey.7">
              혼인성사 문의
            </Text>
            <Text textStyle="pre-body-4" color="grey.10">
              잠원동성당 사무실
              <br />
              (02-595-2416)
            </Text>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="24px"></Box>
    </Box>
  )
}

export default ServicesMarriagePage
