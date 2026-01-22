import { yupResolver } from '@hookform/resolvers/yup'

import { UseFormProps, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { FORM_MESSAGE } from '@/constants/form/helper-text'

export interface NewsFreeBoardFormDataType {
  title: string
  content: string
}

// HTML 태그를 제거하고 실제 텍스트만 추출하는 함수
const stripHtmlTags = (html: string): string => {
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 정규식으로 처리
    return html.replace(/<[^>]*>/g, '').trim()
  }
  // 클라이언트 사이드에서는 DOM을 사용
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

export const newsFreeBoardFormSchema: yup.ObjectSchema<NewsFreeBoardFormDataType> =
  yup.object().shape({
    title: yup.string().required(FORM_MESSAGE.COMMON.REQUIRED),
    content: yup
      .string()
      .required(FORM_MESSAGE.COMMON.REQUIRED)
      .test('not-empty', FORM_MESSAGE.COMMON.REQUIRED, (value) => {
        if (!value) return false
        const textContent = stripHtmlTags(value)
        return textContent.length > 0
      }),
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
