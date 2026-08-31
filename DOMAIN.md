# Custom domain

GitHub Pages is the origin today: `https://ynsmroztas.github.io/`.

To move to `mitsec.dev` or `ynsmroztas.com`:

1. Buy the name.
2. Put the bare hostname in a `CNAME` file at the repo root (one line, no `https://`).
3. In the DNS host: `CNAME` `@` or `www` → `ynsmroztas.github.io`.
4. GitHub → repo → Settings → Pages → Custom domain → save, wait for HTTPS.
5. Optional: Cloudflare proxy for real CSP / HSTS headers. GitHub Pages cannot set those response headers itself.

Until then every page ships `rel=canonical` to the github.io URL and Open Graph tags for shares.
