# Deployment

The recommended free deployment is Cloudflare Pages connected directly to the
GitHub repository. The application is a static Vite site and does not require a
server or database.

## Cloudflare Pages settings

- Repository: `choeki/gbfr-relink-sim`
- Production branch: `main`
- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

After the first deployment, Cloudflare provides a free `*.pages.dev` URL. Every
push to `main` triggers a new production deployment, while pull requests receive
preview deployments.

## Static asset optimization

Vite emits fingerprinted JavaScript and CSS files under `dist/assets`. The
`public/_headers` file gives those immutable files a one-year browser cache while
keeping the HTML entry point revalidatable. Cloudflare Pages also serves static
assets through its distributed cache and negotiates Gzip/Brotli compression.

Security headers for clickjacking, MIME sniffing, referrer leakage, and unused
browser permissions are included in the same `_headers` file.
