---
title: Integrating 6 Payment Gateways
description: How we unified 6 providers under a single abstraction layer.
date: 2025-12-08
tag: "#payments"
readTime: "12 min"
---

Payments are the lifeblood of e-commerce. At Sharaf DG, we integrated 6 different payment gateways to serve customers across the Middle East — APS, Checkout.com, Tabby, Tamara, STC Pay, and Paymob.

## Why 6 Gateways?

No single payment provider covers all the needs of a multi-country e-commerce platform in the Middle East:

- **APS (Amazon Payment Services)** — Primary gateway for card payments in the UAE
- **Checkout.com** — International card processing with strong fraud tools
- **Tabby** — Buy Now, Pay Later for UAE and Saudi Arabia
- **Tamara** — BNPL focused on Saudi Arabia
- **STC Pay** — Mobile wallet popular in Saudi Arabia
- **Paymob** — Payment processing for Egypt

## The Abstraction Layer

Rather than scattering gateway-specific code throughout the application, we built a unified payment abstraction layer. Every gateway implements the same interface:

- `initiatePayment()` — Start a payment session
- `capturePayment()` — Capture an authorized payment
- `refundPayment()` — Process a refund
- `getPaymentStatus()` — Check transaction status

This means the checkout flow doesn't care which gateway is being used. The routing logic selects the appropriate gateway based on the customer's country, payment method, and order value.

## Fraud Detection

We integrated Sift Science for real-time fraud detection. Every transaction is scored before processing, and high-risk orders are flagged for manual review. This reduced chargebacks by 40% in the first quarter after implementation.

## Lessons Learned

1. **Build the abstraction first** — Don't integrate gateways directly into your checkout flow
2. **Handle webhooks carefully** — Each gateway has different webhook formats and retry policies
3. **Test with real cards** — Sandbox environments don't catch all edge cases
4. **Monitor everything** — Payment failures should trigger immediate alerts
5. **Plan for reconciliation** — You need to match gateway records with your order system daily
