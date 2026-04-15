'use client'

import { createUrl } from '@/utilities/createUrl'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

type Option = { label: string; value: string }

type Props = {
  title: string
  allLabel: string
  options: Option[]
  param: string
}

function ParamFilterItem({ label, value, param }: { label: string; value: string; param: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentValue = searchParams.get(param) ?? ''
  const active = currentValue === value

  const newParams = new URLSearchParams(searchParams.toString())
  if (value === '') {
    newParams.delete(param)
  } else {
    newParams.set(param, value)
  }

  const DynamicTag = active ? 'p' : Link

  return (
    <li className="mt-2 flex text-black dark:text-white">
      <DynamicTag
        className={clsx('w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100', {
          'underline underline-offset-4': active,
        })}
        href={createUrl(pathname, newParams)}
        prefetch={active ? undefined : false}
      >
        {label}
      </DynamicTag>
    </li>
  )
}

export function TypeFilter({ title, allLabel, options, param }: Props) {
  return (
    <nav>
      <h3 className="text-xs mb-2 text-neutral-500 dark:text-neutral-400">{title}</h3>
      <ul>
        <ParamFilterItem label={allLabel} value="" param={param} />
        {options.map((opt) => (
          <ParamFilterItem key={opt.value} label={opt.label} value={opt.value} param={param} />
        ))}
      </ul>
    </nav>
  )
}
