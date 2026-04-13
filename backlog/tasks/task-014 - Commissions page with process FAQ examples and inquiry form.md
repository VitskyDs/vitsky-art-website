---
id: task-014
title: "Commissions page: process, FAQ, examples, and inquiry form"
status: To Do
created: 2026-04-13
---

# Commissions page: process, FAQ, examples, and inquiry form

A dedicated page that explains commissions end-to-end and lets interested clients reach out with their project details.

## Sections

1. **Process steps** — Step-by-step: inquiry → brief → deposit → sketch → final delivery
2. **Pricing** — Clear starting price / range so clients self-qualify before submitting
3. **FAQ** — Covers timeline, revisions, deposits, and what happens if unhappy
4. **Past examples + testimonials** — Gallery of previous commission work with short client quotes
5. **Inquiry form** — Fields: name, email, project description, budget, desired timeline

## Steps

- Create `/commissions` Next.js page
- Store process steps and FAQ in a Payload global or hard-code (decide based on how often the editor needs to update them)
- Commission examples and testimonials should be editable via Payload (collection or global)
- Inquiry form POSTs to the Commission Inquiries collection (task-006)
- Show success message in Hebrew after submission
- RTL + mobile-first
