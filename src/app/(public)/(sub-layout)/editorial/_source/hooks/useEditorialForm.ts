import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FORM_MESSAGE } from '@/constants/form/helper-text'

export interface EditorialFormDataType {
  title: string
  content: string
  fileSet?: {
    file: string
  }[]
}

export const editorialFormSchema: yup.ObjectSchema<EditorialFormDataType> = yup
  .object()
  .shape({
    title: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
    content: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
    fileSet: yup
      .array()
      .of(
        yup.object().shape({
          file: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
          fileName: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
        }),
      )
      .optional(),
  })

export const useEditorialForm = (
  options?: UseFormProps<EditorialFormDataType>,
) => {
  return useForm<EditorialFormDataType>({
    resolver: yupResolver(editorialFormSchema),
    mode: 'onChange',
    ...options,
  })
}
