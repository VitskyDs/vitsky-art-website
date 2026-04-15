import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { SlugPageContent, generateSlugMetadata } from '../_page-components/SlugPage'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  const params = pages.docs
    ?.filter((doc) => doc.slug !== 'home')
    .map(({ slug }) => ({ slug }))

  return params
}

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Page({ params }: Args) {
  const { slug = 'home' } = await params
  return <SlugPageContent slug={slug} locale="he" />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params
  return generateSlugMetadata({ slug, locale: 'he' })
}
