---
id: task-030
title: "Blog / journal section for SEO"
status: To Do
created: 2026-04-13
---

# Blog / journal section for SEO

A low-effort way to improve search engine discoverability and let the artist share their process, exhibitions, or inspiration.

## Steps

- Create a `Posts` collection in Payload with fields: title, content (rich text), coverImage, publishedAt, slug
- Create `/journal` index page (list of posts)
- Create `/journal/[slug]` individual post page
- Proper SEO meta tags per post (task-028 pattern)
- Link from the main navigation or footer
- RTL layout

## Notes

- This is lower priority than core e-commerce functionality — implement after the main shop and checkout are working
- Posts don't need to be complex: a photo + a paragraph is enough to start
