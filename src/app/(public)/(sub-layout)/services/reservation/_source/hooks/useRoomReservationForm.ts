import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FORM_MESSAGE } from '@/constants/form/helper-text'
import { RepeatRoomReservationRepeatTypeEnumType } from '@/generated/apis/@types/data-contracts'

export interface RoomReservationFormDataType {
  /** 제목 */
  title: string
  /** 사용단체명 (Backend: organizationName) */
  organizationName: string
  /** 시작 시간 (Backend: startAt) */
  startAt: string
  /** 종료 시간 (Backend: endAt) */
  endAt: string
  /** 일정 반복 여부 */
  isRecurring?: boolean
  /** 반복 유형 (Backend: repeatType) */
  repeatType?: RepeatRoomReservationRepeatTypeEnumType
  /** 반복 시작일 (Backend: startDate) */
  startDate?: string
  /** 반복 종료일 (Backend: endDate) */
  endDate?: string

  /** 요일 반복 > 반복 요일 (Backend: weekdays) */
  weekdays?: string[]
  /** 요일 반복 > 주차 선택 (Backend: weekOfMonth) */
  weekOfMonth?: string
  /** 날짜 반복 > 반복 일자 (Backend: monthDay) */
  monthDay?: string
}

export const roomReservationFormSchema: yup.ObjectSchema<RoomReservationFormDataType> =
  yup.object().shape({
    title: yup
      .string()
      .max(50, '제목은 최대 50자까지 입력 가능합니다')
      .required(FORM_MESSAGE.COMMON.REQUIRED),
    organizationName: yup
      .string()
      .max(10, '사용단체명은 최대 10자까지 입력 가능합니다')
      .required(FORM_MESSAGE.COMMON.REQUIRED),
    startAt: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
    endAt: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
    isRecurring: yup.boolean().optional(),
    repeatType: yup
      .string()
      .oneOf(['weekly', 'monthly_date'])
      .when('isRecurring', {
        is: true,
        then: (schema) => schema.required(FORM_MESSAGE.COMMON.REQUIRED),
        otherwise: (schema) => schema.optional(),
      }) as yup.StringSchema<RoomReservationFormDataType['repeatType']>,
    startDate: yup.string().when('isRecurring', {
      is: true,
      then: (schema) => schema.required(FORM_MESSAGE.COMMON.REQUIRED),
      otherwise: (schema) => schema.optional(),
    }),
    endDate: yup.string().when('isRecurring', {
      is: true,
      then: (schema) => schema.required(FORM_MESSAGE.COMMON.REQUIRED),
      otherwise: (schema) => schema.optional(),
    }),
    weekdays: yup
      .array()
      .of(yup.string().required())
      .when(['isRecurring', 'repeatType'], {
        is: (isRecurring: boolean, repeatType: string) =>
          isRecurring && repeatType === 'weekly',
        then: (schema) =>
          schema.min(1, FORM_MESSAGE.COMMON.REQUIRED).required(),
        otherwise: (schema) => schema.optional(),
      }),
    weekOfMonth: yup.string().when(['isRecurring', 'repeatType'], {
      is: (isRecurring: boolean, repeatType: string) =>
        isRecurring && repeatType === 'weekly',
      then: (schema) => schema.min(1, FORM_MESSAGE.COMMON.REQUIRED).required(),
      otherwise: (schema) => schema.optional(),
    }),
    monthDay: yup.string().when(['isRecurring', 'repeatType'], {
      is: (isRecurring: boolean, repeatType: string) =>
        isRecurring && repeatType === 'monthly_date',
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
      repeatType: 'weekly',
      startDate: today,
      endDate: today,
      ...options?.defaultValues,
    },
    ...options,
  })
}
