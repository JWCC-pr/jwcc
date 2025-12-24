'use client'

import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'
import { Text } from '@chakra-ui/react/text'

import AdminEditorContent from '@/app/(public)/(sub-layout)/_source/components/admin-editor-content'
import { usePastoralGuidelinesRetrieveQuery } from '@/generated/apis/PastoralGuidelines/PastoralGuidelines.query'

const AboutPastoralPage: React.FC = () => {
  const { data: pastoralGuidelines } = usePastoralGuidelinesRetrieveQuery({
    variables: {
      me: 'me',
    },
  })

  if (!pastoralGuidelines) return

  return (
    <Box display="flex" flexDirection="column" gap="40px">
      <Image
        src={pastoralGuidelines.image}
        alt="사목지침"
        w={['450px', 'full']}
        h={['120px', '183.47px', '320px']}
        aspectRatio={['15/4', '688.00/183.47', '15/4']}
      />
      <Box display="flex" flexDirection="column" gap="36px">
        <Box display="flex" flexDirection="column" gap="8px">
          <Text textStyle="cat-heading-4" color="primary.4" textAlign="center">
            {pastoralGuidelines.category}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            gap="2px"
            alignItems="center"
          >
            <Text textStyle="cat-heading-1" color="grey.10">
              {pastoralGuidelines.title}
            </Text>
            <Text textStyle="pre-body-6" color="grey.7">
              {pastoralGuidelines.subtitle}
            </Text>
          </Box>
        </Box>
        <AdminEditorContent
          body={pastoralGuidelines.body}
          hasBorderBottom={false}
          textStyle="pre-body-6"
        />
        <Box
          display="flex"
          flexDirection="column"
          gap="6px"
          alignItems="flex-end"
        >
          <Text textStyle="cat-caption-1" color="grey.10" textAlign="right">
            천주교 서울대교구 잠원동성당
            <br />
            {pastoralGuidelines.signatureText}
          </Text>
          <Image
            src={pastoralGuidelines.signatureImage}
            alt="서명 이미지"
            w="140px"
            h="112px"
            aspectRatio="5/4"
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AboutPastoralPage
