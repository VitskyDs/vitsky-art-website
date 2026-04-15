import { PrintsPageContent } from '../../_page-components/PrintsPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Browse original prints by Vitsky.',
  title: 'Prints | Vitsky',
}

export default async function Page() {
  return <PrintsPageContent locale="en" />
}
