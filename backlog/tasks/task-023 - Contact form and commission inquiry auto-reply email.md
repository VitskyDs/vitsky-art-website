---
id: task-023
title: "Contact form and commission inquiry auto-reply email"
status: To Do
created: 2026-04-13
---

# Contact form and commission inquiry auto-reply email

Automatically confirm to visitors that their message or commission inquiry was received.

## Emails

1. **Contact form auto-reply** — "תודה שפנית, נחזור אליך בהקדם"
2. **Commission inquiry auto-reply** — "קיבלנו את פנייתך לקומישן, נחזור אליך עם פרטים נוספים בתוך X ימי עסקים"

## Steps

- Build simple text/HTML email templates for both auto-replies
- Trigger contact auto-reply from the contact form API route (task-016)
- Trigger commission auto-reply from the commission inquiry form submission (task-014)
- Use the email adapter from task-021
- Test Hebrew RTL rendering in common email clients
