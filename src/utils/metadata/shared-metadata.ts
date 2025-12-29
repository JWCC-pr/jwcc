import type { Metadata } from 'next'

import { ENV } from '@/configs/env'

const sharedTitle: Metadata['title'] = {
  template: '%s | 천주교 잠원동성당 - 파티마 성모',
  default: '천주교 잠원동성당 - 파티마 성모',
}
const sharedDescription = `1947년에 설립된 잠원동성당은 서울 강남·서초 지역에서 가장 오래된 성당으로 오랜 시간 신앙의 중심지 역할을 해왔습니다.`
const sharedKeywords = [
  '잠원동',
  '잠원동성당',
  '천주교',
  '가톨릭',
  '카톨릭',
  '천주교 잠원동성당',
  '서울대교구',
  '서초',
  '서초성당',
  '반포성당',
  '파티마성모',
  '예비신자',
  '혼배',
  '한신공영',
  '천주교잠원동',
  '잠원성당',
  '천주교회',
  '잠원천주교회',
]
const sharedImages = ['/images/og.png']

interface IGetSharedMetadataArgs {
  title?: Metadata['title']
  description?: string
  keywords?: string[]
  images?: string[]
}

/** 공용으로 사용할 메타데이터 */
export const getSharedMetadata = ({
  title = sharedTitle,
  description = sharedDescription,
  keywords = sharedKeywords,
  images = sharedImages,
}: IGetSharedMetadataArgs = {}): Metadata => ({
  metadataBase: new URL(ENV.DOMAIN || 'https://www.jwcc.or.kr'),
  title,
  description,
  keywords: [...new Set([...sharedKeywords, ...keywords])],
  icons: [
    { rel: 'shortcut icon', url: '/favicon-16x16.png', sizes: '16x16' },
    { rel: 'shortcut icon', url: '/favicon-32x32.png', sizes: '32x32' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    {
      rel: 'android-chrome',
      url: '/android-chrome-192x192.png',
      sizes: '192x192',
    },
    {
      rel: 'android-chrome',
      url: '/android-chrome-512x512.png',
      sizes: '512x512',
    },
  ],
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'ko',
    siteName: sharedTitle.default,
    title: title ?? sharedTitle,
    description,
    images,
    url: ENV.DOMAIN || 'https://www.jwcc.or.kr/',
    countryName: 'Korea',
  },
  twitter: {
    card: 'summary_large_image',
    images,
    title: title ?? sharedTitle,
    description,
    site: '@site',
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
})
