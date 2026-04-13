---
id: task-011
title: "Homepage: hero section, featured works, and artist intro"
status: To Do
created: 2026-04-13
---

# Homepage: hero section, featured works, and artist intro

Build the homepage with a strong visual first impression and clear navigation paths.

## Sections

1. **Hero** — Full-screen artwork image or curated gallery carousel. Bold, gallery-style.
2. **Featured / New Arrivals** — Grid of selected products. Editable via a "featured" ordering in the admin.
3. **Artist Intro** — Short bio excerpt with a link to the full About page.
4. **Navigation** — Clear links to Shop, Commissions, About, Contact.

## Steps

- Create the `/` Next.js page
- Fetch featured products from Payload (filter by a `featured` boolean field on Products)
- Build a full-bleed hero component (image + optional overlay text)
- Build a product card grid component (reusable for Shop page too)
- Ensure RTL layout works correctly on all sections
- Mobile-first responsive design
