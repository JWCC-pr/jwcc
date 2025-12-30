'use client'

import { useCallback, useState } from 'react'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Image } from '@chakra-ui/react/image'
import { Spinner } from '@chakra-ui/react/spinner'
import { Text } from '@chakra-ui/react/text'
import { DownloadSimpleIcon } from '@phosphor-icons/react'

import JSZip from 'jszip'

import { toaster } from '@/components/ui/toaster'
import {
  AboutSymbolLogo1Icon,
  AboutSymbolLogo2Icon,
  AboutSymbolLogo3Icon,
} from '@/generated/icons/MyIcons'

// 폴더별 파일 목록 정의
const FOLDER_FILES = {
  녹색: [
    '3.잠원동성당_로고_녹색_기본.jpg',
    '3.잠원동성당_로고_녹색_반전.jpg',
    '3.잠원동성당_로고_녹색_변형_1.jpg',
    '3.잠원동성당_로고_녹색_변형_2.jpg',
    '3.잠원동성당_로고_녹색_변형_3.jpg',
    '3.잠원동성당_로고_녹색_변형_4.jpg',
    '3.잠원동성당_로고_녹색_변형_5.jpg',
  ],
  적색: [
    '1.잠원동성당_로고_적색_기본.jpg',
    '1.잠원동성당_로고_적색_반전.jpg',
    '1.잠원동성당_로고_적색_변형_1.jpg',
    '1.잠원동성당_로고_적색_변형_2.jpg',
    '1.잠원동성당_로고_적색_변형_3.jpg',
    '1.잠원동성당_로고_적색_변형_4.jpg',
    '1.잠원동성당_로고_적색_변형_5.jpg',
  ],
  흑색: [
    '2.잠원동성당_로고_흑색_기본.jpg',
    '2.잠원동성당_로고_흑색_반전.jpg',
    '2.잠원동성당_로고_흑색_변형_1.jpg',
    '2.잠원동성당_로고_흑색_변형_2.jpg',
    '2.잠원동성당_로고_흑색_변형_3.jpg',
    '2.잠원동성당_로고_흑색_변형_4.jpg',
    '2.잠원동성당_로고_흑색_변형_5.jpg',
  ],
} as const

const lists = [
  {
    svg: <AboutSymbolLogo1Icon w="80px" h="80px" />,
    description: `가운데 타원은 누에고치를 상징하며, 누에고치가 십자가(예수님과 고아)를 품는 모습을 형상화했습니다.`,
  },
  {
    svg: <AboutSymbolLogo2Icon w="80px" h="80px" />,
    description: `가운데 타원을 감싼 세 개의 선은 파티마에서 성모님이 세 명의 어린이 앞에 모습을 드러내 보이셨고, 기도를 통해 인간이 구원을 받을 수 있음을 알려주신 구원의 실크로드를 상징합니다.`,
  },
  {
    svg: <AboutSymbolLogo3Icon w="80px" h="80px" />,
    description: `제일 밖의 큰 원은 파티마에서 성모님이 발현하셨을 당시의 태양을 상징합니다.`,
  },
]

const AboutSymbolPage: React.FC = () => {
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false)
  const [isDownloadingJPG, setIsDownloadingJPG] = useState(false)

  const handleDownloadPDF = useCallback(async () => {
    const pdfUrl = '/files/about/symbol/ci.pdf'
    setIsDownloadingPDF(true)

    try {
      const response = await fetch(pdfUrl)
      if (!response.ok) {
        throw new Error('파일 다운로드에 실패했습니다.')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = '잠원동성당_심벌.pdf'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      toaster.create({
        type: 'error',
        title: '파일 다운로드에 실패했습니다.',
      })
    } finally {
      setIsDownloadingPDF(false)
    }
  }, [])

  const handleDownloadZip = useCallback(async () => {
    setIsDownloadingJPG(true)

    try {
      const zip = new JSZip()

      // 모든 폴더의 파일들을 다운로드
      await Promise.all(
        Object.entries(FOLDER_FILES).map(async ([folderName, files]) => {
          await Promise.all(
            files.map(async (fileName) => {
              try {
                const filePath = `/files/about/symbol/zip/${folderName}/${fileName}`
                const response = await fetch(filePath)
                if (!response.ok) {
                  console.warn(`Failed to fetch ${filePath}`)
                  return
                }

                const blob = await response.blob()
                zip.file(`${folderName}/${fileName}`, blob)
              } catch (error) {
                console.error(`Error fetching ${fileName}:`, error)
              }
            }),
          )
        }),
      )

      // ZIP 파일 생성
      const zipBlob = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      })

      // 다운로드
      const url = window.URL.createObjectURL(zipBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = '잠원동성당_심벌.zip'
      link.style.display = 'none'

      document.body.appendChild(link)
      link.click()

      // Windows 호환성을 위한 지연
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }, 200)
    } catch (error) {
      console.error(error)
      toaster.create({
        type: 'error',
        title: 'ZIP 파일 생성에 실패했습니다.',
      })
    } finally {
      setIsDownloadingJPG(false)
    }
  }, [])

  return (
    <Box display="flex" flexDirection="column" gap="56px">
      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-1" color="grey.10">
          CI
        </Text>
        <Box display="flex" flexDirection="column" gap="16px">
          <Image
            src="/images/about/symbol/ci.png"
            alt="CI"
            border="1px solid"
            borderColor="border.basic.1"
            rounded="6px"
            w={['767px', 'initial']}
            h={['120px', '240px', 'initial']}
          />
          <Box display="flex" justifyContent="center" gap="10px">
            <Button
              flex={['1', 'initial']}
              w={['initial', '160px']}
              size="md"
              variant="solid"
              colorPalette="grey"
              onClick={handleDownloadPDF}
              disabled={isDownloadingPDF || isDownloadingJPG}
            >
              {isDownloadingPDF ?
                <Spinner size="sm" />
              : <DownloadSimpleIcon size="20px" />}
              PDF 다운로드
            </Button>
            <Button
              flex={['1', 'initial']}
              w={['initial', '160px']}
              size="md"
              variant="solid"
              colorPalette="grey"
              onClick={handleDownloadZip}
              disabled={isDownloadingPDF || isDownloadingJPG}
            >
              {isDownloadingJPG ?
                <Spinner size="sm" />
              : <DownloadSimpleIcon size="20px" />}
              PNG 다운로드
            </Button>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap="36px">
        <Text textStyle="pre-body-4" color="grey.10">
          잠원동성당의 심벌마크는 성당 고유의 상징체로 그리스도교 신앙의 본질인
          ‘예수 그리스도의 죽음과 부활’을 형상화했습니다.
          <br />
          십자가의 양각은 죽음, 십자가의 음각은 부활을 상징합니다.
        </Text>
        <Text px={['20px', '40px']} textStyle="pre-body-6" color="grey.8">
          “메시아가 십자가에 달렸다는 것은 유다인들에게는 걸림돌이고
          이방인들에게는 어리석음입니다.
          <br />
          그러나 유다인이나 그리스인이나 할 것 없이 하느님의 부르심을 받은
          사람에게는 그가 곧 메시아이며 하느님의 힘이며 지혜입니다.”
          <br />
          (1코린 1, 23-24).
        </Text>
        <Text textStyle="pre-body-4" color="grey.10">
          볼 눈이 없는 사람들에게는 십자가는 패배의 상징이요 무력함 그
          자체입니다.
          <br />
          그러나 하느님의 부르심을 받아 부활을 체험하고 볼 눈이 열린
          사람들에게는 십자가야말로 사랑의 무한한 힘을 보여 주는 증거이자,
          <br />
          사람이면 누구나 타고난 자기중심적 경향을 가장 완벽하게 이긴 승리의
          상징입니다.
          <br />
          부활하신 주님을 체험하고 성령을 받은 사람들은 자기들이 보고 들은 바를
          전하기 위해서 아무것도 두려워하지 않고 세상 끝까지 달려가는 사도가
          되었습니다.
          <br />
          그리고 사도들의 뒤를 이어 교회는 한결같이 주님의 죽음과 부활을
          전해왔습니다. 주님의 죽음과 부활, 기쁜 소식이 바로 이것입니다.
          <br />
          주님께서 이 세상에 오신 이후 세 번째 천년기에 들어서 있는 지금, 또
          세상 끝날까지 앞으로도 교회는 계속 같은 복음을 전할 것입니다.
          <br />
          그리고 주님께서는 성령을 통하여 언제나 교회와 함께 계실 것입니다.
        </Text>
        <Text px={['20px', '40px']} textStyle="pre-body-6" color="grey.8">
          너희는 가서 이 세상 모든 사람을 내 제자로 삼아 아버지와 아들과 성령의
          이름으로 그들에게 세례를 베풀고 내가 너희에게 명한 모든 것을 지키도록
          가르쳐라.
          <br />
          내가 세상 끝날까지 항상 너희와 함께 있겠다.
          <br />
          (마태 28, 19-20).
        </Text>
        <Text textStyle="pre-body-4" color="grey.10">
          열린 교회로서 지역사회와의 화합과 선교를 지향하고 있는 잠원동성당의
          심벌마크는 그리스도인의 신앙고백이며 몸소 살아내야 할 소명인 셈입니다.
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="24px">
        <Text textStyle="pre-heading-1" color="grey.10">
          심벌 마크
        </Text>
        <Image
          src="/images/about/symbol/symbol.png"
          alt="심벌 마크"
          border="1px solid"
          borderColor="border.basic.1"
          rounded="6px"
          w={['767px', 'initial']}
          h={['120px', '240px', 'initial']}
        />
      </Box>

      <Text textStyle="pre-body-4" color="grey.10">
        잠원도성당의 심벌 마크는 본당을 상징하는 4가지 요소인
        <br />
        ▲나자렛 예수님 (우리의 신앙) ▲1947년 성심원(시작점) ▲잠원동
        뽕나무밭(지리적 위치) ▲파티마 성모님 (주보성인)의 정신을 담았습니다.
      </Text>

      <Box
        p={['20px', '36px 40px']}
        display="flex"
        flexDirection={['column', 'row']}
        gap={['28px', '28px', '56px']}
      >
        {lists.map((list, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection={['column', 'column', 'row']}
            gap="16px"
            w={['100%', '0']}
            flex="1"
          >
            {list.svg}
            <Box display="flex" gap="12px">
              <Text textStyle="cat-heading-3" color="primary.4">
                {index + 1}
              </Text>
              <Text textStyle="pre-body-6" color="grey.8">
                {list.description}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AboutSymbolPage
