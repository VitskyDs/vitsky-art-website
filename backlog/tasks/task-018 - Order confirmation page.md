---
id: task-018
title: "Order confirmation page"
status: To Do
created: 2026-04-13
---

# Order confirmation page

Show buyers a clear confirmation after a successful purchase and trigger the confirmation email.

## Steps

- Create a `/order-confirmation/[orderId]` page
- Display: order number, items purchased, total, shipping address, estimated delivery info
- Trigger the order confirmation email (task-022) from the server after payment success
- Auto-mark purchased originals as `sold` in the Products collection
- Show a "המשך לקנות" (continue shopping) CTA back to the shop
- RTL + mobile-first
