import type { Product } from '@/payload-types'

import Link from 'next/link'
import React from 'react'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'

type Props = {
  product: Partial<Product>
  locale?: 'he' | 'en'
}

export const ProductGridItem: React.FC<Props> = ({ product, locale = 'he' }) => {
  const { gallery, priceInUSD, priceInILS, title } = product

  // Pick price based on locale: ILS for Hebrew, USD for English
  const rawPrice = locale === 'he' ? priceInILS : priceInUSD

  // Fall back to USD if ILS not set
  let price: number | undefined = rawPrice ?? priceInUSD ?? undefined

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (variant && typeof variant === 'object') {
      const variantPrice =
        locale === 'he'
          ? (variant as any).priceInILS ?? variant.priceInUSD
          : variant.priceInUSD
      if (variantPrice && typeof variantPrice === 'number') {
        price = variantPrice
      }
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  const href = `${locale === 'en' ? '/en' : ''}/products/${product.slug}`

  return (
    <Link className="group flex flex-col gap-3" href={href}>
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        {image ? (
          <Media
            className="h-full w-full"
            imgClassName="h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
            resource={image}
          />
        ) : (
          <div className="h-full w-full bg-neutral-200" />
        )}
        {product.sold && product.type === 'original' && (
          <div className="absolute inset-0 flex items-end p-3 pointer-events-none">
            <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
              {locale === 'he' ? 'נמכר' : 'Sold'}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm">{title}</span>
        {typeof price === 'number' && (
          <span className="font-mono text-xs text-neutral-500">
            <Price amount={price} currencyCode={locale === 'he' ? 'ILS' : 'USD'} />
          </span>
        )}
      </div>
    </Link>
  )
}
