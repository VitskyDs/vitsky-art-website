import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactFormData } from './contact-form'
import { contactPageData } from './contact-page'
import { homePageData } from './home'
import { imageHero1Data } from './image-hero-1'
import { VariantOption } from '@/payload-types'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'products',
  'forms',
  'form-submissions',
  'variants',
  'variantOptions',
  'variantTypes',
  'carts',
  'transactions',
  'addresses',
  'orders',
]

const globals: GlobalSlug[] = ['header', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: { navItems: [] },
        depth: 0,
        context: { disableRevalidate: true },
      }),
    ),
  )

  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} })
    if (payload.collections[collection].config.versions) {
      await payload.db.deleteVersions({ collection, req, where: {} })
    }
  }

  payload.logger.info(`— Seeding media...`)

  const heroBuffer = await fetchFileByURL(
    'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
  )

  const imageHero = await payload.create({
    collection: 'media',
    data: { ...imageHero1Data, alt: 'Vitsky artwork' },
    file: heroBuffer,
  })

  payload.logger.info(`— Seeding categories...`)

  const [printsCategory, originalsCategory] = await Promise.all([
    payload.create({
      collection: 'categories',
      data: { title: 'Prints', slug: 'prints' },
    }),
    payload.create({
      collection: 'categories',
      data: { title: 'Originals', slug: 'originals' },
    }),
  ])

  payload.logger.info(`— Seeding variant types and options...`)

  const sizeVariantType = await payload.create({
    collection: 'variantTypes',
    data: { name: 'size', label: 'Size' },
  })

  const sizeOptions = [
    { label: 'A5', value: 'a5' },
    { label: 'A4', value: 'a4' },
    { label: 'A3', value: 'a3' },
    { label: '50×70cm', value: '50x70' },
  ]

  const sizeVariantOptionsResults: VariantOption[] = []

  for (const option of sizeOptions) {
    const result = await payload.create({
      collection: 'variantOptions',
      data: { ...option, variantType: sizeVariantType.id },
    })
    sizeVariantOptionsResults.push(result)
  }

  const [a5, a4, a3, size50x70] = sizeVariantOptionsResults

  payload.logger.info(`— Seeding products...`)

  // ILS prices by size (whole shekels)
  const SIZE_ILS: Record<string, number> = { a5: 60, a4: 99, a3: 150, '50x70': 330 }

  const printProductsData = [
    {
      title: 'City Towers',
      slug: 'city-towers',
      description:
        'A vibrant urban landscape capturing the energy of the modern city. Watercolour and ink on paper.',
      priceInILS: SIZE_ILS.a4,
    },
    {
      title: 'The Dark Forest',
      slug: 'the-dark-forest',
      description:
        'A moody exploration of light filtering through ancient trees. Watercolour on cold press paper.',
      priceInILS: SIZE_ILS.a4,
    },
    {
      title: 'Tel Aviv Waterfront',
      slug: 'tel-aviv-waterfront',
      description:
        'The golden hour along the Tel Aviv promenade, rendered in loose expressive strokes.',
      priceInILS: SIZE_ILS.a4,
    },
  ]

  const richTextDescription = (text: string) => ({
    root: {
      type: 'root' as const,
      children: [
        {
          type: 'paragraph' as const,
          children: [
            {
              type: 'text' as const,
              detail: 0,
              format: 0,
              mode: 'normal' as const,
              style: '',
              text,
              version: 1,
            },
          ],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  })

  const products = []

  for (const productData of printProductsData) {
    const product = await payload.create({
      collection: 'products',
      depth: 0,
      data: {
        title: productData.title,
        slug: productData.slug,
        _status: 'published',
        type: 'print',
        enableVariants: true,
        variantTypes: [sizeVariantType],
        inventory: 0,
        priceInILS: productData.priceInILS,
        priceInILSEnabled: true,
        priceInUSDEnabled: true,
        priceInUSD: Math.round(productData.priceInILS * 28), // placeholder USD
        categories: [printsCategory],
        gallery: [{ image: imageHero.id }],
        description: richTextDescription(productData.description),
        meta: {
          title: `${productData.title} | Vitsky`,
          image: imageHero.id,
          description: productData.description,
        },
      },
    })

    // Create size variants for each print with fixed ILS prices
    for (const sizeOption of [a5, a4, a3, size50x70]) {
      const ilsPrice = SIZE_ILS[sizeOption.value]
      await payload.create({
        collection: 'variants',
        depth: 0,
        data: {
          product: product.id,
          options: [sizeOption],
          inventory: 50,
          priceInILS: ilsPrice,
          priceInILSEnabled: true,
          priceInUSDEnabled: true,
          priceInUSD: Math.round(ilsPrice * 28), // placeholder USD
          _status: 'published',
        },
      })
    }

    products.push(product)
  }

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData(),
  })

  payload.logger.info(`— Seeding pages...`)

  await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: homePageData({
        heroImage: imageHero,
        featuredProducts: products,
      }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm }),
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          { link: { type: 'custom', label: 'Prints', url: '/prints' } },
          { link: { type: 'custom', label: 'Originals', url: '/originals' } },
          { link: { type: 'custom', label: 'Commissions', url: '/commissions' } },
          { link: { type: 'custom', label: 'About', url: '/about' } },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          { link: { type: 'custom', label: 'Prints', url: '/prints' } },
          { link: { type: 'custom', label: 'Originals', url: '/originals' } },
          { link: { type: 'custom', label: 'Commissions', url: '/commissions' } },
          { link: { type: 'custom', label: 'About', url: '/about' } },
          { link: { type: 'custom', label: 'Admin', url: '/admin' } },
        ],
      },
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
