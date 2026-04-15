import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import { TypeFilter } from './TypeFilter'

type Props = {
  title: string
  allLabel: string
}

async function MediumFilterList({ title, allLabel }: Props) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft: false,
    overrideAccess: false,
    limit: 500,
    select: { medium: true },
    where: {
      and: [
        { _status: { equals: 'published' } },
        { medium: { exists: true } },
      ],
    },
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
}

export function MediumFilter(props: Props) {
  return (
    <Suspense fallback={null}>
      <MediumFilterList {...props} />
    </Suspense>
  )
}
