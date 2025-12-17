'use client'

import { useRouter } from 'next/navigation'

import { FormProvider } from 'react-hook-form'

import { ROUTES } from '@/constants/routes'
import { useUserRegisterCreateMutation } from '@/generated/apis/User/User.query'

import { useSignupForm } from '../../hooks/useSignupForm'
import SignupFormContainer from './signup-form-container'
import SignupFormView from './signup-form-view'

const SignupForm: React.FC = () => {
  const router = useRouter()

  const { mutateAsync: userRegisterCreateMutateAsync } =
    useUserRegisterCreateMutation({})

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
    console.log('🐬 log >> ', {
      email: data.email.value,
      password: data.password,
      name: data.name,
      baptismalName: data.baptismName,
      baseAddress: data.address,
      detailAddress: data.addressDetail || '',
      birth: `${data.birthDate.year}-${data.birthDate.month}-${data.birthDate.day}`,
      emailVerifierToken: data.email.token,
      postcode: data.postcode,
      subDepartmentIds: data.department.map((department) => Number(department)),
    })

    try {
      await userRegisterCreateMutateAsync({
        data: {
          email: data.email.value,
          password: data.password,
          name: data.name,
          baptismalName: data.baptismName,
          baseAddress: data.address,
          detailAddress: data.addressDetail || '',
          birth: `${data.birthDate.year}-${data.birthDate.month.padStart(2, '0')}-${data.birthDate.day.padStart(2, '0')}`,
          emailVerifierToken: data.email.token,
          postcode: data.postcode,
          subDepartmentIds: data.department.map((department) =>
            Number(department),
          ),
        },
      })

      router.replace(ROUTES.SIGNUP_COMPLETE)
    } catch (error) {
      console.error('🐬 error >> ', error)
    }
  })

  return (
    <FormProvider {...methods}>
      <SignupFormContainer onSubmit={onSubmit} view={<SignupFormView />} />
    </FormProvider>
  )
}

export default SignupForm
