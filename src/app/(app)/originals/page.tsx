import { OriginalsPageContent } from '../_page-components/OriginalsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Browse original artworks by Vitsky.',
  title: 'Originals | Vitsky',
}

export default async function Page() {
  return <OriginalsPageContent locale="he" />
}
