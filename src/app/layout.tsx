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
