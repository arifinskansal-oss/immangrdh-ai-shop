# immangRDH AI Shop — PayPal AI Hackathon prototype v1

**Status: prototype v1, published to GitHub Pages, demo video published on YouTube. NOT submitted to Devpost yet, NO real payment made, sandbox only.**

- Public repository: https://github.com/arifinskansal-oss/immangrdh-ai-shop
- Live demo (GitHub Pages): https://arifinskansal-oss.github.io/immangrdh-ai-shop/
- Demo video (public YouTube, 1 minute 11 seconds): https://www.youtube.com/shorts/yZG8F_19gU8

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

- **Catalog: 17 real immangRDH products, no invented products.**
  All prices verified from ARIFIN's own files — `Katalog-Produk-Simple.txt`
  (16 Oct 2026) for the 4 kids items and most of the catalog, the
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
  moved — sandbox test money only. The demo video can now be recorded
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

- **No real browser render was possible in this environment:** no
  Chromium/Chrome binary is installed on this VM, so the page was
  NOT screenshot-tested on desktop or phone. The AG Grid table
  rendering and the PayPal SDK's exact placeholder behaviour are
  therefore **unverified in a live browser** — the code follows the
  AG Grid v31 `createGrid` API and the documented PayPal Buttons
  flow, and includes fallback text if either CDN fails to load, but
  ARIFIN (or the parent agent, in a browser) must open `index.html`
  and confirm: (1) the grid renders, (2) the recommender works by
  typing, (3) no horizontal overflow on a phone-width window,
  (4) the PayPal section shows the “client-id needed” state.
- Kids-item prices and the Knight Cat Busy Book link/price are now
  verified from ARIFIN's own files (see catalog note above). A final
  check against the live Gumroad dashboard before submission is
  still wise, because catalog files can go stale — but no price in
  v1 is invented.
- The demo video script and the Devpost submission draft are
  written (`DEMO_VIDEO_SCRIPT.md`, `SUBMISSION_DRAFT.md`), but the
  video itself is NOT recorded yet — it must wait for a working
  sandbox checkout, or it would be a fake demo.

## Still needed before submission

1. **From ARIFIN (free, his login only):** create a PayPal Developer
   account at developer.paypal.com, then a sandbox app, and give
   the sandbox client-id (never the secret). Replace
   `SANDBOX_CLIENT_ID_PLACEHOLDER` in `index.html` only.
2. Test a full sandbox checkout end-to-end with PayPal sandbox test
   buyer/seller accounts (no real money).
3. Decide on the recommender upgrade: keep the honest rule-based
   version, or add a real AI API call server-side.
4. Record the demo video (< 3 minutes, public YouTube, shows the
   app working, no copyrighted music) from `DEMO_VIDEO_SCRIPT.md`
   — this is the Best Demo Delivery play.
5. **From ARIFIN (free, his login only):** publish this folder as a
   public repository (GitHub). The folder is already publish-ready:
   MIT `LICENSE`, `.gitignore` that blocks secrets, and this README.
   Nothing has been pushed — pushing needs his GitHub login.
6. Submit via Devpost before **13 Nov 2026, 04:00 WITA**, using
   `SUBMISSION_DRAFT.md`.
   (Registration is already done; nothing has been submitted.)

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
- `DEMO_VIDEO_SCRIPT.md` — script + shot list for the < 3-minute
  demo video (script only; video not recorded yet).
- `SUBMISSION_DRAFT.md` — Devpost submission text (draft only;
  nothing submitted).
- `LICENSE` — MIT licence, ready for a public repository.
- `.gitignore` — blocks `.env`, secrets, keys, and credentials
  from ever being committed.

## Cost so far

$0 throughout. No payment made, no paid account created, nothing
submitted, no password or API key used or requested. The only
remaining steps that need ARIFIN are also free: a PayPal Developer
account (sandbox is free) and a GitHub account/repository
(free public repo).
