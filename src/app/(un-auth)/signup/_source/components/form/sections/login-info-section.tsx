'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Input } from '@chakra-ui/react/input'
import { Text } from '@chakra-ui/react/text'

import { useFormContext, useFormState } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { PasswordInput } from '@/components/ui/password-input'

import { SignupFormDataType } from '../../../hooks/useSignupForm'

const LoginInfoSection: React.FC = () => {
  const { register, control } = useFormContext<SignupFormDataType>()
  const { errors } = useFormState({ control })

  return (
    <Box display="flex" flexDirection="column">
      <Text
        py="10px"
        textStyle="pre-heading-6"
        color="grey.8"
        borderBottom="1px solid"
        borderColor="grey.10"
      >
        로그인 정보
      </Text>
      <Box py="16px" display="flex" flexDirection="column" gap="32px">
        <FormHelper
          required
          label="이메일"
          message={{ error: errors.email?.message }}
        >
          <Box w="full" display="flex" alignItems="center" gap="8px">
            <Input
              size="lg"
              variant="outline"
              colorPalette="grey"
              placeholder="이메일"
              {...register('email')}
              flex="1"
            />
            <Button
              type="button"
              size="lg"
              variant="solid"
              colorPalette="primary"
            >
              인증
            </Button>
          </Box>
        </FormHelper>

        <FormHelper
          required
          label="비밀번호"
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
          label="비밀번호 확인"
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
    </Box>
  )
}

export default LoginInfoSection
