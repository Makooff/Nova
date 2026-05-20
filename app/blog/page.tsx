import type { Metadata } from "next";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";

export const metadata: Metadata = {
  title: "Blog — Nova | Conseils Vidéo & Publicité",
  description:
    "Conseils, tendances et retours d'expérience en production vidéo publicitaire, campagnes Ads et stratégie digitale.",
};

const posts = [
  {
    slug: "roas-video-publicitaire",
    date: "12 mai 2026",
    category: "Stratégie",
    title: "Comment maximiser le ROAS de vos vidéos publicitaires",
    excerpt:
      "Les 5 leviers créatifs qui font la différence entre une vidéo qui coûte et une vidéo qui rapporte.",
    readTime: "5 min",
  },
  {
    slug: "formats-video-ads-2026",
    date: "28 avril 2026",
    category: "Production",
    title: "Formats vidéo Ads en 2026 : le guide complet",
    excerpt:
      "Reels, Stories, YouTube Shorts, Display — quel format pour quel objectif et quelle plateforme.",
    readTime: "7 min",
  },
  {
    slug: "agents-ia-gestion-pme",
    date: "10 avril 2026",
    category: "IA",
    title: "Agents IA pour PME : ce qui change vraiment",
    excerpt:
      "Au-delà du buzz, voici comment les agents IA transforment concrètement la gestion des petites et moyennes entreprises.",
    readTime: "6 min",
  },
  {
    slug: "tournage-belgique-france",
    date: "3 mars 2026",
    category: "Production",
    title: "Tourner en Belgique ou en France : ce qu'il faut savoir",
    excerpt:
      "Réglementation, logistique, coûts et avantages de chaque marché pour vos productions vidéo publicitaires.",
    readTime: "8 min",
  },
  {
    slug: "brief-creatif-video",
    date: "14 février 2026",
    category: "Stratégie",
    title: "Le brief créatif vidéo parfait : modèle et conseils",
    excerpt:
      "Un bon brief est la fondation de toute vidéo réussie. Voici comment en rédiger un qui inspire votre équipe de production.",
    readTime: "4 min",
  },
  {
    slug: "meta-ads-video-2026",
    date: "2 janvier 2026",
    category: "Ads",
    title: "Meta Ads vidéo en 2026 : ce qui fonctionne",
    excerpt:
      "Algorithmes, formats et hooks créatifs — le guide pratique pour performer sur Facebook et Instagram.",
    readTime: "9 min",
  },
];

export default function BlogPage() {
  return (
    <main className="pt-[52px]" style={{ background: "oklch(0.13 0.008 55)" }}>
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <RevealWrapper className="mb-14">
            <p
              className="font-mono text-[10px] uppercase tracking-wider mb-4"
              style={{ color: "oklch(0.42 0.007 62)" }}
            >
              Ressources
            </p>
            <h1
              className="font-sora font-thin tracking-tighter"
              style={{
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.04em",
                color: "oklch(0.93 0.012 70)",
              }}
            >
              Blog
            </h1>
          </RevealWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <RevealWrapper key={post.slug} delay={i * 60}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full rounded-2xl p-6 transition-colors duration-200"
                  style={{
                    background: "oklch(0.17 0.009 55)",
                    border: "1px solid oklch(0.26 0.008 55)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-mono text-[9px] uppercase tracking-wider"
                      style={{ color: "oklch(0.42 0.007 62)" }}
                    >
                      {post.category}
                    </span>
                    <span
                      className="font-mono text-[9px] uppercase tracking-wider"
                      style={{ color: "oklch(0.42 0.007 62)" }}
                    >
                      {post.readTime}
                    </span>
                  </div>
                  <h2
                    className="font-sora font-light text-[18px] leading-snug mb-3 flex-1 transition-colors duration-200"
                    style={{ color: "oklch(0.93 0.012 70)" }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="font-sora font-light text-sm leading-relaxed mb-4"
                    style={{ color: "oklch(0.52 0.008 65)" }}
                  >
                    {post.excerpt}
                  </p>
                  <p
                    className="font-mono text-[9px] uppercase tracking-wider"
                    style={{ color: "oklch(0.32 0.007 60)" }}
                  >
                    {post.date}
                  </p>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
