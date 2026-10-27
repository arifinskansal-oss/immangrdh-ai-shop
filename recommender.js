// immangRDH AI Shop — v1 recommender.
// TRANSPARENT BY DESIGN: this is a keyword / rule-based matcher, NOT a
// large-language-model call. v1 ships with no AI API key and no LLM.
// It matches the user's plain words against the catalog's keywords and
// returns 1-3 products, each with a one-sentence reason.
(function (root) {
  var PRODUCTS = [
    { id: "tracker-duit", name: "Daily Income Tracker", category: "Income tracker", price: 14, priceLabel: "$14", url: "https://arifinspire6.gumroad.com/l/ozbavn", keywords: ["money", "income", "budget", "track", "tracker", "earning", "earnings", "irregular", "daily", "expense", "expenses", "finance", "salary", "cash", "save", "saving", "spreadsheet", "sheet"], blurb: "A phone-first spreadsheet to track irregular daily income and expenses." },
    { id: "tracker-warung", name: "Warung & Culinary Tracker", category: "Income tracker", price: 14, priceLabel: "$14", url: "https://arifinspire6.gumroad.com/l/huzukf", keywords: ["warung", "culinary", "food stall", "restaurant", "cafe", "food business", "shop", "small business", "jualan", "kuliner"], blurb: "A tracker made for small food businesses and warung sellers." },
    { id: "tracker-freelancer", name: "Freelancer Tracker", category: "Income tracker", price: 14, priceLabel: "$14", url: "https://arifinspire6.gumroad.com/l/cuzbkk", keywords: ["freelance", "freelancer", "client", "gig", "project", "invoice"], blurb: "A tracker for freelancers juggling clients, gigs and irregular pay." },
    { id: "tracker-kreator", name: "Creator Tracker", category: "Income tracker", price: 14, priceLabel: "$14", url: "https://arifinspire6.gumroad.com/l/glhlwo", keywords: ["creator", "content", "youtube", "tiktok", "influencer", "channel"], blurb: "A tracker for creators tracking content income in one place." },
    { id: "lut-kuliner", name: "Culinary & Food LUT Pack", category: "LUT pack", price: 14, priceLabel: "$14", url: "https://arifinspire6.gumroad.com/l/cafym", keywords: ["photo", "video", "edit", "editing", "lut", "color", "colour", "filter", "food photo", "food video", "instagram", "reel"], blurb: "20 phone LUTs that make food photos and videos look appetising." },
    { id: "lut-sinema", name: "Cinema & Film LUT Pack", category: "LUT pack", price: 14, priceLabel: "$14", url: "https://arifinspire6.gumroad.com/l/rptvgx", keywords: ["film", "cinema", "movie", "cinematic", "video", "edit", "lut", "color", "colour"], blurb: "20 phone LUTs for a cinematic film look on mobile video." },
    { id: "lut-travel", name: "Travel & Nature LUT Pack", category: "LUT pack", price: 14, priceLabel: "$14", url: "https://arifinspire6.gumroad.com/l/rrohva", keywords: ["travel", "nature", "outdoor", "landscape", "holiday", "vacation", "photo", "lut", "color", "colour"], blurb: "20 phone LUTs for travel and nature photos on the go." },
    { id: "etsy-profit", name: "Etsy Profit System", category: "Selling guide", price: 19, priceLabel: "$19", url: "https://arifinspire6.gumroad.com/l/etsy-profit-system", keywords: ["etsy", "sell online", "online shop", "ecommerce", "e-commerce", "selling", "store", "digital product", "passive"], blurb: "A system for selling digital products on Etsy, from setup to sales." },
    { id: "shift-focus", name: "Shift Worker Focus Planner", category: "Shift-worker planner", price: 9.99, priceLabel: "$9.99", url: "https://arifinspire6.gumroad.com", keywords: ["shift", "night shift", "focus", "planner", "tired", "fatigue", "schedule", "work", "roster", "sleep"], blurb: "A planner that helps shift workers stay focused around changing rosters." },
    { id: "fit-in-15", name: "Fit in 15", category: "Fitness", price: 19.99, priceLabel: "$19.99", url: "https://arifinspire6.gumroad.com/l/fit-in-15-shift-workers", keywords: ["fitness", "fit", "exercise", "workout", "shift", "busy", "short workout", "health"], blurb: "Short 15-minute workouts built for busy shift workers." },
    { id: "wake-up-loose", name: "Wake Up Loose", category: "Fitness", price: 14.99, priceLabel: "$14.99", url: "https://arifinspire6.gumroad.com/l/wake-up-loose", keywords: ["stretch", "stiff", "morning", "wake", "flexibility", "fitness", "sore"], blurb: "A gentle morning routine to loosen up a stiff body after sleep." },
    { id: "strong-4-weeks", name: "Strong in 4 Weeks", category: "Fitness", price: 24.99, priceLabel: "$24.99", url: "https://arifinspire6.gumroad.com/l/strong-in-4-weeks", keywords: ["strength", "strong", "muscle", "workout", "fitness", "training", "program"], blurb: "A 4-week strength program with a clear week-by-week plan." },
    { id: "busy-book", name: "My First Busy Book", category: "Kids busy book", price: 9.99, priceLabel: "$9.99", url: "https://arifinspire6.gumroad.com/l/my-first-busy-book", keywords: ["kid", "kids", "child", "children", "toddler", "busy book", "activity", "preschool", "kindergarten", "learning"], blurb: "A printable busy book of hands-on activities for young kids." },
    { id: "toddler-worksheets", name: "Toddler Worksheets Pack", category: "Kids worksheets", price: 4.99, priceLabel: "$4.99", url: "https://arifinspire6.gumroad.com/l/toddler-worksheets-pack", keywords: ["kid", "kids", "child", "children", "toddler", "worksheet", "worksheets", "preschool", "learning", "practice"], blurb: "Printable worksheets for toddlers learning through play." },
    { id: "cute-coloring", name: "Cute Animals Coloring Book", category: "Kids coloring", price: 4.99, priceLabel: "$4.99", url: "https://arifinspire6.gumroad.com/l/cute-animals-coloring-book", keywords: ["kid", "kids", "child", "children", "coloring", "colouring", "animals", "cute", "printable"], blurb: "A cute-animals coloring book kids can print and color at home." },
    { id: "christmas-animals", name: "Christmas Cute Animals", category: "Kids coloring", price: 5.99, priceLabel: "$5.99", url: "https://arifinspire6.gumroad.com/l/christmas-cute-animals", keywords: ["christmas", "kid", "kids", "coloring", "colouring", "animals", "holiday", "cute"], blurb: "Christmas-themed cute animal pages for holiday coloring time." },
    { id: "knight-cat-busy-book", name: "Knight Cat Busy Book", category: "Kids busy book", price: 8.99, priceLabel: "$8.99", url: "https://arifinspire6.gumroad.com/l/knight-cat-busy-book", keywords: ["kid", "kids", "child", "children", "toddler", "knight", "knight cat", "kiki", "busy book", "wipe", "clean", "activity", "preschool", "laminate"], blurb: "A 42-page wipe-clean activity pack guided by Kiki the knight cat: trace, count, match, then wipe and play again." }
  ];

  function normalize(text) {
    return (text || "").toLowerCase();
  }

  // Score a product by how many of its keywords appear in the user's words.
  function recommend(text, limit) {
    var input = normalize(text);
    var scored = PRODUCTS.map(function (p) {
      var score = 0;
      p.keywords.forEach(function (k) {
        if (input.indexOf(k) !== -1) score += 1;
      });
      return { product: p, score: score };
    }).filter(function (s) { return s.score > 0; });
    scored.sort(function (a, b) { return b.score - a.score; });
    var picked = scored.slice(0, limit || 3).map(function (s) { return s.product; });
    var matched = picked.length > 0;
    if (!matched) {
      // Honest fallback: no keyword match, so say so and show popular starters.
      picked = [PRODUCTS[0], PRODUCTS[7], PRODUCTS[8]];
    }
    return { matched: matched, products: picked };
  }

  function reasonFor(product, input) {
    // Same substring matching as the scorer, so plurals like "shifts" or
    // "photos" still produce a reason instead of a bare blurb.
    var text = normalize(input);
    var hit = product.keywords.filter(function (k) { return text.indexOf(k) !== -1; })[0];
    if (hit) return "It matches your word \u201C" + hit + "\u201D: " + product.blurb;
    return product.blurb;
  }

  var api = { PRODUCTS: PRODUCTS, recommend: recommend, reasonFor: reasonFor };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.ImmangRecommender = api;
})(typeof window !== "undefined" ? window : globalThis);
