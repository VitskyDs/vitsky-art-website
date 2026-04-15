import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
import { t } from '@/lib/i18n'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import React from 'react'

export const metadata = {
  description: 'Search for products in the store.',
  title: 'Shop',
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function ShopPage({ searchParams }: Props) {
  const { q: searchValue, sort, category, type, medium } = await searchParams
  const headersList = await headers()
  const locale = (headersList.get('x-locale') as 'he' | 'en') ?? 'he'

  const payload = await getPayload({ config: configPromise })

  const typeFilter = typeof type === 'string' && type ? type : undefined
  const mediumFilter = typeof medium === 'string' && medium ? medium : undefined

  const products = await payload.find({
    collection: 'products',
    locale,
    draft: false,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      gallery: true,
      categories: true,
      priceInUSD: true,
      priceInILS: true,
      type: true,
      sold: true,
    },
    ...(sort ? { sort } : { sort: 'title' }),
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(searchValue
          ? [
              {
                or: [
                  { title: { like: searchValue } },
                  { description: { like: searchValue } },
                ],
              },
            ]
          : []),
        ...(category ? [{ categories: { contains: category } }] : []),
        ...(typeFilter ? [{ type: { equals: typeFilter } }] : []),
        ...(mediumFilter ? [{ medium: { like: mediumFilter } }] : []),
      ],
    },
  })

  return (
    <div>
      {searchValue ? (
        <p className="mb-4">
          {products.docs?.length === 0
            ? t('shop.noResults', locale)
            : `${t('shop.showing', locale)} `}
          {products.docs?.length > 0 && (
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          )}
        </p>
      ) : null}

      {!searchValue && products.docs?.length === 0 && (
        <p className="mb-4">{t('shop.noResults', locale)}</p>
      )}

      {products?.docs.length > 0 ? (
        <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.docs.map((product) => {
            return <ProductGridItem key={product.id} product={product} locale={locale} />
          })}
        </Grid>
      ) : null}
    </div>
  )
}
