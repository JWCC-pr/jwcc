import { Box } from '@chakra-ui/react/box'
import { Link } from '@chakra-ui/react/link'

import { ROUTES } from '@/constants/routes'
import { LogoHoverIcon } from '@/generated/icons/MyIcons'

const SimpleHeader: React.FC = () => {
  return (
    <Box
      as="header"
      px={['20px', '40px']}
      position="sticky"
      top="0"
      zIndex="100"
      w="100%"
      maxW="1200px"
      h="64px"
      bgColor="white.trnsparent.5"
      borderBottom="1px solid"
      borderBottomColor="border.basic.1"
      backdropFilter="blue"
      display="flex"
      alignItems="center"
    >
      <Link href={ROUTES.HOME}>
        <LogoHoverIcon w="122px" h="36px" />
      </Link>
    </Box>
  )
}

export default SimpleHeader
