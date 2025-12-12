import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FORM_MESSAGE } from '@/constants/form/helper-text'
import { REGEX } from '@/constants/form/regex'

export interface LoginFormDataType {
  email: string
  password: string
  isAutoLogin?: boolean
}

export const loginFormSchema: yup.ObjectSchema<LoginFormDataType> = yup
  .object()
  .shape({
    email: yup
      .string()
      .required(FORM_MESSAGE.COMMON.REQUIRED)
      .matches(REGEX.EMAIL, FORM_MESSAGE.EMAIL.FORMAT),
    password: yup
      .string()
      .required(FORM_MESSAGE.COMMON.REQUIRED)
      .min(8, FORM_MESSAGE.PASSWORD.MIN)
      .max(20, FORM_MESSAGE.PASSWORD.MAX)
      .matches(REGEX.PASSWORD, FORM_MESSAGE.PASSWORD.FORMAT),
    isAutoLogin: yup.boolean().optional().default(false),
  })

export const useLoginForm = (options?: UseFormProps<LoginFormDataType>) => {
  return useForm<LoginFormDataType>({
    resolver: yupResolver(loginFormSchema),
    mode: 'onChange',
    ...options,
  })
}
