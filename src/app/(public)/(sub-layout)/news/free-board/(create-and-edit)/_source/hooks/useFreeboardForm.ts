import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FORM_MESSAGE } from '@/constants/form/helper-text'

export interface NewsFreeBoardFormDataType {
  title: string
  content: string
}

export const newsFreeBoardFormSchema: yup.ObjectSchema<NewsFreeBoardFormDataType> =
  yup.object().shape({
    title: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
    content: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
  })

export const useNewsFreeBoardForm = (
  options?: UseFormProps<NewsFreeBoardFormDataType>,
) => {
  return useForm<NewsFreeBoardFormDataType>({
    resolver: yupResolver(newsFreeBoardFormSchema),
    mode: 'onChange',
    ...options,
  })
}
