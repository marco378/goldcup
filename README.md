# Gold Cup: 42nd Edition — Next.js Homepage

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
goldcup/
├── app/
│   ├── globals.css          # Design tokens (colors, fonts)
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page (assembles all sections)
├── components/
│   ├── Navbar.tsx           # Fixed top navigation
│   ├── HeroSection.tsx      # Full-height hero with background image
│   ├── LegacySection.tsx    # "MS Dhoni" headline + 4 stats
│   ├── TournamentSnapshot.tsx # Mosaic grid with 6 info cards
│   ├── VideoSection.tsx     # Text + video player
│   ├── CTABanner.tsx        # "Be Part of Cricket History"
│   └── Footer.tsx           # Nav + watermark text
└── public/
    └── images/              # ← PUT YOUR IMAGES HERE
```

---

## 🖼️ Images to Add

Place these in `/public/images/`:

| File name              | Used in              | Description                         |
|------------------------|----------------------|-------------------------------------|
| `hero-bg.png`          | HeroSection          | Cricket batsman at stadium          |
| `cta-bg.png`           | CTABanner            | Cricket batsman action shot         |
| `logo.png`             | Navbar, Footer       | Gold Cup logo                       |
| `video-thumb.jpg`      | VideoSection         | Video thumbnail image               |
| `snapshot-teams.jpg`   | TournamentSnapshot   | Teams card background               |
| `snapshot-player.jpg`  | TournamentSnapshot   | Player Level card background        |
| `snapshot-opening.jpg` | TournamentSnapshot   | Opening Day card background         |
| `snapshot-groups.jpg`  | TournamentSnapshot   | Groups 4 card background            |
| `snapshot-scale.jpg`   | TournamentSnapshot   | Scale card background               |
| `snapshot-format.jpg`  | TournamentSnapshot   | Format card background              |

---

## 🎨 Design Tokens

Edit `app/globals.css` to customize:

```css
:root {
  --gold: #C9A84C;        /* Primary gold accent */
  --gold-light: #E2C06A;  /* Lighter gold */
  --bg: #000000;          /* Page background */
  --bg-card: #111111;     /* Card backgrounds */
  --red: #E31E24;         /* Watch Live button */
  --white: #ffffff;
}
```

---

## ✏️ Quick Customizations

- **Stats numbers** → `LegacySection.tsx` → `stats` array
- **Snapshot cards** → `TournamentSnapshot.tsx` → `cards` array  
- **Nav links** → `Navbar.tsx` → link arrays
- **Video source** → `VideoSection.tsx` → `<source src="..." />`
- **Fonts** → `globals.css` → Google Fonts import (currently: Barlow Condensed + Barlow)
# goldcup
