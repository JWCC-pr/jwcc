import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'

const CommunityPastoralCouncilPage: React.FC = () => {
  return (
    <Box>
      <Image
        src="/images/community/pastoral-council/pc.png"
        alt="사목협의회 조직도"
        display={['none', 'none', 'block']}
      />
      <Image
        src="/images/community/pastoral-council/tablet.png"
        alt="사목협의회 조직도"
        display={['none', 'block', 'none']}
      />
      <Image
        src="/images/community/pastoral-council/mobile.png"
        alt="사목협의회 조직도"
        display={['block', 'none']}
      />
    </Box>
  )
}

export default CommunityPastoralCouncilPage
