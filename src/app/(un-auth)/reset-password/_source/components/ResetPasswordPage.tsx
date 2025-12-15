'use client'

import { useRouter } from 'next/navigation'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Text } from '@chakra-ui/react/text'

import { useFormState } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { PasswordInput } from '@/components/ui/password-input'

import { useResetPasswordForm } from '../hooks/useResetPasswordForm'

const ResetPasswordPage: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useResetPasswordForm()
  const { isValid } = useFormState({ control })

  const onSubmit = handleSubmit(async (data) => {
    console.log('🐬 data >> ', data)

    router.replace('/reset-password/complete')
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
          새로운 비밀번호를 입력해 주세요.
        </Text>
      </Box>

      <Box py="16px" display="flex" flexDirection="column" gap="32px">
        <FormHelper
          required
          label="새 비밀번호"
          message={{
            error: errors.password?.message,
            help: '영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를 입력해주세요.',
          }}
        >
          <PasswordInput
            size="lg"
            variant="outline"
            colorPalette="grey"
            placeholder="비밀번호"
            {...register('password')}
          />
        </FormHelper>

        <FormHelper
          required
          label="새 비밀번호 확인"
          message={{
            error: errors.passwordConfirm?.message,
          }}
        >
          <PasswordInput
            size="lg"
            variant="outline"
            colorPalette="grey"
            placeholder="비밀번호 확인"
            {...register('passwordConfirm')}
          />
        </FormHelper>
      </Box>

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
  )
}

export default ResetPasswordPage
