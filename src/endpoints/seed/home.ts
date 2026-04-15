import type { Media, Product } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type HomeArgs = {
  heroImage: Media
  featuredProducts: Product[]
}

export const homePageData: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  featuredProducts,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    title: 'Home',
    hero: {
      type: 'highImpact',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'View Prints',
            url: '/prints',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'Commissions',
            url: '/commissions',
          },
        },
      ],
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Vitsky',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h1',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Original artwork and fine art prints.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      media: heroImage,
    },
    layout: [
      ...(featuredProducts.length >= 3
        ? [
            {
              blockName: 'Featured Prints',
              blockType: 'threeItemGrid' as const,
              products: featuredProducts.slice(0, 3),
            },
          ]
        : []),
      {
        blockName: 'Authenticity',
        blockType: 'content' as const,
        columns: [
          {
            size: 'half' as const,
            enableLink: false,
            richText: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'heading',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Authenticity',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    tag: 'h2',
                    version: 1,
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Every print is produced from an original painting. Each piece comes with a certificate of authenticity and is signed by the artist.',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
          {
            size: 'half' as const,
            enableLink: false,
            richText: {
              root: {
                type: 'root',
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        type: 'text',
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: '',
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    textFormat: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
              },
            },
          },
        ],
      },
    ],
    meta: {
      description: 'Original artwork and fine art prints by Vitsky.',
      // @ts-ignore
      image: heroImage,
      title: 'Vitsky — Art & Prints',
    },
  }
}
