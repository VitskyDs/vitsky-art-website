---
id: task-017
title: "Cart and multi-step guest checkout flow"
status: To Do
created: 2026-04-13
---

# Cart and multi-step guest checkout flow

A smooth, no-account-required checkout experience.

## Flow

1. Cart (review items, quantities, subtotal)
2. Shipping details (name, address)
3. Payment (Grow / Israeli gateway — task-019)
4. Order confirmation (task-018)

## Steps

- Use the cart and checkout scaffolding from the Payload ecommerce template as the starting point
- Ensure guest checkout works — no account creation required
- Multi-step UI with clear progress indicator in Hebrew
- Validate shipping fields with Hebrew error messages
- Prevent checkout on sold originals (guard server-side too, not just UI)
- Link to shipping & returns policy (task-020) during the shipping step
- RTL + mobile-first
