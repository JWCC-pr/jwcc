import type { Metadata } from 'next'

import { ENV } from '@/configs/env'

const sharedTitle: Metadata['title'] = {
  template: '%s | 잠원동성당',
  default: '잠원동성당',
}
// FIXME: 클라이언트와 소통 후 수정 필요
const sharedDescription = `천주교 서울대교구 잠원동성당 공식 홈페이지입니다. 미사시간 안내, 공지사항, 주보, 본당소식, 본당행사일정, 예비신자 안내, 혼인미사 예약 등 본당 정보를 제공합니다.`
const sharedKeywords = [
  '잠원동성당',
  '천주교',
  '가톨릭',
  '서울대교구',
  '잠원동',
  '성당',
  '서울 성당',
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
    { rel: 'shortcut icon', url: '/favicon-16x16.ico', sizes: '16x16' },
    { rel: 'shortcut icon', url: '/favicon-32x32.ico', sizes: '32x32' },
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
