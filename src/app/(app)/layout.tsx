import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { LocaleSync } from '@/components/LocaleSync'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Frank_Ruhl_Libre } from 'next/font/google'
import { headers } from 'next/headers'
import React from 'react'
import './globals.css'

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500'],
  variable: '--font-frank-ruhl',
})

export default async function RootLayout({ children }: { children: ReactNode }) {
  const h = await headers()
  const locale = (h.get('x-locale') ?? 'he') as 'he' | 'en'
  const dir = h.get('x-dir') ?? 'rtl'

  return (
    <html
      className={[GeistSans.variable, GeistMono.variable, frankRuhl.variable]
        .filter(Boolean)
        .join(' ')}
      lang={locale}
      dir={dir}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar />
          <LivePreviewListener />
          <LocaleSync locale={locale} />

          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
