import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from 'payload'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionOverride } from '@payloadcms/plugin-ecommerce/types'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { DefaultDocumentIDType, Where } from 'payload'

export const ProductsCollection: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  admin: {
    ...defaultCollection?.admin,
    defaultColumns: ['title', 'type', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'products',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'products',
        req,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    ...defaultCollection?.defaultPopulate,
    title: true,
    slug: true,
    type: true,
    medium: true,
    dimensions: true,
    sold: true,
    featured: true,
    variantOptions: true,
    variants: true,
    enableVariants: true,
    gallery: true,
    priceInUSD: true,
    priceInILS: true,
    inventory: true,
    meta: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: 'שם היצירה' },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'description',
              type: 'richText',
              localized: true,
              label: 'תיאור',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              required: false,
            },
            {
              name: 'artistNotes',
              type: 'richText',
              localized: true,
              label: 'הערות האמן',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              required: false,
            },
            {
              name: 'gallery',
              type: 'array',
              label: 'תמונות',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'variantOption',
                  type: 'relationship',
                  relationTo: 'variantOptions',
                  admin: {
                    condition: (data) => {
                      return data?.enableVariants === true && data?.variantTypes?.length > 0
                    },
                  },
                  filterOptions: ({ data }) => {
                    if (data?.enableVariants && data?.variantTypes?.length) {
                      const variantTypeIDs = data.variantTypes.map((item: any) => {
                        if (typeof item === 'object' && item?.id) {
                          return item.id
                        }
                        return item
                      }) as DefaultDocumentIDType[]

                      if (variantTypeIDs.length === 0)
                        return {
                          variantType: {
                            in: [],
                          },
                        }

                      const query: Where = {
                        variantType: {
                          in: variantTypeIDs,
                        },
                      }

                      return query
                    }

                    return {
                      variantType: {
                        in: [],
                      },
                    }
                  },
                },
              ],
            },

            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock],
            },
          ],
          label: 'Content',
        },
        {
          fields: [
            ...defaultCollection.fields,
            {
              name: 'relatedProducts',
              type: 'relationship',
              filterOptions: ({ id }) => {
                if (id) {
                  return {
                    id: {
                      not_in: [id],
                    },
                  }
                }

                // ID comes back as undefined during seeding so we need to handle that case
                return {
                  id: {
                    exists: true,
                  },
                }
              },
              hasMany: true,
              relationTo: 'products',
            },
          ],
          label: 'Product Details',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: { localized: true },
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({ overrides: { localized: true } }),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'type',
      type: 'select',
      label: 'סוג',
      required: true,
      defaultValue: 'print',
      options: [
        { label: 'הדפס', value: 'print' },
        { label: 'מקור', value: 'original' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sku',
      type: 'text',
      label: 'מק"ט (SKU)',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'מזהה ייחודי למוצר, למשל: LL-001',
      },
    },
    {
      name: 'medium',
      type: 'text',
      label: 'מדיום',
      localized: true,
      admin: {
        position: 'sidebar',
        placeholder: 'למשל: אקוורל, שמן על בד',
      },
    },
    {
      name: 'dimensions',
      type: 'text',
      label: 'מידות',
      admin: {
        position: 'sidebar',
        placeholder: 'למשל: 50×70 ס״מ',
      },
    },
    {
      name: 'sold',
      type: 'checkbox',
      label: 'נמכר',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        condition: (data) => data?.type === 'original',
        description: 'סמן כנמכר עבור עבודות מקור',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'מוצג בעמוד הבית',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'סמן כדי להציג עבודה זו בעמוד הבית',
      },
    },
    {
      name: 'priceInILS',
      type: 'number',
      label: 'מחיר ₪ (ILS)',
      admin: {
        position: 'sidebar',
        step: 1,
      },
    },
    {
      name: 'priceInILSEnabled',
      type: 'checkbox',
      defaultValue: true,
      admin: { hidden: true },
    },
    {
      name: 'categories',
      type: 'relationship',
      label: 'קטגוריות',
      admin: {
        position: 'sidebar',
        sortOptions: 'title',
      },
      hasMany: true,
      relationTo: 'categories',
    },
    slugField(),
  ],
})
