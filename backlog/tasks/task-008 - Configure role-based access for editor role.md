---
id: task-008
title: "Configure role-based access for editor role"
status: To Do
created: 2026-04-13
---

# Configure role-based access for editor role

The daily editor is non-technical. Their admin panel should only show what they need — content collections — and hide everything else.

## Editor role permissions

| Resource | Access |
|---|---|
| Products | Full CRUD |
| Commission Inquiries | Read only |
| About (global) | Read + Update |
| Orders | Read only |
| Users | No access |
| Config / Globals (other) | No access |

## Steps

- Define an `editor` role in Payload access control
- Create a seed script or admin UI setup to assign the role
- Test by logging in as an editor and confirming hidden collections are inaccessible
- Ensure the admin sidebar only shows allowed collections for the editor role
