'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'

import { useFormContext, useFormState } from 'react-hook-form'

import { SignupFormDataType } from '../../hooks/useSignupForm'

interface SignupFormContainerProps {
  onSubmit: () => void
  view: React.ReactNode
}

const SignupFormContainer: React.FC<SignupFormContainerProps> = ({
  onSubmit,
  view,
}) => {
  const { control } = useFormContext<SignupFormDataType>()
  const { isValid } = useFormState({ control })

  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      py="56px 120px"
      w="362px"
      display="flex"
      flexDirection="column"
      gap="36px"
    >
      <Text textStyle="pre-heading-2">회원가입 신청</Text>

      {view}

      <Box py="16px">
        <Button
          w="full"
          type="submit"
          size="lg"
          variant="solid"
          disabled={!isValid}
        >
          가입 신청
        </Button>
      </Box>
    </Box>
  )
}

export default SignupFormContainer
