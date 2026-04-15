import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { SlugPageContent, generateSlugMetadata } from '../_page-components/SlugPage'

export async function generateStaticParams() {
  return []
}

export const metadata: Metadata = {
  title: 'Vitsky — Art & Prints',
  description: 'Original artwork and fine art prints by Vitsky.',
}

export default async function Page() {
  return <SlugPageContent slug="home" locale="en" />
}
