'use client'
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react'
import { useEffect } from 'react'

type Props = {
  locale: 'he' | 'en'
}

export function LocaleSync({ locale }: Props) {
  const { setCurrency } = useCurrency()

  useEffect(() => {
    setCurrency(locale === 'en' ? 'USD' : 'ILS')
  }, [locale, setCurrency])

  return null
}
