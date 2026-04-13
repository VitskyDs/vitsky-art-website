---
id: task-007
title: "Configure About page as Payload global with rich text"
status: To Do
created: 2026-04-13
---

# Configure About page as Payload global with rich text

Allow the editor to update the About page content directly from the admin panel without developer involvement.

## Fields

| Field | Hebrew label | Notes |
|---|---|---|
| bio | סיפור האמן | Rich text |
| studioPhotos | תמונות סטודיו | Upload, multiple |
| exhibitions | תערוכות ולקוחות בולטים | Array of text entries |
| cv | קורות חיים | File upload (PDF), optional |

## Steps

- Create an `about` Global in Payload
- Enable draft/preview so the editor can review before publishing
- Render the global content on the `/about` Next.js page
