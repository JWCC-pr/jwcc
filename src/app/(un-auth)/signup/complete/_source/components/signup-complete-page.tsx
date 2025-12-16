import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

import { ROUTES } from '@/constants/routes'
import { SignupCompleteCCheckCircleFillIcon } from '@/generated/icons/MyIcons'

const SignupCompletePage: React.FC = () => {
  return (
    <Box w="362px" display="flex" flexDirection="column" gap="36px">
      <Box display="flex" flexDirection="column" gap="10px" alignItems="center">
        <SignupCompleteCCheckCircleFillIcon w="64px" h="64px" />
        <Box display="flex" flexDirection="column" gap="6px">
          <Text textStyle="pre-heading-2" color="grey.10" textAlign="center">
            가입 신청 완료
          </Text>
          <Text textStyle="pre-body-4" color="grey.8" textAlign="center">
            입력하신 정보가 관리자에게 전달되었습니다.
            <br />
            관리자 승인 후 로그인 가능합니다.
          </Text>
        </Box>
      </Box>
      <Link w="full" href={ROUTES.HOME} _hover={{ textDecoration: 'none' }}>
        <Button w="full" size="lg" variant="solid" colorPalette="primary">
          홈으로
        </Button>
      </Link>
    </Box>
  )
}

export default SignupCompletePage
