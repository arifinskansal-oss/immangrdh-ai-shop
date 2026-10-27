# Devpost submission draft — READY TO SUBMIT (user approved 28 Oct 2026, "gas")

**Status: all four preconditions are now met — (1) real sandbox
client-id in index.html, (2) full sandbox checkouts captured
end to end (Order IDs 5KA01509VC994951F for $14,
3K2228961H983524W and 21823754RY606402R for $19.99),
(3) demo video recorded from the working app and published on
YouTube, (4) folder published as a public GitHub repository
with GitHub Pages demo.**

- Public repository URL: https://github.com/arifinskansal-oss/immangrdh-ai-shop
- Live demo URL: https://arifinskansal-oss.github.io/immangrdh-ai-shop/
- Demo video URL (public YouTube, 1 minute 11 seconds): https://www.youtube.com/shorts/yZG8F_19gU8

## Title
immangRDH AI Shop — Describe what you need, get a real product, pay with PayPal (sandbox)

## Tagline (one line)
A small shop where you describe a need in plain words, get a
recommended digital product from immangRDH's own catalog, and check
out with PayPal in sandbox mode.

## Description
immangRDH is a solo digital-products shop run by a rotating shift
worker in Samarinda, Indonesia. Its catalog — income trackers, LUT
packs, planners, fitness guides, and kids' activity books — is real,
but a visitor who does not know the product names has no easy way
to find the right one.

immangRDH AI Shop fixes that one step. The visitor types a need in
plain words ("I work night shifts and want to track my irregular
income"). The shop recommends 1–3 products from the real catalog,
each with a one-sentence reason naming the word it matched, shows
the full catalog in a sortable table, and lets the visitor check out
the selected product with PayPal in sandbox mode. No real money
moves in the demo.

This is a solo, beginner entry. It is deliberately small: one page,
one real catalog, one checkout flow — built to actually work rather
than to look impressive in slides.

## How PayPal is used
- PayPal JavaScript SDK, sandbox mode, USD.
- The buyer selects a product, the app creates a PayPal order for
  that product and amount, the buyer approves it in the PayPal
  sandbox window, and the app captures the order and shows the
  result.
- Sandbox only. No real payments are made in the demo, and no
  PayPal secret is stored in the code or the repository.

## How AI is used — stated honestly
- **Version 1 recommender is rule-based, not a large language model.**
  It matches the visitor's plain words against catalog keywords and
  returns 1–3 products with a reason sentence each. If nothing
  matches, it says so plainly ("No strong keyword match found") and
  shows popular starters instead of pretending a match.
- This honesty is intentional: the v1 goal is a working
  recommendation + checkout flow, not a fake AI claim. A future
  version may add a real AI API call server-side (keys must never
  ship in page JavaScript), and if that happens this section will be
  updated before submission to describe exactly what changed.

## How AG Grid is used
- The full product catalog is rendered as an AG Grid table
  (ag-grid-community v31, Quartz theme): product, category, price,
  and Gumroad link columns. Clicking a row selects that product for
  checkout. This is the entry's Best Use of AG Grid path.

## Setup / run instructions (for judges)
1. Clone the public repository.
2. Open `index.html` in a browser with internet access
   (AG Grid and the PayPal SDK load from CDNs). No build step,
   no server needed for v1.
3. Type a need, for example: "I work night shifts and want to
   track my irregular income". Press "Recommend products".
4. Click a product row in the AG Grid table to select it.
5. For the checkout: a PayPal Developer sandbox client-id is
   required in `index.html` (replace the placeholder), plus PayPal
   sandbox test buyer/seller accounts. Follow the four steps in
   the checkout section of the page. No real money is involved.

## What is still a limit in v1 (honest limits)
- PayPal checkout runs only with a real sandbox client-id, which
  is not yet in the code (placeholder only). Until it is added,
  the checkout section honestly reports that it cannot run.
- The recommender is rule-based, not an LLM (see above).
- The Shift Worker Focus Planner link goes to the Gumroad store
  front; its product slug was not verified in ARIFIN's own files,
  so no slug was invented.
- All other prices were verified from ARIFIN's own catalog and
  listing files (see README.md); no price was invented.
- The page has not yet been screenshot-tested in a live browser
  on this VM (no Chromium/Chrome binary); judges' browser testing
  is the final visual check.

## Prize paths targeted
- Best Demo Delivery: a simple working shop plus a clear
  under-3-minute demo video showing the real flow.
- Best Use of AG Grid: the catalog/order table.

## Links to fill in at submission time (leave blank until then)
- Public repository URL: (to be added after publishing)
- Demo video URL (public YouTube, under 3 minutes): (to be added after recording)
- Live demo URL, if hosted: (optional; a buildable repo also satisfies the rules)
