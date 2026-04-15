import type { Metadata } from 'next'
import { ProductPageContent, generateProductMetadata } from '../../../_page-components/ProductPage'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  return <ProductPageContent slug={slug} locale="en" />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  return generateProductMetadata({ slug, locale: 'en' })
}
