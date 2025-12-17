'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Link } from '@chakra-ui/react/link'
import { Text } from '@chakra-ui/react/text'

import { ROUTES } from '@/constants/routes'

export default function NotFound() {
  return (
    <Box
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="36px"
    >
      <Box display="flex" flexDirection="column" gap="10px">
        <Text textStyle="cat-display-2" color="grey.10" textAlign="center">
          404 ERROR
        </Text>
        <Text textStyle="pre-body-6" color="grey.8" textAlign="center">
          죄송합니다. 페이지를 찾을 수 없습니다.
          <br />
          존재하지 않는 주소를 입력하셨거나,
          <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </Text>
      </Box>

      <Link href={ROUTES.HOME} _hover={{ textDecoration: 'none' }}>
        <Button
          type="button"
          size="lg"
          variant="solid"
          colorPalette="primary"
          w={['320px', '362px']}
        >
          홈으로
        </Button>
      </Link>
    </Box>
  )
}
