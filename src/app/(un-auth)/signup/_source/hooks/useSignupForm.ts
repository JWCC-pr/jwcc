import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FORM_MESSAGE } from '@/constants/form/helper-text'
import { REGEX } from '@/constants/form/regex'

export interface SignupFormDataType {
  // ================================ 로그인 정보 ================================
  /** 이메일 정보 */
  email: {
    /** 이메일 */
    value: string
    /** 인증번호 */
    verificationCode: string
    /** 인증 여부 */
    isVerified: boolean
  }

  password: string
  passwordConfirm: string

  // ================================ 회원 정보 ================================
  /** 이름 */
  name: string
  /** 세례명 */
  baptismName: string
  /** 주소 */
  address: string
  /** 상세 주소 */
  addressDetail?: string
  /** 생년월일 */
  birthDate: {
    year: string
    month: string
    day: string
  }
  /** 분과 */
  department: string

  // ================================ 약관 동의 ================================
  /** 약관 동의 */
  agreement: {
    /** 서비스 이용 약관 동의 */
    termsOfService: boolean
    /** 개인정보 수집 및 이용 동의 */
    privacyPolicy: boolean
  }
}

export const signupFormSchema: yup.ObjectSchema<SignupFormDataType> = yup
  .object()
  .shape({
    // ================================ 로그인 정보 ================================
    email: yup.object().shape({
      value: yup
        .string()
        .required(FORM_MESSAGE.COMMON.REQUIRED)
        .matches(REGEX.EMAIL, FORM_MESSAGE.EMAIL.FORMAT),
      verificationCode: yup.string().required(),
      isVerified: yup.boolean().required().oneOf([true]).required(),
    }),
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

    // ================================ 회원 정보 ================================
    name: yup
      .string()
      .required(FORM_MESSAGE.COMMON.REQUIRED)
      .min(2, FORM_MESSAGE.NAME.MIN)
      .max(20, FORM_MESSAGE.NAME.MAX)
      .matches(REGEX.NAME, FORM_MESSAGE.NAME.FORMAT),
    baptismName: yup
      .string()
      .required(FORM_MESSAGE.COMMON.REQUIRED)
      .min(1, FORM_MESSAGE.BAPTISM_NAME.MIN)
      .max(20, FORM_MESSAGE.BAPTISM_NAME.MAX)
      .matches(REGEX.BAPTISM_NAME, FORM_MESSAGE.BAPTISM_NAME.FORMAT),
    address: yup
      .string()
      .required(FORM_MESSAGE.COMMON.REQUIRED)
      .max(100, FORM_MESSAGE.ADDRESS.MAX),
    addressDetail: yup.string().max(100, FORM_MESSAGE.ADDRESS.MAX),
    birthDate: yup
      .object()
      .shape({
        year: yup.string().required(),
        month: yup.string().required(),
        day: yup.string().required(),
      })
      .required(),
    department: yup.string().required(),

    // ================================ 약관 동의 ================================
    agreement: yup
      .object()
      .shape({
        termsOfService: yup.boolean().required(),
        privacyPolicy: yup.boolean().required(),
      })
      .required(),
  })

export const useSignupForm = (options?: UseFormProps<SignupFormDataType>) => {
  return useForm<SignupFormDataType>({
    resolver: yupResolver(signupFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: {
        value: '',
        verificationCode: '',
        isVerified: false,
      },
    },
    ...options,
  })
}
