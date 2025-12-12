'use client'

import { FormProvider } from 'react-hook-form'

import { useLoginForm } from '../../hooks/useLoginForm'
import LoginFormContainer from './login-form-container'
import LoginFormView from './login-form-view'

const LoginForm: React.FC = () => {
  const methods = useLoginForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = methods.handleSubmit(async (data) => {
    // FIXME: API
    console.log('🐬 data >> ', data)
  })

  return (
    <FormProvider {...methods}>
      <LoginFormContainer onSubmit={onSubmit} view={<LoginFormView />} />
    </FormProvider>
  )
}

export default LoginForm
