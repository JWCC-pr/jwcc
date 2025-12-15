import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FORM_MESSAGE } from '@/constants/form/helper-text'
import { REGEX } from '@/constants/form/regex'

export interface ForgotPasswordFormDataType {
  email: string
}

export const forgotPasswordFormSchema: yup.ObjectSchema<ForgotPasswordFormDataType> =
  yup.object().shape({
    email: yup
      .string()
      .required(FORM_MESSAGE.COMMON.REQUIRED)
      .matches(REGEX.EMAIL, FORM_MESSAGE.EMAIL.FORMAT),
  })

export const useForgotPasswordForm = (
  options?: UseFormProps<ForgotPasswordFormDataType>,
) => {
  return useForm<ForgotPasswordFormDataType>({
    resolver: yupResolver(forgotPasswordFormSchema),
    mode: 'onChange',
    ...options,
  })
}
