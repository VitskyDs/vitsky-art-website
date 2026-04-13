---
id: task-010
title: "Configure automatic image resizing and optimization on upload"
status: To Do
created: 2026-04-13
---

# Configure automatic image resizing and optimization on upload

The editor should never have to think about file sizes. All uploaded images must be automatically resized and optimized by Payload on save.

## Steps

- Configure `imageSizes` in the media/upload collection to generate:
  - `thumbnail` — 300px wide (for grids)
  - `card` — 800px wide (for product cards)
  - `full` — 1600px wide (for lightbox/detail view)
- Enable `focalPoint` support so crops are intelligent
- Set maximum file size limit with a clear error message in Hebrew
- Confirm that uploading a large raw photo produces correctly sized variants in Vercel Blob Storage
- Verify Next.js `<Image>` uses the appropriate size variant per context
