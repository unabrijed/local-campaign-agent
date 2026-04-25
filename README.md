# LocalBoard

![LocalBoard logo](public/logo.svg)

LocalBoard is an AI campaign planning agent and local placement network for Bengaluru. It turns any business website into a launch-ready street campaign with hotspot selection, billboard and local placement recommendations, QR landing pages, vendor outreach, launch tracking, and proof collection.

**Tagline:** Website in. Bangalore campaign out.

## Startup Snapshot

LocalBoard helps local businesses launch offline campaigns with the speed, structure, and measurability of digital ads. A founder, clinic, cafe, studio, salon, coaching center, or popup brand can paste a website and get a campaign board built for the right local areas, hotspots, and billboard placements.

LocalBoard also supports the supply side: billboard owners, hoarding operators, cafes, coworking spaces, salons, gyms, apartment managers, and venue partners can list high-attention spaces so advertisers can be matched by area, congestion, crowd type, and brand fit.

The product starts with Bengaluru because local attention is neighborhood driven. Indiranagar, Koramangala, HSR Layout, Whitefield, MG Road, Jayanagar, JP Nagar, Domlur, and Bellandur each have different audiences, movement patterns, and placement opportunities.

## Problem

Local businesses know they need visibility, but local advertising is still manual and fragmented.

- Businesses do not know which area to target.
- Creatives, QR pages, and WhatsApp copy take time to produce.
- Billboard owners, cafe owners, apartment managers, gyms, salons, and coworking spaces are hard to coordinate.
- Offline campaigns are difficult to measure.
- Small teams do not have media buyers or launch operators.

## Solution

LocalBoard acts like a local campaign operator. It reads the business website, understands the offer and audience, maps the best Bengaluru areas and hotspots, recommends billboards and local placements, generates campaign creatives, prepares outreach, and organizes the launch in one board.

## Product Flow

1. Paste a business website.
2. Website Scout Agent extracts the category, audience, pricing signals, offers, location, and CTA.
3. Area Intelligence Agent recommends Bengaluru neighborhoods, hotspots, congestion corridors, and micro-zones.
4. Placement Match Agent selects local ad placements like billboards, hoardings, cafes, salons, apartments, gyms, and coworking spaces.
5. Campaign Strategy Agent creates the campaign angle.
6. Campaign Creative Agent writes posters, table cards, WhatsApp copy, QR CTAs, and landing page copy.
7. Vendor Outreach Agent prepares partner outreach drafts.
8. Launch Ops Agent builds a campaign board with budget, proof checklist, status, and tracking.

## Demo Campaign

The demo uses **Shoonya Store**, a custom merch brand launching a local Bangalore drop from Indiranagar.

- Campaign name: Wear Your Scene
- Goal: Popup visits and WhatsApp orders
- Audience: Creators, college groups, startup teams, and streetwear buyers near Indiranagar, Koramangala, and MG Road + Church Street
- Offer: Scan to preview the limited Bangalore drop and reserve custom merch on WhatsApp
- Starter budget: INR 15,000
- Placements: Road-facing billboards, cafe table cards, boutique counter cards, event flyers
- Tracking: QR scans, WhatsApp leads, proof uploads, campaign status

## Target Customers

- Fitness studios
- Clinics
- Cafes and restaurants
- Salons and spas
- Coaching centers
- D2C popups
- Local retail and service businesses
- Billboard owners and venue partners that want to monetize attention

## Brand Identity

LocalBoard should feel warm, local, premium, and operational. The brand is simple, calm, and practical. It avoids loud ad-tech styling and uses a clean board and signal-dot mark to represent local placement, area intelligence, and campaign readiness.

### Logo

![LocalBoard mark](public/logo-mark.svg)

The logo combines:

- A rounded board tile for planning, structure, and campaign boards.
- An offset terracotta dot for local signal, street-level discovery, and QR-driven action.
- A lowercase wordmark for friendliness and speed.

Logo assets:

- Full logo: `public/logo.svg`
- Mark: `public/logo-mark.svg`
- Favicon: `public/favicon.svg`
- Social preview: `public/og-image.svg`

## Color System

The visual system is warm and premium, with terracotta as the primary action color and a cool map blue as a secondary signal for area intelligence.

| Role | Token | Value | Usage |
| --- | --- | --- | --- |
| Warm canvas | `--background` | `hsl(36 38% 97%)` | Page background |
| Foreground ink | `--foreground` | `hsl(24 14% 14%)` | Text and logo tile |
| Primary terracotta | `--primary` | `hsl(18 75% 52%)` | CTA, dot, active states |
| Primary glow | `--primary-glow` | `hsl(22 90% 62%)` | Highlights |
| Soft sand | `--secondary` | `hsl(36 30% 92%)` | Pills and soft sections |
| Warm honey | `--accent` | `hsl(38 80% 56%)` | Supporting emphasis |
| Map blue | `--map` | `hsl(196 70% 48%)` | Map and city intelligence accents |
| Surface warm | `--surface-warm` | `hsl(32 40% 95%)` | Warm content blocks |
| Border | `--border` | `hsl(30 18% 88%)` | Cards and layout lines |

Logo hex colors:

- Warm canvas: `#F7F1E8`
- Ink: `#2A231F`
- Terracotta: `#DE5B2A`

## Typography

- Display: Space Grotesk
- Body: Inter
- Tone: concise, confident, warm, and startup-ready

## Key Differentiation

LocalBoard is not only a billboard marketplace. It is an AI agent that builds the campaign, recommends hotspots and board inventory, and prepares the operational workflow.

- Area selection is AI-recommended for Bengaluru neighborhoods.
- Placements are local and practical: billboards, hoardings, cafes, salons, gyms, apartments, coworking spaces, and events.
- Billboard and placement owners can list inventory with area, landmark, audience, visibility, weekly price, and proof details.
- Creatives are generated from the business website.
- Vendor outreach is prepared for review.
- Tracking is built around QR scans, WhatsApp leads, coupons, landing pages, and proof uploads.

## Presentation Slide Outline

Use this README to build a short pitch deck:

1. Title: LocalBoard, Website in. Bangalore campaign out.
2. Problem: Local offline marketing is fragmented and hard to measure.
3. Insight: Local attention moves by neighborhood, not only by keyword.
4. Solution: AI agent that creates a complete Bengaluru street campaign.
5. Product flow: Website to hotspot plan to billboard match to creatives to vendor outreach to launch board.
6. Demo: Shoonya Store, Wear Your Scene campaign.
7. Market: Local businesses, service brands, billboard owners, and venue partners.
8. Differentiation: Campaign operator plus hotspot intelligence, not just static ad inventory.
9. Brand: Warm premium identity with board and signal-dot mark.
10. Next steps: Real vendor network, live QR pages, payments, campaign analytics.

## Tech Stack

- Vite
- React
- TypeScript
- React Router
- Tailwind CSS
- shadcn-style UI components
- Supabase integration scaffolding

## Live Agent Setup

The frontend can run in two modes:

1. **Demo fallback mode:** Uses static Shoonya Store campaign data from `src/data/localboardDemo.ts`.
2. **Live extraction mode:** Calls the Supabase Edge Function at `supabase/functions/analyze-website/index.ts`.

The live function is the current backend agent endpoint. It receives a website URL, fetches the site server-side, extracts title/meta/page text, and returns a campaign-ready JSON response with business context, hotspots, billboard recommendations, creatives, and outreach drafts. If an OpenAI key is configured, it uses the LLM agent path. If no OpenAI key is configured, it falls back to heuristic extraction.

Frontend flow:

```text
Homepage URL input
-> /agent-run?url=...
-> POST /functions/v1/analyze-website
-> stores latest result in sessionStorage
-> /campaign/shoonya-store renders the live result
```

If the function is not deployed or fails, the UI still works using the demo fallback campaign.

## Environment Variables

Create or update `.env` in the project root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_or_publishable_key
VITE_SUPABASE_ANON_KEY=your_legacy_supabase_anon_jwt
```

These values are safe to expose to the browser because they are Vite public variables. Do **not** put private service role keys or LLM keys in `VITE_*` variables.

If the Supabase Edge Function has **Verify JWT with legacy secret** enabled, `VITE_SUPABASE_ANON_KEY` must be the legacy Supabase anon JWT. The newer `sb_publishable_...` key can initialize the Supabase browser client, but it does not satisfy legacy JWT verification.

Set the LLM variables as Supabase Edge Function secrets:

```bash
supabase secrets set OPENAI_API_KEY=your_openai_api_key
supabase secrets set OPENAI_MODEL=gpt-4o-mini
```

`OPENAI_MODEL` is optional. If omitted, the function defaults to `gpt-4o-mini`.

Required values:

| Variable | Where to set | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | `.env` | Supabase project URL used by the browser client |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `.env` | Supabase anon/publishable key used by the browser client |
| `VITE_SUPABASE_ANON_KEY` | `.env` | Legacy anon JWT used in the Edge Function `Authorization` header when JWT verification is enabled |
| `OPENAI_API_KEY` | Supabase secret | Private LLM key used only inside the Edge Function |
| `OPENAI_MODEL` | Supabase secret | Optional model override for campaign analysis |

## Supabase Deployment

The real website-fetching agent requires the Edge Function to be deployed:

```bash
supabase login
supabase link --project-ref your-project-ref
supabase functions deploy analyze-website
```

After deployment, run the app locally:

```bash
yarn dev
```

Then test the flow:

1. Open `/`.
2. Paste a real business website URL.
3. Click **Run the LocalBoard Agent**.
4. Wait for `/agent-run` to finish extraction.
5. Open the generated campaign board.

Notes:

- The browser never fetches third-party websites directly. The Edge Function does it to avoid CORS issues.
- Billboard inventory, QR analytics, and proof uploads are still mocked for the hackathon MVP.
- Vendor outreach is draft-only. The app does not auto-send messages.

## Local Development

```bash
yarn install
yarn dev
```

Useful commands:

```bash
yarn build
yarn lint
```

Main routes:

- `/`
- `/agent-run`
- `/campaign/shoonya-store`

## Indexing Assets

- `public/sitemap.xml`
- `public/robots.txt`
- `public/llms.txt`
- SEO metadata in `index.html`

Current placeholder domain for indexing assets: `https://local-campaign-agent.vercel.app/`
