import { FilterList } from '@/components/layout/search/filter'
import { TypeFilter } from '@/components/layout/search/TypeFilter'
import { MediumFilter } from '@/components/layout/search/MediumFilter'
import { sorting } from '@/lib/constants'
import { Search } from '@/components/Search'
import { t } from '@/lib/i18n'
import { headers } from 'next/headers'
import React, { Suspense } from 'react'

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const locale = (headersList.get('x-locale') as 'he' | 'en') ?? 'he'

  const typeOptions =
    locale === 'he'
      ? [
          { label: 'הדפסים', value: 'print' },
          { label: 'מקוריים', value: 'original' },
        ]
      : [
          { label: 'Prints', value: 'print' },
          { label: 'Originals', value: 'original' },
        ]

  return (
    <Suspense fallback={null}>
      <div className="container flex flex-col gap-8 my-16 pb-4">
        <Search className="mb-8" />

        <div className="flex flex-col md:flex-row items-start justify-between gap-16 md:gap-4">
          <div className="w-full flex-none flex flex-col gap-6 md:gap-8 basis-1/5">
            <TypeFilter
              title={t('shop.filterType', locale)}
              allLabel={t('shop.all', locale)}
              options={typeOptions}
              param="type"
            />
            <MediumFilter
              title={t('shop.filterMedium', locale)}
              allLabel={t('shop.all', locale)}
              locale={locale}
            />
            <FilterList list={sorting} title={t('shop.sortBy', locale)} />
          </div>
          <div className="min-h-screen w-full">{children}</div>
        </div>
      </div>
    </Suspense>
  )
}
