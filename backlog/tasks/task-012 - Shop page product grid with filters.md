---
id: task-012
title: "Shop page: product grid with filters"
status: To Do
created: 2026-04-13
---

# Shop page: product grid with filters

A browsable gallery of all available works with filtering by type and medium.

## Steps

- Create the `/shop` Next.js page
- Fetch all published products from Payload
- Display products in a responsive grid using the shared product card component (from task-011)
- Implement client-side filter UI: by type (prints / originals) and by medium
- Show "נמכר" (sold) badge on originals that are marked sold — keep them in the grid
- Sold originals should not be add-to-cart eligible
- Ensure filter state is reflected in the URL (query params) for shareability and back-navigation
- RTL layout + mobile-first
