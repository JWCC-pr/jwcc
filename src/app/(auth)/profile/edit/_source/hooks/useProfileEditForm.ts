import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
  SignupFormDataType,
  signupFormSchema,
} from '@/app/(un-auth)/signup/_source/hooks/useSignupForm'

export interface ProfileEditFormDataType extends Pick<
  SignupFormDataType,
  | 'name'
  | 'baptismName'
  | 'address'
  | 'addressDetail'
  | 'postcode'
  | 'birthDate'
> {}

export const profileEditFormSchema: yup.ObjectSchema<ProfileEditFormDataType> =
  signupFormSchema.pick([
    'name',
    'baptismName',
    'address',
    'addressDetail',
    'postcode',
    'birthDate',
  ])

export const useProfileEditForm = (
  options?: UseFormProps<ProfileEditFormDataType>,
) => {
  return useForm<ProfileEditFormDataType>({
    resolver: yupResolver(profileEditFormSchema),
    mode: 'onChange',
    defaultValues: {},
    ...options,
  })
}
