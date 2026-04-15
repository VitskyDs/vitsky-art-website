import type { Metadata } from 'next'
import { SlugPageContent, generateSlugMetadata } from '../../_page-components/SlugPage'

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function Page({ params }: Args) {
  const { slug = 'home' } = await params
  return <SlugPageContent slug={slug} locale="en" />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home' } = await params
  return generateSlugMetadata({ slug, locale: 'en' })
}
