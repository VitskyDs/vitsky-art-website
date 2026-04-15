'use client'
import { CMSLink } from '@/components/Link'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

import { MobileMenu } from './MobileMenu'
import { LangSwitch } from './LangSwitch'
import type { Header } from 'src/payload-types'

import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'

type Props = {
  header: Header
}

export function HeaderClient({ header }: Props) {
  const menu = header.navItems || []
  const pathname = usePathname()

  return (
    <div className="relative z-20 border-b bg-white">
      <nav className="flex items-center justify-between container py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Vitsky"
            width={80}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-8">
          {menu.length ? (
            <ul className="hidden gap-8 text-xs tracking-widest uppercase md:flex md:items-center">
              {menu.map((item) => (
                <li key={item.id}>
                  <CMSLink
                    {...item.link}
                    size={'clear'}
                    className={cn('relative navLink', {
                      active:
                        item.link.url && item.link.url !== '/'
                          ? pathname.startsWith(item.link.url)
                          : false,
                    })}
                    appearance="nav"
                  />
                </li>
              ))}
            </ul>
          ) : null}

          <div className="flex items-center gap-4">
            <LangSwitch />
            <Suspense fallback={<OpenCartButton />}>
              <Cart />
            </Suspense>
            <div className="block md:hidden">
              <Suspense fallback={null}>
                <MobileMenu menu={menu} />
              </Suspense>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
