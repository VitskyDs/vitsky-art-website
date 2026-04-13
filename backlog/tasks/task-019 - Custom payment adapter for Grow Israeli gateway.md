---
id: task-019
title: "Custom payment adapter for Grow (Israeli gateway)"
status: To Do
created: 2026-04-13
---

# Custom payment adapter for Grow (Israeli gateway)

The Payload ecommerce plugin defaults to Stripe. A custom adapter is needed for Grow or an equivalent Israeli payment gateway.

## Steps

- Research the Grow API (or chosen Israeli gateway) — obtain sandbox credentials
- Implement a custom payment adapter conforming to the Payload ecommerce plugin's payment interface
- Replace the default Stripe adapter with the custom one
- Test the full payment flow in sandbox mode:
  - Successful payment → order created, email sent, original marked sold
  - Failed payment → user shown Hebrew error, order not created
- Support credit/debit cards and local Israeli payment methods
- Store only what's needed for order tracking — never log raw card data

## Notes

- If Grow integration is blocked or undocumented, evaluate alternatives: Cardcom, Tranzila, or Meshulam (all common Israeli gateways)
- Document the chosen gateway and setup steps in a `decisions/` note
