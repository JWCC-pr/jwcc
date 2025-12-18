import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FORM_MESSAGE } from '@/constants/form/helper-text'

export interface LiturgyFlowerFormDataType {
  title: string
  images: {
    url: string
    name: string
  }[]
}

export const useLiturgyFlowerFormSchema: yup.ObjectSchema<LiturgyFlowerFormDataType> =
  yup.object().shape({
    title: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
    images: yup
      .array()
      .of(
        yup.object().shape({
          url: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
          name: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
        }),
      )
      .required(FORM_MESSAGE.COMMON.REQUIRED),
  })

export const useLiturgyFlowerForm = (
  options?: UseFormProps<LiturgyFlowerFormDataType>,
) => {
  return useForm<LiturgyFlowerFormDataType>({
    resolver: yupResolver(useLiturgyFlowerFormSchema),
    mode: 'onChange',
    ...options,
  })
}
