---
id: task-002
title: "Configure PostgreSQL via Neon and connect to Payload"
status: To Do
created: 2026-04-13
---

# Configure PostgreSQL via Neon and connect to Payload

Set up a Neon free-tier PostgreSQL database and wire it into the Payload CMS database adapter.

## Steps

- Create a new Neon project and obtain the connection string
- Install `@payloadcms/db-postgres` (or confirm it ships with the template)
- Set `DATABASE_URI` in `.env.local`
- Run Payload migrations to initialize the schema
- Verify collections can be created and queried in the admin panel
