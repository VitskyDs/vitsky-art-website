---
id: task-009
title: "Enable draft and preview on all public-facing content"
status: To Do
created: 2026-04-13
---

# Enable draft and preview on all public-facing content

Allow the editor to review content in the live layout before publishing, preventing half-finished products from going live accidentally.

## Steps

- Enable Payload's `versions` (draft) feature on: Products, About global, any page globals
- Configure a Next.js draft mode / preview route (`/api/preview`) that Payload links to from the admin
- Confirm the "Preview" button in admin opens the correct frontend URL with draft content rendered
- Add a visible "טיוטה" (draft) badge on the frontend for draft content when in preview mode
