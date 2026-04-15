import { getCachedGlobal } from '@/utilities/getGlobals'
import { headers } from 'next/headers'

import './index.css'
import { HeaderClient } from './index.client'

export async function Header() {
  const h = await headers()
  const locale = (h.get('x-locale') ?? 'he') as 'he' | 'en'
  const header = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient header={header} />
}
