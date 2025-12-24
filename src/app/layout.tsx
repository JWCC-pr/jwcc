import { Metadata, Viewport } from 'next'

import { GoogleAnalytics, GoogleTagManager } from '@/components/analytics'
import { Provider as ThemeProvider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'
import { catholic, pretendard } from '@/generated/fonts/next-fonts'
import { AppProvider } from '@/providers/app-provider'
import { getSharedMetadata } from '@/utils/metadata/shared-metadata'

/**
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */

export const metadata: Metadata = getSharedMetadata()

/**
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${catholic.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* 네이버 Saerch Advisor 인증 */}
        <meta
          name="naver-site-verification"
          content="e557363d16d49a9ed9f978ce37e7ab58ba2ba66e"
        />
      </head>

      <body>
        <AppProvider>
          <ThemeProvider>
            <Toaster />
            {children}
          </ThemeProvider>
        </AppProvider>
      </body>

      <GoogleAnalytics />
      <GoogleTagManager />
    </html>
  )
}
