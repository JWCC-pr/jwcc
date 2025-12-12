import { Box } from '@chakra-ui/react/box'
import { Link } from '@chakra-ui/react/link'

import { LogoHoverIcon } from '@/generated/icons/MyIcons'

const UnAuthHeader: React.FC = () => {
  return (
    <Box
      as="header"
      px="40px"
      w="100%"
      maxW="1200px"
      h="64px"
      bgColor="white.trnsparent.5"
      borderBottom="1px solid"
      borderBottomColor="white.trnsparent.3"
      backdropFilter="blue"
      display="flex"
      alignItems="center"
    >
      <Link href="/">
        <LogoHoverIcon w="122px" h="36px" />
      </Link>
    </Box>
  )
}

export default UnAuthHeader
