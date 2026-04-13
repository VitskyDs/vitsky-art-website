---
id: task-029
title: "Set up analytics from day one"
status: To Do
created: 2026-04-13
---

# Set up analytics from day one

Track site traffic and user behaviour from the moment the site goes live, before there's data to lose.

## Steps

- Choose between Plausible (privacy-friendly, no cookie banner needed) and Google Analytics 4
- Add the tracking snippet to the Next.js root layout
- If GA4: configure a cookie consent banner (required by Israeli law and GDPR)
- Verify events are firing in the analytics dashboard after a test visit
- Track key events: page views, add-to-cart, checkout start, purchase complete

## Recommendation

Plausible is simpler, privacy-compliant by default, and avoids the cookie banner requirement — a good fit for a small art site.
