import { MetadataRoute } from 'next'

import { ENV } from '@/configs/env'
import { fetchExtended } from '@/configs/fetch/fetch-extend'
import { ROUTES } from '@/constants/routes'
import { BoardApi } from '@/generated/apis/Board/Board.api'
import { DocumentApi } from '@/generated/apis/Document/Document.api'
import { LiturgyFlowerApi } from '@/generated/apis/LiturgyFlower/LiturgyFlower.api'
import { NewsApi } from '@/generated/apis/News/News.api'
import { NoticeApi } from '@/generated/apis/Notice/Notice.api'
import { PassingNoticeApi } from '@/generated/apis/PassingNotice/PassingNotice.api'
import { WeeklyBulletinApi } from '@/generated/apis/WeeklyBulletin/WeeklyBulletin.api'

const BASE_URL = ENV.DOMAIN

const DEFAULT_SITEMAP = {
  priority: 0.8,
  changeFrequency: 'daily' as const,
}

// 동적으로 사이트맵 생성
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = Object.values(ROUTES)
    .filter((route) => typeof route !== 'function')
    .map((route) => ({
      url: `${BASE_URL}${route}`,
      ...DEFAULT_SITEMAP,
    }))

  const dynamicRoutes: MetadataRoute.Sitemap = []

  const OFFSET = 0
  const LIMIT = 100_000

  // 공지사항
  const noticeApi = new NoticeApi({ customFetch: fetchExtended })
  // 본당소식
  const newsApi = new NewsApi({ customFetch: fetchExtended })
  // 주보
  const weeklyBulletinApi = new WeeklyBulletinApi({
    customFetch: fetchExtended,
  })
  // 선종안내
  const passingNoticeApi = new PassingNoticeApi({ customFetch: fetchExtended })
  // 전례꽃 갤러리
  const liturgyFlowerApi = new LiturgyFlowerApi({ customFetch: fetchExtended })
  // 자유게시판
  const boardApi = new BoardApi({ customFetch: fetchExtended })
  // 자료실
  const documentApi = new DocumentApi({ customFetch: fetchExtended })

  try {
    const [
      notices,
      newsList,
      weeklyBulletins,
      passingNotices,
      liturgyFlowers,
      boards,
      documents,
    ] = await Promise.all([
      noticeApi.noticeList({
        query: {
          offset: OFFSET,
          limit: LIMIT,
        },
      }),
      newsApi.newsList({
        query: {
          offset: OFFSET,
          limit: LIMIT,
        },
      }),
      weeklyBulletinApi.weeklyBulletinList({
        query: {
          offset: OFFSET,
          limit: LIMIT,
        },
      }),
      passingNoticeApi.passingNoticeList({
        query: {
          offset: OFFSET,
          limit: LIMIT,
        },
      }),
      liturgyFlowerApi.liturgyFlowerList({
        query: {
          offset: OFFSET,
          limit: LIMIT,
        },
      }),
      boardApi.boardList({
        query: {
          offset: OFFSET,
          limit: LIMIT,
        },
      }),
      documentApi.documentList({
        query: {
          offset: OFFSET,
          limit: LIMIT,
        },
      }),
    ])

    dynamicRoutes.push(
      ...(notices.results?.map((notice) => ({
        url: `${BASE_URL}${ROUTES.NEWS_NOTICES}/${notice.id}`,
        ...DEFAULT_SITEMAP,
      })) ?? []),
    )
    dynamicRoutes.push(
      ...(newsList.results?.map((news) => ({
        url: `${BASE_URL}${ROUTES.NEWS_EVENT}/${news.id}`,
        ...DEFAULT_SITEMAP,
      })) ?? []),
    )
    dynamicRoutes.push(
      ...(weeklyBulletins.results?.map((weeklyBulletin) => ({
        url: `${BASE_URL}${ROUTES.NEWS_BULLETIN}/${weeklyBulletin.id}`,
        ...DEFAULT_SITEMAP,
      })) ?? []),
    )
    dynamicRoutes.push(
      ...(passingNotices.results?.map((passingNotice) => ({
        url: `${BASE_URL}${ROUTES.NEWS_PASSING_NOTICE}/${passingNotice.id}`,
        ...DEFAULT_SITEMAP,
      })) ?? []),
    )
    dynamicRoutes.push(
      ...(liturgyFlowers.results?.map((liturgyFlower) => ({
        url: `${BASE_URL}${ROUTES.NEWS_LITURGY_FLOWER}/${liturgyFlower.id}`,
        ...DEFAULT_SITEMAP,
      })) ?? []),
    )
    dynamicRoutes.push(
      ...(boards.results?.map((board) => ({
        url: `${BASE_URL}${ROUTES.NEWS_DOCUMENT}/${board.id}`,
        ...DEFAULT_SITEMAP,
      })) ?? []),
    )
    dynamicRoutes.push(
      ...(documents.results?.map((document) => ({
        url: `${BASE_URL}${ROUTES.NEWS_DOCUMENT}/${document.id}`,
        ...DEFAULT_SITEMAP,
      })) ?? []),
    )
  } catch (error) {
    console.error('동적인 데이터 조회 실패:', error)
  }

  return [...staticRoutes, ...dynamicRoutes]
}
