# 🌯 Wrap & Roll — Next.js App Router

Restaurant website for **Wrap & Roll**, Karim Park, Lahore.
Built with **Next.js 15 App Router**, Tailwind CSS v4, and Zustand.

---

## ✅ Features
- 🏠 Home page: Hero + **Deals of the Day** + Category highlights + Reviews + CTA
- 📋 Full menu with all 11 categories
- 🛒 Persistent Shopping Cart (survives refresh — localStorage via Zustand)
- 📐 Size picker for multi-size items (S / M / L / XL)
- 💬 WhatsApp checkout — formatted order message sent directly
- 🔔 Cart badge in header with live count
- 📱 **Fully mobile responsive** — hamburger nav, bottom-sheet size picker, responsive grids
- 📲 Cross-platform PWA install popup + ready-to-scan QR code in `public/qr/`

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

The project includes an `.npmrc` that uses the public npm registry, so it can
be installed locally on macOS, Windows, or Linux without Replit's internal
package URLs.

---

## ✏️ How to Edit Content (JSON only — no code needed!)

All content lives in the `data/` folder. Just edit the JSON files:

| File | What to edit |
|------|-------------|
| `data/site.json` | Site name, tagline, hero text, phone, address, hours, highlights |
| `data/deals.json` | Deals of the Day cards on home page + menu |
| `data/menu.json` | All menu categories and items (name, price, description, image) |
| `data/reviews.json` | Customer reviews (name, rating, text, date) |

### Change WhatsApp Number
Open `data/site.json` and update:
```json
"whatsappNumber": "923000500811"
```
Format: country code + number, no + or spaces (e.g. `923001234567`)

### Add a New Menu Item
Open `data/menu.json`, find the category, add to its `items` array:
```json
{ "name": "My New Item", "price": "Rs. 500", "desc": "Description here.", "image": "/images/pizza.jpg" }
```
For multi-size pricing use: `"S 450 / M 850 / L 1400 / XL 1800"`

### Add a New Deal
Open `data/deals.json` and add:
```json
{
  "id": "deal-6",
  "title": "Deal 6",
  "price": "Rs. 1200",
  "description": "What's included",
  "badge": "New",
  "popular": false
}
```

---

## 📁 Project Structure

```
wrap-n-roll/
├── app/
│   ├── globals.css          # Design system tokens + Tailwind v4
│   ├── layout.tsx           # Root layout (fonts, metadata)
│   ├── page.tsx             # Home page (Hero → Deals of Day → Highlights → Reviews → CTA)
│   ├── menu/page.tsx        # Full menu with Add to Cart
│   └── cart/page.tsx        # Cart with WhatsApp checkout
├── components/
│   ├── Nav.tsx              # Sticky header + mobile hamburger + cart badge
│   ├── Footer.tsx
│   ├── FloatingWhatsApp.tsx
│   ├── AddToCartButton.tsx  # Single price / size picker sheet
│   └── WhatsAppIcon.tsx
├── data/                    ← ✏️ EDIT THESE JSON FILES FOR CONTENT
│   ├── site.json
│   ├── deals.json
│   ├── menu.json
│   └── reviews.json
├── lib/
│   ├── utils.ts
│   ├── whatsapp.ts          # Reads WhatsApp number from site.json
│   └── priceUtils.ts        # Parses "S 450 / M 850 / L 1400" strings
├── public/images/           # Food photos (replace to update images)
├── store/cart.ts            # Zustand cart with localStorage persistence
├── next.config.ts
├── postcss.config.mjs       # Tailwind v4 via @tailwindcss/postcss
└── tsconfig.json
```

---

## 🏗️ Build for Production

```bash
npm run build
npm run start
```

### Static Export (no server needed)
Uncomment `output: "export"` in `next.config.ts`, then:
```bash
npm run build
# static files are in /out — deploy anywhere
```

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 15 | App Router framework |
| React | 19 | UI |
| Tailwind CSS | v4 | Styling |
| Zustand | 5 | Cart state + localStorage |
| Lucide React | latest | Icons |
| TypeScript | 5 | Type safety |

## 📍 Delivery Radius

Every WhatsApp order entry point first asks for the customer’s browser location.
Orders are allowed only within the configured radius around the restaurant.

To update the restaurant point or radius, edit `data/site.json`:

```json
"delivery": {
  "radiusKm": 5,
  "center": {
    "latitude": 31.5927,
    "longitude": 74.3075
  },
  "message": "We deliver within a 5KM radius of Wrap & Roll, Karim Park, Lahore."
}
```

If the customer is outside the radius, WhatsApp is not opened and the site clearly
shows that delivery is limited to 5KM. The same flow works in the installed PWA
because it uses the same Next.js App Router components.

## 📲 PWA QR Code

The ready-to-scan QR files are in `public/qr/install-qr.png` and
`public/qr/install-qr.svg`. They open the configured `appUrl` from
`data/site.json`.

If the live website URL changes after deployment, regenerate the QR:

```bash
NEXT_PUBLIC_APP_URL=https://your-live-domain.com npm run generate:qr
```

Android users will get the direct **Download & Install App** button. iPhone users
will see the Safari **Share → Add to Home Screen** method because iOS does not
allow websites to trigger that installation action automatically.
