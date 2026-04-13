---
id: task-005
title: "Define Products collection with Hebrew field labels"
status: To Do
created: 2026-04-13
---

# Define Products collection with Hebrew field labels

Configure the Products collection in Payload to cover both prints and originals, with all field labels in Hebrew so the daily editor understands what to fill in.

## Fields (Hebrew labels)

| Field | Hebrew label | Notes |
|---|---|---|
| title | שם היצירה | Localized (he + en) |
| type | סוג | Select: print / original |
| medium | מדיום | e.g. שמן, אקוורל |
| dimensions | מידות | text, e.g. "50x70 ס״מ" |
| price | מחיר | Number, required |
| images | תמונות | Upload, multiple, required |
| artistNotes | הערות האמן | Rich text |
| sold | נמכר | Checkbox (originals only) |
| status | סטטוס | Draft / Published |

## Steps

- Extend or replace the template's default Product collection with the fields above
- Mark `price`, `images`, `title` as required
- Add conditional logic: show `sold` checkbox only when type = original
- Ensure `sold` originals display a "נמכר" label on the frontend without being removed from the gallery
