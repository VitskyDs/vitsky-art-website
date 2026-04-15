import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { homeStaticData } from '@/endpoints/seed/home-static'
import React from 'react'
import type { Metadata } from 'next'

import type { Page } from '@/payload-types'
import { notFound } from 'next/navigation'

type Props = {
  slug: string
  locale: 'he' | 'en'
}

export async function SlugPageContent({ slug, locale }: Props) {
  const url = '/' + slug

  let page = await queryPageBySlug({ slug, locale })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStaticData() as Page
  }

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateSlugMetadata({
  slug,
  locale,
}: Props): Promise<Metadata> {
  const page = await queryPageBySlug({ slug, locale })
  return generateMeta({ doc: page })
}

const queryPageBySlug = async ({
  slug,
  locale,
}: {
  slug: string
  locale: 'he' | 'en'
}) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    locale,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        { slug: { equals: slug } },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
  })

  return result.docs?.[0] || null
}
