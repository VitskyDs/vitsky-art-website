import type { Media, Product, ThreeItemGridBlock as ThreeItemGridBlockProps } from '@/payload-types'

import { Media as MediaComponent } from '@/components/Media'
import Link from 'next/link'
import React from 'react'
import type { DefaultDocumentIDType } from 'payload'
import { headers } from 'next/headers'

type Props = { item: Product; locale?: 'he' | 'en'; priority?: boolean }

export const ThreeItemGridItem: React.FC<Props> = ({ item, locale = 'he' }) => {
  let price: number | undefined

  if (item.enableVariants && item.variants?.docs?.length) {
    const variant = item.variants.docs[0]
    if (variant && typeof variant === 'object') {
      price =
        locale === 'he'
          ? ((variant as any).priceInILS ?? variant.priceInUSD ?? undefined)
          : (variant.priceInUSD ?? undefined)
    }
  }

  if (price == null) {
    price = locale === 'he' ? (item.priceInILS ?? item.priceInUSD ?? undefined) : (item.priceInUSD ?? undefined)
  }

  const image = item.gallery?.[0]?.image as Media | undefined
  const href = `${locale === 'en' ? '/en' : ''}/products/${item.slug}`

  return (
    <Link href={href} className="group flex flex-col gap-3">
      <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        {image ? (
          <MediaComponent
            resource={image}
            imgClassName="h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
            className="h-full w-full"
          />
        ) : (
          <div className="h-full w-full bg-neutral-200" />
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">{item.title}</span>
        {price != null && (
          <span className="font-mono text-xs text-neutral-500">
            {locale === 'he' ? `₪${price}` : `$${price}`}
          </span>
        )}
      </div>
    </Link>
  )
}

export const ThreeItemGridBlock: React.FC<
  ThreeItemGridBlockProps & {
    id?: DefaultDocumentIDType
    className?: string
  }
> = async ({ products }) => {
  if (!products || !products[0] || !products[1] || !products[2]) return null

  const headersList = await headers()
  const locale = (headersList.get('x-locale') as 'he' | 'en') ?? 'he'

  const [firstProduct, secondProduct, thirdProduct] = products

  return (
    <section className="container grid grid-cols-1 gap-6 sm:grid-cols-3">
      <ThreeItemGridItem item={firstProduct as Product} locale={locale} priority />
      <ThreeItemGridItem item={secondProduct as Product} locale={locale} priority />
      <ThreeItemGridItem item={thirdProduct as Product} locale={locale} />
    </section>
  )
}
