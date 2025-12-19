'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

import { ROUTES } from '@/constants/routes'

import LoginForm from './form/login-form'

const LoginPage: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap="36px">
      <Text textStyle="pre-heading-2" color="grey.10" textAlign="center">
        찬미예수님!
        <br />
        로그인해주세요.
      </Text>
      <LoginForm />
      <Box display="flex" gap="10px" alignItems="center">
        <Box w="72.5px" h="1px" bgColor="border.basic.2" />
        <Box display="flex" alignItems="center">
          <Text textStyle="pre-body-6" color="grey.7">
            아직 회원이 아니신가요?
          </Text>
          <Link href={ROUTES.SIGNUP} _hover={{ textDecoration: 'none' }}>
            <Button size="sm" variant="ghost" colorPalette="primary">
              회원가입
            </Button>
          </Link>
        </Box>
        <Box w="72.5px" h="1px" bgColor="border.basic.2" />
      </Box>
    </Box>
  )
}

export default LoginPage
