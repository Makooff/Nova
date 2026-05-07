# Nova — Agence de Production Vidéo Publicitaire

Site web de Nova, agence de production vidéo publicitaire opérant en Belgique et en France.

## Stack

- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS + CSS transitions custom
- **Fonts** : Sora · Plus Jakarta Sans · DM Mono (Google Fonts)
- **Animations** : IntersectionObserver API + CSS (pas de lib externe)
- **Emails** : Resend (formulaire de contact)
- **Déploiement** : Vercel

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Créer un fichier `.env.local` :

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=hello@nova-agency.be
NEXT_PUBLIC_BASE_URL=https://nova-agency.be
```

## Structure

```
app/
  page.tsx                         # Page d'accueil (toutes les sections)
  services/                        # Services détaillés
  realisations/                    # Portfolio
  process/                         # Process en 4 étapes
  partenaire/                      # Page Qwillio
  contact/                         # Formulaire de devis
  blog/                            # Liste articles
  mentions-legales/
  politique-de-confidentialite/
  api/contact/route.ts             # API formulaire (Resend)
  sitemap.ts                       # Sitemap auto-généré
  robots.ts

components/
  layout/  Navbar · Footer · MobileMenu
  ui/      Button · QwillioLogo · QwillioName · RevealWrapper · Marquee · ScrollIndicator
  sections/ Hero · Showreel · Stats · Services · Portfolio · Process · Partner · Testimonials · CTA
```

## Build

```bash
npm run build
```
