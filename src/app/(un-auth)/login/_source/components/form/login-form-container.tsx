'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'

interface LoginFormContainerProps {
  onSubmit: () => void
  view: React.ReactNode
}

const LoginFormContainer: React.FC<LoginFormContainerProps> = ({
  onSubmit,
  view,
}) => {
  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      display="flex"
      flexDirection="column"
      gap="24px"
    >
      {view}

      <Button type="submit" size="lg" variant="solid" colorPalette="primary">
        로그인
      </Button>
    </Box>
  )
}

export default LoginFormContainer
