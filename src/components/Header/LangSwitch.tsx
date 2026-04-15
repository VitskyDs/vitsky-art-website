'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function LangSwitch() {
  const pathname = usePathname()
  const isEn = pathname.startsWith('/en')

  if (isEn) {
    const hePath = pathname.replace(/^\/en/, '') || '/'
    return (
      <Link
        href={hePath}
        className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
      >
        עב
      </Link>
    )
  }

  const enPath = `/en${pathname === '/' ? '' : pathname}`
  return (
    <Link
      href={enPath}
      className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
    >
      EN
    </Link>
  )
}
