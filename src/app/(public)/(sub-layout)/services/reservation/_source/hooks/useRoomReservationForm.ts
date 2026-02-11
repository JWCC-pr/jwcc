import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FORM_MESSAGE } from '@/constants/form/helper-text'

export interface RoomReservationFormDataType {
  title: string
  groupName: string
  startTime: string // "HH:mm"
  endTime: string // "HH:mm"
  isRecurring?: boolean
  recurringType?: 'weekly' | 'monthly_date'
  recurringStartDate?: string
  recurringEndDate?: string
  recurringWeekdays?: string[]
  recurringWeeks?: string[]
  recurringMonthlyDay?: string
}

export const roomReservationFormSchema: yup.ObjectSchema<RoomReservationFormDataType> =
  yup.object().shape({
    title: yup
      .string()
      .max(50, '제목은 최대 50자까지 입력 가능합니다')
      .required(FORM_MESSAGE.COMMON.REQUIRED),
    groupName: yup
      .string()
      .max(10, '사용단체명은 최대 10자까지 입력 가능합니다')
      .required(FORM_MESSAGE.COMMON.REQUIRED),
    startTime: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
    endTime: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
    isRecurring: yup.boolean().optional(),
    recurringType: yup
      .string()
      .oneOf(['weekly', 'monthly_date'])
      .when('isRecurring', {
        is: true,
        then: (schema) => schema.required(FORM_MESSAGE.COMMON.REQUIRED),
        otherwise: (schema) => schema.optional(),
      }) as yup.StringSchema<RoomReservationFormDataType['recurringType']>,
    recurringStartDate: yup.string().when('isRecurring', {
      is: true,
      then: (schema) => schema.required(FORM_MESSAGE.COMMON.REQUIRED),
      otherwise: (schema) => schema.optional(),
    }),
    recurringEndDate: yup.string().when('isRecurring', {
      is: true,
      then: (schema) => schema.required(FORM_MESSAGE.COMMON.REQUIRED),
      otherwise: (schema) => schema.optional(),
    }),
    recurringWeekdays: yup
      .array()
      .of(yup.string().required())
      .when(['isRecurring', 'recurringType'], {
        is: (isRecurring: boolean, recurringType: string) =>
          isRecurring && recurringType === 'weekly',
        then: (schema) =>
          schema.min(1, FORM_MESSAGE.COMMON.REQUIRED).required(),
        otherwise: (schema) => schema.optional(),
      }),
    recurringWeeks: yup
      .array()
      .of(yup.string().required())
      .when(['isRecurring', 'recurringType'], {
        is: (isRecurring: boolean, recurringType: string) =>
          isRecurring && recurringType === 'weekly',
        then: (schema) =>
          schema.min(1, FORM_MESSAGE.COMMON.REQUIRED).required(),
        otherwise: (schema) => schema.optional(),
      }),
    recurringMonthlyDay: yup.string().when(['isRecurring', 'recurringType'], {
      is: (isRecurring: boolean, recurringType: string) =>
        isRecurring && recurringType === 'monthly_date',
      then: (schema) => schema.required(FORM_MESSAGE.COMMON.REQUIRED),
      otherwise: (schema) => schema.optional(),
    }),
  })

export const useRoomReservationForm = (
  options?: UseFormProps<RoomReservationFormDataType>,
) => {
  const today = new Date().toISOString()

  return useForm<RoomReservationFormDataType>({
    resolver: yupResolver(roomReservationFormSchema),
    mode: 'onChange',
    defaultValues: {
      isRecurring: false,
      recurringType: 'weekly',
      recurringStartDate: today,
      recurringEndDate: today,
      ...options?.defaultValues,
    },
    ...options,
  })
}
