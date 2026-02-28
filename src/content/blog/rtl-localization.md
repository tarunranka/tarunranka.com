---
title: RTL Localization for Arabic E-Commerce
description: The challenges and solutions for building bidirectional interfaces.
date: 2025-11-20
tag: "#frontend"
readTime: "6 min"
---

When we launched Sharaf DG in Saudi Arabia, full Arabic RTL support was a non-negotiable requirement. Building a bidirectional interface taught us lessons that go far beyond flipping `direction: rtl`.

## Beyond CSS Direction

The obvious part of RTL is mirroring the layout — navigation moves to the right, text aligns right, and scrolling feels natural for Arabic readers. But the real challenges are more subtle:

- **Icons with directionality** — Arrows, chevrons, and progress indicators need to be mirrored
- **Numbers remain LTR** — Phone numbers, prices, and dates stay left-to-right even in RTL context
- **Mixed content** — English product names within Arabic sentences create bidirectional text runs
- **Form validation** — Error messages need to appear on the correct side of inputs
- **Animations** — Slide-in transitions need to come from the opposite direction

## Our Approach

We used CSS logical properties throughout the codebase:

- `margin-inline-start` instead of `margin-left`
- `padding-inline-end` instead of `padding-right`
- `inset-inline-start` instead of `left`

This means a single stylesheet works for both LTR and RTL — the browser handles the mirroring automatically based on the `dir` attribute on the HTML element.

## Testing RTL

We added RTL-specific Playwright tests that verify:

- Layout mirroring is correct on key pages
- Checkout flow works end-to-end in Arabic
- Payment forms handle Arabic input correctly
- Email notifications render properly in Arabic

## Key Takeaways

1. **Use logical properties from the start** — Retrofitting is painful
2. **Don't just mirror — adapt** — Some elements shouldn't be flipped
3. **Test with native speakers** — Machine translation misses cultural nuances
4. **RTL is more than CSS** — It affects UX patterns, reading flow, and user expectations
