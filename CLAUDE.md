@AGENTS.md

# Tint Crew Web — Project Context

## What is this?
Window tinting shop website for **Tint Crew** in Buena Park, CA (Orange County).
Replacing the old WordPress site at www.tintcrew.com.
Family-owned since 1985. Authorized Llumar, Vista & Rayno dealer.

## Tech Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Prisma 5 + SQLite (bookings database)
- Framer Motion (animations)
- React Hook Form + Zod (validation)

## Business Info
- **Shop**: Tint Crew
- **Address**: 6905 Oslo Circle, Ste i, Buena Park, CA 90621
- **Phone**: (714) 521-5633
- **Email**: tintcrew@gmail.com
- **Brands**: Llumar (CTX, IRX, Valor PPF), Vista (architectural), Rayno (MonoCarbon, Phantom S5)
- **Colors**: Red (#DC2626), Black (#0A0A0A), White — Llumar-inspired, red as 10% accent only

## What's Built (25+ routes, all passing build)

### Pages
- `/` — Home (video hero, services, why us, testimonials, CTA, contact)
- `/quote` — 3-step interactive wizard (Year→Make→Model → 4 film prices → booking)
- `/visualizer/auto` — Tint VLT% slider with SVG car
- `/services/*` — 5 service pages (auto, PPF, residential, commercial, Tesla)
- `/gallery` — 12 stock image grid with hover labels
- `/about` — Hero image + story + brand info
- `/faq` — 10 Q&A with hero image
- `/blog` — 3 posts with thumbnails
- `/contact` — Contact form + info cards + storefront image
- `/privacy-policy`
- `/admin` — Dashboard (stats), bookings (CRUD), customers, pricing editor

### API Routes
- `/api/vehicles/years|makes|models` — Pricing data lookups
- `/api/pricing` — Package prices for specific vehicle
- `/api/bookings` — POST create / GET list
- `/api/contact` — POST contact form
- `/api/admin/bookings` — GET/PATCH manage bookings
- `/api/admin/stats` — Dashboard statistics

### Data
- `src/data/pricing.json` — 1,404 vehicles, 43 makes, real prices from Excel
- `prisma/schema.prisma` — Booking, ContactSubmission, Quote models
- `src/constants/site.ts` — All business info
- `src/constants/services.ts` — Service definitions + film specs

## What's NOT Built Yet (from plan)
- [ ] Twilio SMS automation (need API key)
- [ ] Resend email notifications (need API key)
- [ ] Google Calendar sync (need OAuth credentials)
- [ ] Stripe card-on-file Phase B (need API key)
- [ ] Architectural/decorative film visualizers
- [ ] Admin password protection (middleware)
- [ ] Blog individual post pages (`/blog/[slug]`)
- [ ] Real photos/video (currently stock images from Unsplash)
- [ ] Logo (need file from owner)
- [ ] Google Maps embed (need embed URL)
- [ ] 301 redirects from old WordPress URLs
- [ ] Light theme option (dark is default, light CSS vars exist)

## Key Files
- `src/lib/pricing.ts` — Vehicle lookup: year → makes → models → prices
- `src/components/quote/QuoteWizard.tsx` — 3-step quote orchestrator
- `src/components/visualizer/TintVisualizer.tsx` — VLT% slider
- `src/app/admin/` — Admin dashboard pages
- `.claude/plans/imperative-launching-bee.md` — Full project plan

## Design Reference
- Benchmark sites: signaturetint.com, americanwindowfilm.com
- RPM System (rpmsystem.io) for communication automation
- Llumar.com for brand aesthetic
- Current site: tintcrew.com (being replaced)

## Commands
```bash
npm run dev          # Dev server at localhost:3000
npm run build        # Production build
npm run start        # Production server
npx prisma studio    # Database GUI
npx prisma migrate dev --name <name>  # New migration
```
