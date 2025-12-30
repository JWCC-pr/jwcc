'use client'

import { useRouter } from 'next/navigation'

import { FormProvider } from 'react-hook-form'

import { ROUTES } from '@/constants/routes'
import { useUserLoginCreateMutation } from '@/generated/apis/User/User.query'
import { clientCookie } from '@/stores/cookie/store'

import { useLoginForm } from '../../hooks/useLoginForm'
import LoginFormContainer from './login-form-container'
import LoginFormView from './login-form-view'

const mapper: Record<string, string> = {
  '인증정보가 일치하지 않습니다.': '아이디와 비밀번호를 정확히 입력해 주세요.',
  '가입승인이 되지 않았습니다.': '관리자의 승인 후 로그인이 가능합니다.',
}

const LoginForm: React.FC = () => {
  const router = useRouter()

  const { mutateAsync: userLoginMutateAsync } = useUserLoginCreateMutation({})

  const methods = useLoginForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      const { accessToken, refreshToken } = await userLoginMutateAsync({
        data: {
          email: data.email,
          password: data.password,
        },
      })

      clientCookie.set('accessToken', accessToken)
      clientCookie.set('refreshToken', refreshToken)

      router.replace(ROUTES.HOME)
    } catch (error: any) {
      const errorMessage = error?.error?.nonField?.[0]

      if (errorMessage) {
        return methods.setError('password', {
          message: mapper[errorMessage as string],
        })
      }

      methods.setError('password', {
        message: '아이디와 비밀번호를 정확히 입력해 주세요.',
      })
    }
  })

  return (
    <FormProvider {...methods}>
      <LoginFormContainer onSubmit={onSubmit} view={<LoginFormView />} />
    </FormProvider>
  )
}

export default LoginForm
