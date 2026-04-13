---
id: task-003
title: "Configure Vercel deployment and Blob Storage for images"
status: To Do
created: 2026-04-13
---

# Configure Vercel deployment and Blob Storage for images

Connect the repo to Vercel for continuous deployment and configure Vercel Blob Storage as the image/media backend for Payload.

## Steps

- Import the GitHub repo into Vercel
- Set all required environment variables in Vercel dashboard (`DATABASE_URI`, `PAYLOAD_SECRET`, etc.)
- Enable Vercel Blob Storage and add `BLOB_READ_WRITE_TOKEN` to env vars
- Configure the Payload storage adapter to use Vercel Blob
- Confirm image uploads work in the admin panel on the deployed preview URL
