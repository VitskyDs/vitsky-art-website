---
id: task-016
title: "Contact page: general form and auto-reply"
status: To Do
created: 2026-04-13
---

# Contact page: general form and auto-reply

A general contact page that also prompts visitors to reach out about special or large-scale projects.

## Sections

- Brief intro text encouraging visitors to reach out, especially for large/special projects
- Contact form: name, email, message
- Social media links (Instagram, etc.)
- After submission: auto-reply email confirming the message was received (task-023)

## Steps

- Create `/contact` Next.js page
- Build the contact form with validation
- Submit handler calls an API route that sends the auto-reply and optionally stores the message
- Display a Hebrew success / error message after submission
- Add social media links (Instagram is most important for visual artists)
- RTL + mobile-first
