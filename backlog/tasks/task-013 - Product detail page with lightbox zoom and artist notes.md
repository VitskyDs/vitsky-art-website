---
id: task-013
title: "Product detail page: lightbox, zoom, and artist notes"
status: To Do
created: 2026-04-13
---

# Product detail page: lightbox, zoom, and artist notes

Each product gets a full detail page where buyers can inspect the work closely before purchasing.

## Sections

- High-res image gallery with lightbox / zoom (click to expand, inspect detail)
- Title, medium, dimensions
- Price
- Artist notes (rich text)
- "Add to cart" button (disabled + "נמכר" label if sold original)
- Lifestyle / in-situ shots if available (secondary gallery images)

## Steps

- Create `/shop/[slug]` dynamic route
- Implement an image lightbox component (e.g. yet-another-react-lightbox or similar)
- Render artist notes from Payload rich text
- Wire "Add to cart" to the cart state / ecommerce plugin
- Add proper SEO meta tags: title, description, og:image (see task-028)
- RTL + mobile-first
