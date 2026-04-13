---
id: task-004
title: "Set up Next.js i18n with Hebrew default locale and RTL layout"
status: To Do
created: 2026-04-13
---

# Set up Next.js i18n with Hebrew default locale and RTL layout

Configure Next.js internationalization from day one so English can be added later without a retrofit. Launch in Hebrew only.

## Steps

- Set `he` as the default locale in `next.config.js` i18n config
- Add `en` as a future locale (inactive at launch) so routing is future-proof
- Set `<html lang="he" dir="rtl">` in the root layout
- Choose a Hebrew-friendly font (Noto Sans Hebrew or Heebo) and load it via `next/font`
- Apply global RTL CSS (text alignment, flex direction defaults, etc.)
- Confirm the admin panel has RTL styles applied for the Hebrew-speaking editor

## Notes

- Retrofitting i18n after launch is costly — get the routing and dir attribute right now even if only Hebrew ships
- Payload CMS supports localized fields natively; enable per-field localization in collections that will need English later
