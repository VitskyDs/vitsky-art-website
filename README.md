# art e-commerce website

## project overview

A personal e-commerce website to showcase and sell original artwork, prints, and custom commissions. The site should feel like a gallery — clean, visual, and easy to navigate — while also being fully functional for online sales.

---

## pages & features

### homepage
- hero section with a strong visual first impression — full-screen artwork or curated gallery
- clear navigation to shop, commissions, about, and contact
- featured or "new arrivals" works section
- brief artist intro with a link to the full about page

### shop
- **art prints** — browse and purchase printed reproductions
- **originals** — one-of-a-kind pieces available for sale; auto-mark as sold when purchased
- each product page includes: high-res images with zoom/lightbox, title, medium, dimensions, price, and artist notes
- filter and browse by category (prints vs. originals) or medium
- "sold" label on unavailable originals (keeps the gallery feel without removing the piece)

### commissions
- dedicated page explaining the commission process step by step (e.g. inquiry → brief → deposit → sketch → final)
- clear pricing range or starting price so clients self-qualify before reaching out
- FAQ section covering timeline, revisions, deposits, and what happens if they're unhappy
- past commission examples with client testimonials
- inquiry form for customers to describe their project, budget, and timeline

### checkout flow
- cart and checkout with a smooth, multi-step flow
- guest checkout — no account required
- order confirmation page + automated confirmation email
- clear shipping & returns policy linked during checkout

### about
- artist story, background, and creative philosophy
- photos of the studio or work-in-progress
- list of exhibitions, features, or notable clients (builds credibility)
- downloadable artist CV (optional but professional)

### contact
- general contact form
- messaging that prompts visitors to reach out about **special or large-scale projects**
- automated reply confirming the message was received

---

## payments

- payment processing tailored for **israel**
- integrate **[Grow](https://www.grow.link)** (or equivalent israeli payment gateway)
- support for credit/debit cards and local payment methods

---

## tech stack

> development is handled via **Claude Code**. the daily site editor is a non-technical user working through the Payload admin panel.

| layer | choice | notes |
|---|---|---|
| framework | [Next.js](https://nextjs.org) (App Router) | front-end and routing |
| cms | [Payload CMS v3](https://payloadcms.com) | admin panel + content management |
| e-commerce | [`@payloadcms/plugin-ecommerce`](https://payloadcms.com/docs/ecommerce/overview) | official plugin, currently beta — pin version |
| starting point | official Payload ecommerce template | scaffolds products, cart, orders, guest checkout, and tests |
| database | PostgreSQL (via [Neon](https://neon.tech) free tier) | recommended for Payload v3 |
| hosting | [Vercel](https://vercel.com) | one-click deploy from the template |
| image storage | Vercel Blob Storage | built into the Payload + Vercel setup |
| payment | custom adapter for Grow / Israeli gateway | Stripe is default — requires custom implementation |
| email | [Brevo](https://brevo.com) or [Resend](https://resend.com) free tier | order confirmations, contact form replies |
| analytics | [Plausible](https://plausible.io) or Google Analytics | add from day one |
| newsletter | [Mailchimp](https://mailchimp.com) or [Brevo](https://brevo.com) | free tier sufficient to start |

### known custom work required
- **payment adapter** — the ecommerce plugin defaults to Stripe; a custom adapter is needed for Grow or another Israeli gateway
- **RTL admin panel** — Payload's admin UI is LTR by default; the developer needs to apply RTL styles for the Hebrew-speaking editor
- **Hebrew field labels** — all CMS fields should be labelled in Hebrew so the daily user understands what to fill in

---

## cms editor experience

the daily user is non-technical. the developer must configure the admin panel so it feels simple and purpose-built, not like a raw CMS.

### what the editor should be able to do without developer help

| task | how |
|---|---|
| add a new artwork (print or original) | create a new product, upload image, fill in title/price/dimensions |
| mark an original as sold | toggle a "sold" checkbox on the product |
| update homepage featured works | drag-and-drop reorder in a "featured" collection |
| add a commission example | upload image + fill in a short description |
| edit about page text | rich text editor on the about page |
| view new commission inquiries | read-only inbox view in the admin panel |
| manage newsletter | handled externally via Mailchimp / Brevo dashboard |

### developer configuration requirements

- all field labels and helper text written in **hebrew**
- image upload fields should have **automatic resizing and optimization** on save — the editor should never have to think about file size
- **draft / preview** enabled on all public-facing content so the editor can review before publishing
- **role-based access**: the daily editor role only sees content collections (products, pages, inquiries) — not config, globals, or code-level settings
- **required fields clearly marked** to prevent half-finished products from being published accidentally
- commission inquiry form submissions stored in Payload as a collection so the editor can read them directly in the admin panel, without needing email forwarding setup

---

## language & localization

### phase 1 — hebrew (launch)
- the site launches in **hebrew only**
- all UI, product content, and forms are in hebrew
- layout must support **RTL (right-to-left)** text direction
- font choice should prioritize a hebrew-friendly typeface (e.g. [Noto Sans Hebrew](https://fonts.google.com/noto/specimen/Noto+Sans+Hebrew) or [Heebo](https://fonts.google.com/specimen/Heebo))
- Next.js has built-in i18n routing support — set `he` as the default locale from the start

### phase 2 — english (future)
- add `en` as a second locale in Next.js i18n config
- Payload CMS supports **localized fields** natively — content editors can fill in hebrew and english versions of each field
- URL structure will be `/` for hebrew and `/en/` for english (or subdomain approach)
- no extra architectural work needed if i18n is set up correctly from day one

> **important:** build with i18n in mind from the start, even if only hebrew ships at launch. retrofitting localization later is costly.

---

## suggested additions (based on comparable art sites)

these features were missing from the original scope but appear consistently across successful art e-commerce sites:

### trust & social proof
- **customer testimonials** — especially important for commissions; a short quote next to a finished piece goes a long way
- **trust badges** near checkout (secure payment, satisfaction guarantee)
- social media links in footer (Instagram is particularly important for visual artists)

### image quality standards
- all artwork images should be high-resolution with a **zoom / lightbox** feature so buyers can inspect details closely
- include lifestyle shots where possible (art hanging on a wall, etc.) — helps buyers visualize the piece in their space
- keep image file sizes optimized for web (under 500kb) to maintain fast load times

### seo & discoverability
- each product page needs proper meta titles, descriptions, and alt text on images
- a simple **blog or journal** section is a low-effort way to improve SEO and share the artist's process, exhibitions, or inspiration
- Google Analytics (or privacy-friendly alternative like [Plausible](https://plausible.io)) from day one

### email list
- newsletter signup in the footer or as a subtle banner
- used to notify subscribers about new works, exhibitions, and commission availability
- integrate with a free tier email tool like [Mailchimp](https://mailchimp.com) or [Brevo](https://brevo.com)

### mobile experience
- over 60% of e-commerce traffic is mobile — the site must be designed mobile-first
- RTL layout on mobile needs explicit testing (Hebrew + mobile is a specific combination to QA)

### legal pages
- **privacy policy** — required by Israeli law (Privacy Protection Law) and GDPR if any EU visitors
- **terms & conditions** for purchases and commissions
- **shipping policy** — delivery times, costs, international shipping options

---

## out of scope (for now)

- user accounts / login
- wishlist or favorites
- physical shipping integration (can be added later)
- english version (phase 2)
