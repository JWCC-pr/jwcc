import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FORM_MESSAGE } from '@/constants/form/helper-text'

export interface DepartmentBoardFormDataType {
  title: string
  content: string
  subDepartment: number
  fileSet?: {
    file: string
    fileName: string
  }[]
}

export const departmentBoardFormSchema: yup.ObjectSchema<DepartmentBoardFormDataType> =
  yup.object().shape({
    title: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
    content: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
    subDepartment: yup.number().required(FORM_MESSAGE.COMMON.REQUIRED),
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

export const useDepartmentBoardForm = (
  options?: UseFormProps<DepartmentBoardFormDataType>,
) => {
  return useForm<DepartmentBoardFormDataType>({
    resolver: yupResolver(departmentBoardFormSchema),
    mode: 'onChange',
    ...options,
  })
}
