---
id: task-022
title: "Order confirmation email template"
status: To Do
created: 2026-04-13
---

# Order confirmation email template

Send a branded confirmation email to the buyer after a successful purchase.

## Email content

- Subject: אישור הזמנה מספר #[orderId]
- Greeting with buyer's name
- Summary of items purchased (name, image thumbnail, price)
- Total amount paid
- Shipping address
- Estimated delivery
- Contact info / link to contact page if they have questions

## Steps

- Build an HTML email template (React Email or plain HTML)
- Trigger send from the order confirmation flow (task-018) using the email adapter (task-021)
- Test with a real email address to verify formatting and Hebrew RTL rendering in email clients
