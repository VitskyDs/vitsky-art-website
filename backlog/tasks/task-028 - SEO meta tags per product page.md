---
id: task-028
title: "SEO meta tags per product page"
status: To Do
created: 2026-04-13
---

# SEO meta tags per product page

Each product and key page needs proper meta tags so it's discoverable and shareable.

## Steps

- Add Payload SEO fields to the Products collection: `metaTitle`, `metaDescription` (with Hebrew defaults auto-generated from title + medium)
- Use Next.js `generateMetadata` to render per-page `<title>`, `<meta name="description">`, and `og:` tags
- Set `og:image` to the product's primary image
- Add `alt` text field to all image uploads in the Products collection
- Apply the same pattern to: Homepage, About, Commissions, Contact
- Verify with an SEO browser extension or Lighthouse audit
