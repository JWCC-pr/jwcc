'use client'

import { Box } from '@chakra-ui/react/box'
import { Button } from '@chakra-ui/react/button'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { Input } from '@chakra-ui/react/input'
import { Link } from '@chakra-ui/react/link'

import { Controller, useFormContext, useFormState } from 'react-hook-form'

import { FormHelper } from '@/components/form-helper'
import { PasswordInput } from '@/components/ui/password-input'
import { ROUTES } from '@/constants/routes'

import { LoginFormDataType } from '../../hooks/useLoginForm'

const LoginFormView: React.FC = () => {
  const { register, control } = useFormContext<LoginFormDataType>()
  const { errors } = useFormState({ control })

  const hasError = !!errors.email?.message || !!errors.password?.message

  return (
    <Box display="flex" flexDirection="column" gap="8px">
      <FormHelper isError={hasError}>
        <Input placeholder="이메일" {...register('email')} />
      </FormHelper>
      <FormHelper
        message={{
          error:
            hasError ? '아이디와 비밀번호를 정확히 입력해 주세요.' : undefined,
        }}
      >
        <PasswordInput placeholder="비밀번호" {...register('password')} />
      </FormHelper>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Controller
          name="isAutoLogin"
          control={control}
          render={({ field: { value, onChange, name } }) => (
            <Checkbox.Root
              name={name}
              checked={value}
              onCheckedChange={(details) => {
                const checked = details.checked === true
                onChange(checked)
              }}
              size="sm"
              variant="solid"
              colorPalette="primary"
              gap="6px"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label textStyle="pre-body-6" color="grey.10">
                자동 로그인
              </Checkbox.Label>
            </Checkbox.Root>
          )}
        />

        <Link href={ROUTES.FORGOT_PASSWORD} _hover={{ textDecoration: 'none' }}>
          <Button type="button" size="sm" variant="ghost" colorPalette="grey">
            비밀번호 재설정
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default LoginFormView
