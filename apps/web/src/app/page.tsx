import Link from "next/link";
import { ArrowRight, Brush, CheckCircle2, Files, Layers3, MessageSquareText, Sparkles } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { portalStats, projects } from "@/data/clienthub";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    eyebrow: "Vitrine 3D - Studio portfolio",
    title: "Une experience client premium avec profondeur, mouvement et preuves visuelles.",
    intro:
      "ClientHub devient une vitrine moderne inspiree des portfolios pousses: hero immersif, scene 3D CSS, projets selectionnes, preuves de process et parcours clair pour un recruteur.",
    primary: "Explorer la vitrine",
    secondary: "Voir l'etude",
    sceneLabel: "Studio deck",
    proofTitle: "Une vitrine plus editoriale, moins dashboard generique.",
    proof:
      "Le site presente la capacite a transformer une base Next.js en experience de marque: direction visuelle, systeme de cartes, structure bilingue et sections utiles a une decision rapide.",
    modules: [
      { title: "Direction", text: "Hero 3D, composition editoriale et langage visuel propre.", icon: Brush },
      { title: "Projets", text: "Selection de cas visibles avec statut, progression et prochaine action.", icon: Layers3 },
      { title: "Preuves", text: "Fichiers, jalons et messages deviennent des signaux de travail reel.", icon: Files },
      { title: "Contact", text: "Navigation courte vers l'etude et les surfaces inspectables.", icon: MessageSquareText },
    ],
    caseTitle: "Trois blocs suffisent pour comprendre la valeur.",
  },
  en: {
    eyebrow: "3D showcase - Portfolio studio",
    title: "A premium client experience with depth, motion, and visible proof.",
    intro:
      "ClientHub is now a modern showcase inspired by advanced portfolios: immersive hero, CSS 3D scene, selected projects, process proof, and a clear recruiter path.",
    primary: "Explore showcase",
    secondary: "View case study",
    sceneLabel: "Studio deck",
    proofTitle: "A more editorial showcase, less generic dashboard.",
    proof:
      "The site shows how a Next.js foundation can become a brand experience: visual direction, card system, bilingual structure, and sections that help a recruiter decide quickly.",
    modules: [
      { title: "Direction", text: "3D hero, editorial composition, and a distinct visual language.", icon: Brush },
      { title: "Projects", text: "Selected cases with visible status, progress, and next action.", icon: Layers3 },
      { title: "Proof", text: "Files, milestones, and messages become signals of real work.", icon: Files },
      { title: "Contact", text: "Short navigation toward the case study and inspectable surfaces.", icon: MessageSquareText },
    ],
    caseTitle: "Three blocks are enough to understand the value.",
  },
} as const;

export default async function Home() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <main className="overflow-hidden">
        <section className="relative border-b">
          <div className="absolute inset-0 -z-10 clienthub-grid" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-lg border bg-card/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {t.eyebrow}
              </p>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-normal text-balance sm:text-6xl lg:text-7xl">
                {t.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="#showcase">
                    {t.primary} <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/case-study">{t.secondary}</Link>
                </Button>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                {portalStats.map((stat) => (
                  <div key={stat.label} className="rounded-lg border bg-card/85 p-4 shadow-sm">
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="clienthub-scene" aria-label={t.sceneLabel}>
              <div className="clienthub-stage">
                <div className="clienthub-panel clienthub-panel-main">
                  <div className="flex items-center justify-between border-b border-white/15 pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">{t.sceneLabel}</p>
                      <p className="mt-1 text-2xl font-semibold text-white">Northline Studio</p>
                    </div>
                    <Sparkles className="size-7 text-[#f4d8c9]" />
                  </div>
                  <div className="mt-5 grid gap-4">
                    {projects.slice(0, 2).map((project) => (
                      <div key={project.slug} className="rounded-xl border border-white/15 bg-white/[0.08] p-4 text-white">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-semibold">{project.name}</p>
                            <p className="mt-1 text-sm text-white/58">{project.nextStep}</p>
                          </div>
                          <p className="rounded-full bg-white/10 px-2 py-1 text-xs">{project.status}</p>
                        </div>
                        <div className="mt-4 h-2 rounded-full bg-white/10">
                          <div className="h-2 rounded-full bg-[#f4d8c9]" style={{ width: `${project.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="clienthub-panel clienthub-panel-left">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/55">Files</p>
                  <Files className="mt-6 size-9 text-[#f4d8c9]" />
                  <p className="mt-4 text-sm text-white/70">Assets, notes, proof</p>
                </div>
                <div className="clienthub-panel clienthub-panel-right">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/55">Milestones</p>
                  <CheckCircle2 className="mt-6 size-9 text-[#dbe7d3]" />
                  <p className="mt-4 text-sm text-white/70">Decisions, progress, launch</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="showcase" className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal text-balance sm:text-5xl">{t.proofTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">{t.proof}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.modules.map((module) => (
              <div key={module.title} className="clienthub-lift rounded-lg border bg-card p-5">
                <module.icon className="size-6 text-primary" />
                <h3 className="mt-5 font-semibold">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-normal text-balance sm:text-5xl">{t.caseTitle}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {projects.map((project) => (
                <Link key={project.slug} href={`/portal/projects/${project.slug}`} className="rounded-xl border border-white/15 bg-white/[0.07] p-5 text-primary-foreground transition hover:bg-white/[0.12]">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-secondary">{project.status}</p>
                  <h3 className="mt-4 text-2xl font-semibold">{project.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-primary-foreground/70">{project.nextStep}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}
