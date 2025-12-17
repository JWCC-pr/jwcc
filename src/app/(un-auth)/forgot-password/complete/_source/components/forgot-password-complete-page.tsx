import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

import { ROUTES } from '@/constants/routes'
import { SignupCompleteCCheckCircleFillIcon } from '@/generated/icons/MyIcons'

const ForgotPasswordCompletePage: React.FC = () => {
  return (
    <Box w="362px" display="flex" flexDirection="column" gap="36px">
      <Box display="flex" flexDirection="column" gap="10px" alignItems="center">
        <SignupCompleteCCheckCircleFillIcon w="64px" h="64px" />
        <Box display="flex" flexDirection="column" gap="6px">
          <Text textStyle="pre-heading-2" color="grey.10" textAlign="center">
            이메일 전송 완료
          </Text>
          <Text textStyle="pre-body-4" color="grey.8" textAlign="center">
            비밀번호 재설정 링크가 포함된 메일이 전송되었습니다.
            <br />
            메일함을 확인해주세요.
          </Text>
        </Box>
      </Box>
      <Link w="full" href={ROUTES.LOGIN} _hover={{ textDecoration: 'none' }}>
        <Button w="full" size="lg" variant="solid" colorPalette="primary">
          로그인으로 돌아가기
        </Button>
      </Link>
    </Box>
  )
}

export default ForgotPasswordCompletePage
