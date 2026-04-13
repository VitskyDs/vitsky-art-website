---
id: task-021
title: "Integrate Brevo or Resend for transactional email"
status: To Do
created: 2026-04-13
---

# Integrate Brevo or Resend for transactional email

Set up an email sending service on the free tier to power order confirmations and contact form auto-replies.

## Steps

- Choose between Brevo and Resend (both have free tiers; Resend has a better developer experience)
- Create an account, obtain API key, add to environment variables
- Configure the Payload email adapter (or a custom send function) to use the chosen provider
- Send a test email and verify delivery
- Document the chosen provider in `decisions/`

## Notes

- Resend is recommended for ease of use with Next.js
- Brevo works well if newsletter integration with the same platform is desired (task-031)
