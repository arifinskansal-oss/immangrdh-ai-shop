# immangRDH AI Shop — PayPal AI Hackathon prototype v1

**Status: SUBMITTED to Devpost on 28 Oct 2026 (Submission ID 1268332). Prototype v1, published to GitHub Pages, demo video published on YouTube. NO real payment made, sandbox only.**

- Public repository: https://github.com/arifinskansal-oss/immangrdh-ai-shop
- Live demo (GitHub Pages): https://arifinskansal-oss.github.io/immangrdh-ai-shop/
- Demo video (public YouTube, 1 minute 10 seconds): https://www.youtube.com/shorts/ktMEnmp-Vyc
- Devpost submission: https://devpost.com/software/immangrdh-ai-shop-describe-what-you-need

A single-page web shop (English, as the hackathon submission is in English).

A visitor describes a need in plain words, gets 1–3 recommended products
from ARIFIN / immangRDH's own catalog, and checks out with PayPal in
sandbox mode.

## How to run it

Open `index.html` in a browser with internet access (AG Grid and the
PayPal SDK load from CDNs). No build step, no server needed for v1.

For the full PayPal sandbox flow, a real sandbox client-id is required
(see below) — without it the checkout section honestly reports that it
cannot run.

## What works in v1 (verified)

- **Catalog: 17 real immangRDH products, no invented products.** All prices verified from ARIFIN's own files — `Katalog-Produk-Simple.txt` (16 Oct 2026) for the
  4 kids items and most of the catalog, the
  Shift Worker Focus Planner listing file (suggested price $9.99),
  and the Knight Cat Busy Book listing + Pinterest product list
  ($8.99, slug `knight-cat-busy-book`):
   4 income trackers ($14 each), 3 LUT packs ($14 each),
  Etsy Profit System ($19), Shift Worker Focus Planner ($9.99),
  Fit in 15 ($19.99), Wake Up Loose ($14.99), Strong in 4 Weeks
  ($24.99), My First Busy Book ($9.99), Toddler Worksheets Pack
  ($4.99), Cute Animals Coloring Book ($4.99),
  Christmas Cute Animals ($5.99), Knight Cat Busy Book ($8.99).

  No price was invented. One link is still imprecise on purpose:
  the Shift Worker Focus Planner link goes to the Gumroad store
  front, because its product slug was not verified in those files.

- **Rule-based recommender** (`recommender.js`, shared between the page
  and Node tests): keyword matching, 1–3 recommendations, one sentence
  of reasoning each. It is labelled on the page as rule-based, NOT a
  large language model. Tested with Node on 5 inputs:
  - “I work night shifts and want to track my irregular income”
    → Daily Income Tracker, Shift Worker Focus Planner, Fit in 15.
  - “I want to edit my food photos for Instagram”
    → Culinary & Food LUT Pack, Cinema & Film LUT Pack,
    Travel & Nature LUT Pack.
  - “I need printable activities for my toddler”
    → My First Busy Book, Toddler Worksheets Pack,
    Cute Animals Coloring Book.
  - “I want to sell digital products on Etsy” → Etsy Profit System.
  - Gibberish (“asdf qwerty zzz”) → honestly labelled “no strong
    match”, showing popular starters instead of pretending a match.
  - One real bug found and fixed during testing: reasons were blank
    for plurals (“shifts”, “photos”) because the reason function used
    exact-word matching while scoring used substring matching.
    Both now use substring matching; re-tested after the fix.

- **Layout guards for phone size:** viewport meta tag, `max-width: 960px`,
  `width: 100%` on the main column, input and AG Grid container.
  Static checks pass (see “What was NOT verified” for the limit).

## What is placeholder / does NOT work yet

- **PayPal sandbox checkout VERIFIED end-to-end on GitHub Pages
  (28 Oct 2026, 01:52 WITA, phone test by ARIFIN).** The JavaScript SDK
  is loaded in sandbox mode with ARIFIN's real sandbox client-id
  (installed 28 Oct, verified by PayPal's SDK endpoint returning 200;
  the client-id itself lives only in `index.html`, not in this README).
  Earlier hosts failed: a local file and a Muse-hosted https page both
  left the PayPal popup on about:blank (plus a blocked PayPal iframe
  message on the Muse page). On GitHub Pages
  (https://arifinskansal-oss.github.io/immangrdh-ai-shop/) the approval
  page loaded, a $14 sandbox order was approved with the sandbox test
  buyer account, and the shop page reported: "SANDBOX payment captured.
  Order ID: 5KA01509VC994951F. No real money moved." No real money
  moved — sandbox test money only. The demo video was recorded
  from this working flow.

- **No real PayPal credentials are used or stored anywhere in this
  folder.** None were available, and none were requested.

- **No LLM.** Upgrading the recommender to a real AI API needs an API
  key and a server-side call (keys must never ship in page JavaScript).
  That is a later step, not v1.

- **No order fulfilment.** After a real sandbox capture, v1 would still
  need download-link delivery — Gumroad already handles delivery for
  the real products, so the hackathon demo only needs to prove the
  recommendation + sandbox checkout flow.

## What was NOT verified (honest limit)

- **Live browser check (12 Nov 2026):** the page loads fully on GitHub
  Pages, the AG Grid catalog renders all 17 products, and the PayPal
  sandbox buttons render (PayPal, Pay Later, Debit or Credit Card) with
  no errors. Phone-width horizontal overflow is still unverified in a
  live browser.

- Kids-item prices and the Knight Cat Busy Book link/price are now
  verified from ARIFIN's own files (see catalog note above). A final
  check against the live Gumroad dashboard before submission is
  still wise, because catalog files can go stale — but no price in
  v1 is invented.

- The demo video (V5, 70 seconds, public on YouTube) was recorded from
  the working sandbox checkout flow and is the video linked from the
  Devpost submission.

## Submission status

- **Submitted to Devpost on 28 Oct 2026 — Submission ID 1268332.**
  Status: SUBMITTED TO PayPal AI Hackathon.
- Editable until the deadline: **13 Nov 2026, 04:00 WITA**
  (12 Nov 2026, 12:00 PST / 15:00 EST).
- After the deadline, do NOT change anything (no commits, README,
  video, or demo edits) until the winners are announced
  (Devpost email: 21 Dec 2026).

## Target prize paths

- **Best Demo Delivery ($5,000, 1 winner)** — the main realistic path:
  a simple, working shop plus a clear demo video.

- **Best Use of AG Grid** (1st $5,000, 2nd $2,000, 3rd $1,000 × 3) —
  the catalog/order table in v1 is built with AG Grid for this path.

- Overall 1st/2nd/3rd place is NOT the plan: 22,436 participants were
  registered on Devpost, and experienced teams dominate those slots.
  This prototype deliberately stays small, original and working
  instead of chasing a complex agent it cannot finish honestly.

## Files

- `index.html` — the shop page (catalog grid, checkout section).
- `recommender.js` — catalog + rule-based recommender (also Node-testable).
- `README.md` — this file.
- `SUBMISSION_DRAFT.md` — Devpost submission text
  (submitted 28 Oct 2026, Submission ID 1268332).
- `LICENSE` — MIT licence, ready for a public repository.
- `.gitignore` — blocks `.env`, secrets, keys, and credentials
  from ever being committed.

## Cost so far

$0 throughout. No payment made, no paid account created,
no password or API key used or requested. The only
remaining steps that need ARIFIN are also free: a PayPal Developer
account (sandbox is free) and a GitHub account/repository
(free public repo).
