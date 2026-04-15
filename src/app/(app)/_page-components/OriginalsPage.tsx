import { Grid } from '@/components/Grid'
import { ProductGridItem } from '@/components/ProductGridItem'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { t } from '@/lib/i18n'

type Props = {
  locale: 'he' | 'en'
}

export async function OriginalsPageContent({ locale }: Props) {
  const payload = await getPayload({ config: configPromise })

  // Find the "originals" category
  const categoriesResult = await payload.find({
    collection: 'categories',
    locale,
    where: { slug: { equals: 'originals' } },
    limit: 1,
  })

  const categoryId = categoriesResult.docs[0]?.id

  const products = await payload.find({
    collection: 'products',
    locale,
    draft: false,
    overrideAccess: false,
    sort: 'title',
    select: {
      title: true,
      slug: true,
      gallery: true,
      priceInUSD: true,
      priceInILS: true,
    },
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(categoryId ? [{ categories: { contains: categoryId } }] : []),
      ],
    },
  })

  return (
    <div className="container my-16">
      <h1 className="text-2xl font-semibold tracking-widest uppercase mb-12">
        {t('originals.title', locale)}
      </h1>
      {products.docs.length > 0 ? (
        <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.docs.map((product) => (
            <ProductGridItem key={product.id} product={product} locale={locale} />
          ))}
        </Grid>
      ) : (
        <p className="text-neutral-500">{t('originals.empty', locale)}</p>
      )}
    </div>
  )
}
