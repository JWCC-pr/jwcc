import { type NextRequest, NextResponse } from 'next/server'

import * as cheerio from 'cheerio'

export const runtime = 'nodejs'

interface LinkPreviewData {
  title?: string
  description?: string
  image?: string
  siteName?: string
  favicon?: string
  url: string
}

/**
 * API Route: GET /api/link-preview?url=...
 * 외부 URL의 Open Graph 메타 데이터를 가져와 반환합니다.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const url = searchParams.get('url')

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter is required' },
        { status: 400 },
      )
    }

    // URL 유효성 검사
    let targetUrl: URL
    try {
      targetUrl = new URL(url)
      if (!['http:', 'https:'].includes(targetUrl.protocol)) {
        throw new Error('Invalid protocol')
      }
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    // 외부 URL HTML 가져오기
    const response = await fetch(targetUrl.toString(), {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; LinkPreviewBot/1.0; +https://jamwon-church.co.kr)',
      },
      signal: AbortSignal.timeout(5000), // 5초 타임아웃
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL: ${response.status}` },
        { status: response.status },
      )
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    // Open Graph 메타 태그 파싱
    const getMetaContent = (property: string): string | undefined => {
      return (
        $(`meta[property="${property}"]`).attr('content') ||
        $(`meta[name="${property}"]`).attr('content')
      )
    }

    const previewData: LinkPreviewData = {
      url: targetUrl.toString(),
      title:
        getMetaContent('og:title') ||
        getMetaContent('twitter:title') ||
        $('title').text() ||
        undefined,
      description:
        getMetaContent('og:description') ||
        getMetaContent('twitter:description') ||
        getMetaContent('description') ||
        undefined,
      image:
        getMetaContent('og:image') ||
        getMetaContent('twitter:image') ||
        undefined,
      siteName: getMetaContent('og:site_name') || targetUrl.hostname,
      favicon:
        $('link[rel="icon"]').attr('href') ||
        $('link[rel="shortcut icon"]').attr('href') ||
        `${targetUrl.origin}/favicon.ico`,
    }

    // 상대 경로 URL을 절대 경로로 변환
    if (previewData.image && !previewData.image.startsWith('http')) {
      previewData.image = new URL(
        previewData.image,
        targetUrl.origin,
      ).toString()
    }
    if (previewData.favicon && !previewData.favicon.startsWith('http')) {
      previewData.favicon = new URL(
        previewData.favicon,
        targetUrl.origin,
      ).toString()
    }

    return NextResponse.json(previewData, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200', // 24시간 캐시
      },
    })
  } catch (error) {
    console.error('Link preview error:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch preview',
      },
      { status: 500 },
    )
  }
}
