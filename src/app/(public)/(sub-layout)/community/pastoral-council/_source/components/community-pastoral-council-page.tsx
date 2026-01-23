import { Box } from '@chakra-ui/react/box'
import { Image } from '@chakra-ui/react/image'

const CommunityPastoralCouncilPage: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Image
        src="/images/community/pastoral-council/pc.png"
        alt="사목협의회 조직도"
        display={['none', 'none', 'block']}
        maxW="1200px"
        w="full"
      />
      <Image
        src="/images/community/pastoral-council/tablet.png"
        alt="사목협의회 조직도"
        display={['none', 'block', 'none']}
        maxW="688px"
        w="full"
      />
      <Image
        src="/images/community/pastoral-council/mobile.png"
        alt="사목협의회 조직도"
        display={['block', 'none']}
        maxW="320px"
        w="full"
      />
    </Box>
  )
}

export default CommunityPastoralCouncilPage
