import { Box } from '@chakra-ui/react/box'
import { Text } from '@chakra-ui/react/text'

import InfoList from '../../../_source/components/info-list'
import ServicesCatechumenInfoSection from './services-catechumen-info-section'

const stepTwoList = [
  {
    title: `신앙에 동의한다는 점에서:`,
    description: `신앙을 아직 자신의 신념으로 받아 들이지는 못했어도, 배워 보려는 의향 자체는 이미 첫발을 내딛은 것입니다.\n그래서 예비 신자 명단에 오른 사람들은 이미 간접적으로 교회의 일원이 됩니다.\n예를 든다면 예비신자가 혹시 사망할 경우에 모든 의식을 종교적으로 행할 수 있는데 이는 본인의 지향으로 이미 동의를 하였기 때문입니다.`,
  },
  {
    title: `예비 신자에 입적한다는 점에서:`,
    description: `지향의 표현을 서류로 한다는 것은 의미가 있습니다. 자신의 자유로운 행동으로 자신의 의사 표시를 공적인 서류로 한 것입니다.\n출석표나 예비 신자 출석 카드 등이 이에 속합니다. 가톨릭은 예비신자들에게 예비기간에는 항상 예비 신자 카드를 갖고 다니기를 권합니다.\n그래서 주일에 간혹 다른 성당에 가서 미사에 참여한 후에 그 성당에서 확인을 받게 하는 것은 이미 예비신자 교육으로 일반화되어 있습니다.`,
  },
]
const stepThreeList = [
  {
    title: `신념의 결단을 위하여:`,
    description: `예비 기간을 두는 것은 인간이 인격적 행위로 신과 연관된 삶을 정하도록 돕는데 있습니다.\n가톨릭은 인간의 현세 생활을 위해 복과 풍요로움을 위한 인간 중심적 종교는 아닙니다. 가톨릭 종교의 중심이 되며 기둥이 되는 내용은 하느님입니다.\n예비 기간은 하느님의 뜻을 듣고 배워 동의를 하며 결심하여 마음이 굳어지도록 하는 기간입니다.`,
  },
  {
    title: `자신의 생활 변화를 위하여:`,
    description: `빨리 뜨거워지는 것은 빨리 식는 법이라는 말이 있습니다.\n인간이 감정적 동물이라고 해서 종교적 생활을 감정적으로 하는 것은 위험하고도 유치한 유아적 모습입니다.\n가톨릭에서는 인간적 요소를 무시하는 것은 아니지만 인간의 핵심은 이성이나 지성 그리고 감정을 주관하는 자아의식 능력이라고 봅니다.\n종교생활 역시 습관을 통하여 서서히 단계적으로 발전하는 것이 바람직합니다.\n그러나 간혹 신의 부르심은 한 순간에 누구에게 와 닿을 수도 있으나 이는 신의 자유로운 방법이지 인간의 방법으로 볼 수는 없습니다.`,
  },
  {
    title: `교회의 일치를 위하여:`,
    description: `사도로부터 2,000년간 하나로 이어져 내려온 가톨릭의 일치된 모습에서 이미 신비의 나라가 와 있음을 느낄 수 있으리라 봅니다.\n인간들의 주장대로 모든 것이 흔들리기 시작하면 종교들 역시 천태만상의 형태로 변할 수밖에 없는 일입니다.`,
  },
]
const stepFourList = [
  {
    title: `교회의 일반 상식:`,
    description: `종교 생활도 인간 사회의 일면입니다. 어떤 사회이든 그 사회의 분위기가 있게 마련입니다.\n더구나 오랜 기간 동안에 형성된 종교적 풍습과 전통이 있는 것은 당연합니다.\n간혹 이상하게 느낄 수 있는 면이 있다해도 그 하나 하나에는 생기게 된 동기나 뜻이 있습니다.`,
  },
  {
    title: `신앙인들의 생활:`,
    description: `신앙인들은 이 세상이 일치와 평화를 이루도록 하기 위한 생활을 익혀 나가야 합니다.\n하루의 생활이나 1주일간의 생활, 1년의 생활 그리고 죽음에 이르는 인생의 완성을 향한 삶을 배워 나가는 것이 참 신앙인의 생활입니다.`,
  },
  {
    title: `교회의 전례생활:`,
    description: `본당의 공동체 생활은 가정생활과 개인생활에 연결되어 예절바른 생활로 하느님을 모시고 사는 생활입니다.\n교회의 전례생활은 가톨릭에서 특히 강조하는 생활입니다. 사실 개인의 편의만을 주장하며 산다면 이 세상에 평화와 안녕은 힘을 잃고 맙니다.\n하느님을 의식한다는 뜻은 보잘것없는 이웃을 의식한다는 말과도 통합니다. 이런 생활은 하느님 앞에서 예절이 바른 행동이라 볼 수 있습니다.\n이와 같은 생활을 하노라면 또 하나의 세계를 맛보며 사는 기분을 느끼게 됩니다.\n바로 새 세상, 하느님 나라의 생활을 알게 됩니다.`,
  },
  {
    title: `교리(敎理) 사항들:`,
    description: `교회의 이론들을 배웁니다. 교회의 인간관, 신관, 구원론, 성경의 의미, 믿어야 할 내용들\n즉, 하느님이신 창조주의 섭리를 통해 가르치심을 받은 내용들을 인간의 지성으로 발전시킨 내용들을 배우는 일입니다.\n이러한 내용들은 일반 사회교육의 내용과는 전혀 다른 분야들로 사물을 초월한 내용들입니다.\n일반적으로 사회인들은 상식으로 생활을 엮어가는 것을 강조하지만 그 주장이 확고하고 영원한 진리일 수는 없습니다.\n그래서 때로는 고집스러운 삶에 몰리기도 합니다. 그러나 신앙인들은 불멸하는 진리를 배워 믿음으로 의지의 힘으로 생활해 나가야 합니다.\n이러한 진리는 창조주의 섭리적 계시와 인류의 깊은 현명이 맞닿아 익혀진 내용들입니다. 무조건 광신적으로 무책임하게 받아들이는 것은 피해야 합니다.\n하느님은 우리에게 자유를 주었고 지혜를 주어 우리가 책임을 진다는 것도 계시의 바탕을 이룹니다.\n그래서 신앙인의 생활태도는 세상의 대표자로서의 자세를 객관적으로 취하며 산다는 것을 말합니다.`,
  },
]
const stepFiveList = [
  {
    title: `대부모(代父母)선정:`,
    description: `가톨릭에서는 모든 세례자(洗禮者)와 견진자(堅振者)들에게 대부모를 정하게 합니다.\n이는 영적으로 새로 태어나는 상태에서 부모와 자녀의 영적 연결을 맺어주는 것입니다.\n기성 신자들이 적은 한국의 실정에서는 남자는 대부만, 여자는 대모만을 정하게 하고 있습니다.\n외국의 경우는 대부, 대모 두 분을 정하도록 하고 있습니다.`,
  },
  {
    title: `세례명을 정함:`,
    description: `이는 신앙인으로 거룩하게 살다 간 신자들의 이름을 자신의 세례명으로 쓰는 것입니다.\n이런 신앙 생활을 한 사람들을 성인이라 하는데, 이는 교회가 그들이 죽은 후 초자연적 현상으로 판단된 기적을 참작하여 신앙의 모범자들로 공식 발표한 분들입니다.\n이렇게 성인들의 이름을 자신이 사용함으로 그 성인을 본받으려는 마음을 지니게 하는 것입니다.`,
  },
  {
    title: `교적 입적, 교무금 책정:`,
    description: `교회에 적을 둠으로 신앙 생활의 직접적 연결을 갖게 되는 것입니다.\n혼인이나 사망이나 기타 종교의식 외에도 종교 내의 서류 제반에 행정적 연결이 되기 위함입니다.\n교무금은 하느님 나라의 발전이 세상에서 이루어지기 위하여 자신이 경제적으로 일부를 바치는 약속입니다.\n그러나 가톨릭에서는 십일조를 의무 사항으로 강요하지는 않습니다. 자신의 자원(성의)으로 책정하는 것을 바라고 있습니다.`,
  },
]
const infoList = [
  {
    label: '목요일반',
    value: (
      <Box display="flex" flexDirection="column" gap="6px">
        <Text textStyle="pre-body-4" color="grey.10">
          오전 10시 30분 ~ 오전 11시 30분 (1시간)
        </Text>
        <Text textStyle="pre-body-6" color="grey.8">
          교리 지도 : 원장수녀
        </Text>
      </Box>
    ),
  },
  {
    label: '토요일반',
    value: (
      <Box display="flex" flexDirection="column" gap="6px">
        <Text textStyle="pre-body-4" color="grey.10">
          오후 5시 ~ 오후 6시 (1시간)
        </Text>
        <Text textStyle="pre-body-6" color="grey.8">
          교리 지도 : 부주임신부
        </Text>
      </Box>
    ),
  },
]

const ServicesCatechumenPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="56px">
      <Box
        p="20px 24px"
        display="flex"
        flexDirection="column"
        gap="10px"
        bgColor="background.basic.2"
        rounded="10px"
      >
        <Text textStyle="cat-heading-2" color="grey.10">
          고생하며 무거운 짐을 진 너희는 모두 나에게 오너라.
        </Text>
        <Text textStyle="pre-body-6" color="grey.6">
          (마태 11,28)
        </Text>
      </Box>

      <Text textStyle="pre-body-4" color="grey.10">
        천주교 신자가 되시려면 세례를 받아야 합니다. 세례를 받으려면 천주교의
        교리와 교회 생활에 대하여 소정의 교육을 받아야 하며
        <br />
        세례 후에는 교회의 구성원인 신자로서 하느님의 은총 안에서 맡겨주신
        사명을 다하며 생활하게 됩니다.
        <br />
        <br />
        신자가 되기 위한 이 교육을 &apos;예비 신자 교리&apos;라고 하며, 각
        성당(본당)에서는 신부님, 수녀님, 교리교사들이 가르치고 있으며 교육
        기간은 대략 6개월 정도입니다.
        <br />
        <br />
        천주교 신자는 누구나 성당(천주교의 일정한 신자 공동체로서 신부님이
        상주하며 신자들을 보살피는 지역)에 소속되며,
        <br />
        따라서 천주교에 입교하시려면 자기가 거주하는 곳을 관할하는 성당(본당)에
        먼저 찾아가시면 됩니다.
        <br />각 본당 사무실에 가시면 입교 및 &apos;예비 신자 교리&apos;에 대한
        자세한 안내를 받으실 수 있습니다.
      </Text>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-2" color="grey.10">
          1. 예비신자 교리반
        </Text>
        <Text textStyle="pre-body-4" color="grey.10">
          모든 본당에는 예비신자를 위한 교리반이 있습니다. 신앙을 갖는다는 것은
          신념을 지닌다는 것이며,
          <br />
          이 신념은 자신이 사는 자세와 직결되어야 하므로 종교는 단순한 동의나
          호기심 또는 친지와의 의리나 강요로 간단히 받아들일 문제는 아닙니다.
          <br />
          종교 생활은 신중히 생각하고 결정해야 합니다. 아직 철이 나기 이전의
          어린 아기들에 대해서는 교회에서는 부모들에게 훗날 잘 교육하겠다는
          책임을 다짐받고 세례를 주고 있습니다.
          <br />
          현재 가톨릭에서는 일반적으로 60시간 전후의 교리 수업을 받아야 세례를
          받게 합니다. 시간만이 아니라 그 기간도 최소 6개월 정도에서 1년 또는 그
          이상일 경우도 있습니다.
          <br />
          그리고 일반적으로 교리 수업이 끝난 후에는 세례를 주례할 사제(주로 본당
          주임신부)에게 배운 것에 대한 확인을 받고 허락을 얻어야 합니다.
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-2" color="grey.10">
          2. 예비 기간의 의의
        </Text>
        {stepTwoList.map((item) => (
          <ServicesCatechumenInfoSection
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-2" color="grey.10">
          3. 교회의 일원인 예비신자
        </Text>
        {stepThreeList.map((item) => (
          <ServicesCatechumenInfoSection
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-2" color="grey.10">
          4. 익혀가야 할 내용들
        </Text>
        {stepFourList.map((item) => (
          <ServicesCatechumenInfoSection
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-2" color="grey.10">
          5. 세례 받기 전에 준비할 사항
        </Text>
        {stepFiveList.map((item) => (
          <ServicesCatechumenInfoSection
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-2" color="grey.10">
          예비자 교리반 운영 안내
        </Text>
        <Text textStyle="pre-body-4" color="grey.10">
          연중 1~2회 모집되며 약 6개월 간의 교리과정을 거쳐 세례성사를 받게
          됩니다.
        </Text>
        <InfoList items={infoList} isFlexibleWidth />
        <Box
          p="20px 24px"
          display="flex"
          gap="10px"
          rounded="10px"
          bgColor="background.basic.2"
        >
          <Text textStyle="pre-body-5" color="grey.7" w="120px">
            예비신자 교리반
            <br />
            접수 및 문의
          </Text>
          <Text textStyle="pre-body-4" color="grey.10">
            잠원동성당 사무실
            <br />
            (02-595-2416)
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default ServicesCatechumenPage
