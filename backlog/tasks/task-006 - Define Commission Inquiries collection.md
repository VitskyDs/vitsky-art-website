---
id: task-006
title: "Define Commission Inquiries collection"
status: To Do
created: 2026-04-13
---

# Define Commission Inquiries collection

Store commission inquiry form submissions in Payload so the editor can read them directly in the admin panel without needing email forwarding.

## Fields

| Field | Notes |
|---|---|
| name | Client name |
| email | Client email |
| description | Project description |
| budget | Budget range or amount |
| timeline | Desired completion date |
| submittedAt | Auto-set timestamp |

## Steps

- Create a `commission-inquiries` collection in Payload
- All fields read-only in admin (no editor can accidentally modify submissions)
- Disable create/update/delete for the editor role; allow read only
- Wire the frontend commission inquiry form to POST to this collection via the Payload REST or Local API
- Label all admin columns in Hebrew
