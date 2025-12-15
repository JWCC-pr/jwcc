import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FORM_MESSAGE } from '@/constants/form/helper-text'
import { REGEX } from '@/constants/form/regex'

export interface ResetPasswordFormDataType {
  password: string
  passwordConfirm: string
}

export const resetPasswordFormSchema: yup.ObjectSchema<ResetPasswordFormDataType> =
  yup.object().shape({
    password: yup
      .string()
      .required(FORM_MESSAGE.COMMON.REQUIRED)
      .min(8, FORM_MESSAGE.PASSWORD.MIN)
      .max(20, FORM_MESSAGE.PASSWORD.MAX)
      .matches(REGEX.PASSWORD, FORM_MESSAGE.PASSWORD.FORMAT),
    passwordConfirm: yup
      .string()
      .required(FORM_MESSAGE.COMMON.REQUIRED)
      .oneOf([yup.ref('password')], FORM_MESSAGE.PASSWORD_CONFIRM.CONFIRM),
  })

export const useResetPasswordForm = (
  options?: UseFormProps<ResetPasswordFormDataType>,
) => {
  return useForm<ResetPasswordFormDataType>({
    resolver: yupResolver(resetPasswordFormSchema),
    mode: 'onChange',
    ...options,
  })
}
