---
title: "Chaining Email Enumeration to Full Database Dump"
date: 2026-03-15
tags: ["SSRF", "Brute Force", "Data Exposure"]
excerpt: "How I combined email enumeration, credential brute force, and SSRF into a chain that led to a complete database dump of 7,000+ records."
---

# Chaining Email Enumeration to Full Database Dump

> **TL;DR** — A series of low-severity vulnerabilities chained together to achieve full database extraction.

## The Chain

1. **Email Enumeration** — Differential error messages revealed valid email addresses
2. **Credential Brute Force** — No rate limiting on the login endpoint
3. **SSRF** — The `/test?url=` endpoint followed arbitrary URLs
4. **Database Dump** — Accessible endpoint returned 7,000+ records

*Responsible disclosure — details redacted per program policy.*
