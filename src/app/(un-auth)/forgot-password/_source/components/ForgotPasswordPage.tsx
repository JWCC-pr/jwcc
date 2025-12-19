'use client'

import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Input } from '@chakra-ui/react/input'
import { Text } from '@chakra-ui/react/text'

import { useFormState } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { useUserPasswordResetCreateMutation } from '@/generated/apis/User/User.query'

import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm'

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForgotPasswordForm()
  const { isValid } = useFormState({ control })

  const { mutateAsync } = useUserPasswordResetCreateMutation({})

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      await mutateAsync({ data: { email } })
    } catch (error) {
      console.error('🐬 error >> ', error)

      // FIXME: "가입된 이메일이 아니에요" 경우 처리하기
    }

    router.replace('/forgot-password/complete')
  })

  return (
    <Box
      as="form"
      onSubmit={onSubmit}
      w="362px"
      display="flex"
      flexDirection="column"
      gap="36px"
    >
      <Box display="flex" flexDirection="column" gap="10px">
        <Text textStyle="pre-heading-2" color="grey.10">
          비밀번호 재설정
        </Text>
        <Text textStyle="pre-body-6" color="grey.8">
          가입하신 이메일 주소를 입력해주세요.
          <br />
          이메일 주소로 비밀번호 재설정 링크가 포함된 메일을 보내드립니다.
        </Text>
      </Box>

      <FormHelper
        message={{
          error: errors.email?.message,
        }}
      >
        <Input placeholder="이메일" {...register('email')} />
      </FormHelper>

      <Box py="16px">
        <Button
          type="submit"
          disabled={!isValid}
          w="full"
          size="lg"
          variant="solid"
          colorPalette="primary"
        >
          비밀번호 재설정
        </Button>
      </Box>
    </Box>
  )
}

export default ForgotPasswordPage
