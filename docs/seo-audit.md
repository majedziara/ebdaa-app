# SEO, performance and accessibility verification

Checked on 2026-10-10 against the local production build at http://localhost:3101.
Canonical URLs, language alternates, sitemap and sharing metadata use the public
origin https://ebdaa-one.vercel.app. These changes are prepared in the repository;
the public deployment must be updated before Search Console verification.

## Final Lighthouse results

Lighthouse 13.5, Google Chrome, production build. Mobile uses Lighthouse's default
simulated mobile throttling; desktop uses a 1350 × 940 viewport and desktop
throttling. Scores vary with machine load, network conditions and deployment.
The public-site baseline and local results use different serving environments,
so they should not be treated as a controlled performance comparison.

| Mode | Route | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| mobile | /ar | 57 | 100 | 100 | 100 | 4.2 s | 2,850 ms | 0.014 |
| mobile | /en | 66 | 100 | 100 | 100 | 3.4 s | 1,380 ms | 0 |
| desktop | /ar | 86 | 100 | 100 | 100 | 1.1 s | 260 ms | 0 |
| desktop | /en | 95 | 100 | 100 | 100 | 1.0 s | 160 ms | 0 |

Mobile performance remains below the desktop results. JavaScript execution,
Google Analytics and page rendering remain material costs in the mobile traces.
The scores above are the measured results, rather than a claim of 100 performance.

## Verified behavior

- Production build and TypeScript checks pass; ESLint passes without warnings.
- Both language pages are prerendered at build time.
- Axe found zero violations at 390 and 1440 pixels in both languages, after
  animations settled and contact validation errors were displayed.
- No browser JavaScript errors, broken loaded images or horizontal page overflow
  were detected at those widths.
- One H1, valid document language/direction, unique IDs, localized metadata,
  Google verification, canonical URLs and JSON-LD were checked.
- The keyboard skip link focuses the main content. The mobile menu exposes its
  state, closes on Escape and closes after a navigation link is selected.
- Contact and newsletter validation, request payloads, success/reset behavior and
  failure/retained-input behavior passed using mocked API responses. No form test
  records were submitted to Supabase.
- Analytics configuration queues the supplied measurement ID once per page load.
- Robots, sitemap, manifest, Google verification file, Open Graph PNGs and icons
  return 200 with the expected MIME types. Invalid routes return 404.
- Reveal duration (0.8s), hero delays (0.5s / 0.7s / 1s), easing
  (cubic-bezier(0.22, 1, 0.36, 1)), exit delay and repeated entrance were checked.
- The services track still moves in opposite directions for Arabic and English.
- Hero text becomes visible even with external hydration JavaScript blocked.

## Changes that affect loading

The three largest source images were reduced from 5,718,920 bytes to 344,436
bytes, approximately 94% less data. Their content and aspect ratios are retained.
Responsive image sizes, lazy loading below the fold, high-priority hero loading
and correct logo dimensions reduce unnecessary downloads and layout shifts.
Unused template SVGs were removed after checking references: file.svg, globe.svg,
next.svg, vercel.svg and window.svg. All 19 dynamically referenced client logos
were retained.

Reveal effects use browser CSS transitions and one shared viewport observer;
initial hero effects can start before hydration. The original loader now covers
the content and footer together, avoiding the footer appearing before the main
content streams in. Other motion effects retain their existing behavior.
Form validation uses the smaller Zod Mini API directly with the same validation
rules and translated errors. Only the used Zain weights are preloaded, and the
Google tag loads during browser idle time.

## SEO and deployment

Titles, descriptions and keywords are localized. Open Graph and Twitter cards
use branded 1200 × 630 PNGs; favicon, Apple and manifest icons use the Ebdaa logo.
Organization, WebSite and WebPage JSON-LD use the contact information shown on the
website. Language alternates are supplied by metadata and the sitemap, avoiding
an additional host-derived Link header on localhost or preview deployments.

After deploying:

1. Verify the URL-prefix property https://ebdaa-one.vercel.app/ in Search Console.
   The original /googledb9beca33381b118.html and the supplied verification meta tag
   are both included.
2. Submit https://ebdaa-one.vercel.app/sitemap.xml.
3. Request indexing of /ar and /en through URL Inspection.
4. Check Analytics Realtime for G-XYQLS2TJ5M.

For a future domain change, update NEXT_PUBLIC_SITE_URL and rebuild. The legacy
localhost NEXT_PUBLIC_BASE_URL value is intentionally not used for SEO.

Google ignores meta keywords, and a sitemap does not guarantee indexing or
ranking. See [Google's supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags)
and [Google's indexing FAQ](https://developers.google.com/search/help/crawling-index-faq).
Manual alternate links follow the documented [next-intl configuration](https://next-intl.dev/docs/routing/configuration#alternatelinks-hreflang).
