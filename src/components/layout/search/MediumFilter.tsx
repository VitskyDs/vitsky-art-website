import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import { TypeFilter } from './TypeFilter'

type Props = {
  title: string
  allLabel: string
  locale?: 'he' | 'en'
}

async function MediumFilterList({ title, allLabel, locale = 'he' }: Props) {
  try {
    const payload = await getPayload({ config: configPromise })

    // Fetch all published products with the medium field, using explicit locale
    // so Payload can correctly JOIN products_locales and select the right column.
    // Filter out null/empty values in JS rather than via a localized `exists` where clause.
    const result = await payload.find({
      collection: 'products',
      locale,
      draft: false,
      overrideAccess: false,
      limit: 500,
      select: { medium: true },
      where: { _status: { equals: 'published' } },
    })

    const mediums = Array.from(
      new Set(
        result.docs
          .map((p) => (p as any).medium as string | undefined)
          .filter((m): m is string => typeof m === 'string' && m.trim() !== ''),
      ),
    ).sort()

    if (mediums.length === 0) return null

    const options = mediums.map((m) => ({ label: m, value: m }))

    return <TypeFilter title={title} allLabel={allLabel} options={options} param="medium" />
  } catch {
    // Fail silently — medium filter is non-critical
    return null
  }
}

export function MediumFilter(props: Props) {
  return (
    <Suspense fallback={null}>
      <MediumFilterList {...props} />
    </Suspense>
  )
}
