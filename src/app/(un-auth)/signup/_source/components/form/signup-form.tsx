'use client'

import { FormProvider } from 'react-hook-form'

import { useSignupForm } from '../../hooks/useSignupForm'
import SignupFormContainer from './signup-form-container'
import SignupFormView from './signup-form-view'

const SignupForm: React.FC = () => {
  const methods = useSignupForm({
    defaultValues: {
      email: {
        value: '',
        verificationCode: '',
        isVerified: false,
      },
      password: '',
    },
  })

  const onSubmit = methods.handleSubmit(async (data) => {
    // FIXME: API
    console.log('🐬 data >> ', data)
  })

  return (
    <FormProvider {...methods}>
      <SignupFormContainer onSubmit={onSubmit} view={<SignupFormView />} />
    </FormProvider>
  )
}

export default SignupForm
