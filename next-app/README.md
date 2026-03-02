# VERSE(US) — 中原建築62屆 Portfolio (Next.js)

A portfolio website for the CYCU 62nd Architecture graduation exhibition, built with **Next.js 15** and a premium dark glassmorphism UI.

## 🚀 Getting Started

```bash
cd next-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Project Structure

```
next-app/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home page
│   │   ├── students/         # Students list + [id] detail
│   │   ├── events/           # Events page
│   │   ├── shop/             # Shop page
│   │   ├── about/            # About page
│   │   ├── admin/            # Admin portal (login + dashboard)
│   │   └── api/admin/        # API routes: login, students, upload
│   ├── components/           # Navbar, Footer, StudentCard, StudentGrid
│   ├── data/                 # students.json, settings.json
│   └── types/                # TypeScript types
└── public/
    └── uploads/              # All uploaded images
```

## 🔒 Admin Portal

Visit `/admin` to access the admin dashboard.

**Default password:** `cyar2026`  
**Change it** in `.env.local`:
```
ADMIN_PASSWORD=your_new_password
```

### What admins can do:
- ✏️ Edit student name, title, description, category, advisor
- 📤 Upload images (card, hero, profile, project images)
- 💾 Save changes directly to `students.json`

## 📝 Editing Content

### Students
Edit `src/data/students.json` — or use the admin panel at `/admin`.

### Exhibition Info, Events, Shop
Edit `src/data/settings.json`.

## 🌐 Deployment

Deploy to **Vercel** (recommended — supports API routes):
1. Import this repo on [vercel.com](https://vercel.com)
2. Set environment variable `ADMIN_PASSWORD` in Vercel dashboard
3. Deploy!

Or deploy with:
```bash
npm run build
npm start
```
