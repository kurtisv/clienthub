import Link from "next/link";
import { ArrowRight, Brush, Files, Layers3, MessageSquareText } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { ClientHubScene } from "@/components/three/ClientHubScene";
import { Button } from "@/components/ui/button";
import { portalStats, projects } from "@/data/clienthub";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    eyebrow: "Workspace client 3D",
    title: "Un portail client centralise mis en scene comme un vrai control center.",
    intro:
      "ClientHub montre clairement ce qu il fait: projets, fichiers, messages, jalons et decisions convergent dans un workspace client unique, lisible et premium.",
    primary: "Explorer la vitrine",
    secondary: "Voir l'etude",
    sceneLabel: "Studio deck",
    proofTitle: "Le portail est montre comme une organisation de travail, pas comme un simple dashboard.",
    proof:
      "Le recruteur comprend immediatement que ClientHub centralise l information client. La scene hero ne montre pas une 3D gadget: elle rend visibles les liens entre projet, fichiers, messages, milestones et modules relies.",
    modules: [
      { title: "Direction", text: "Workspace 3D sobre, hierarchie claire et narration B2B premium.", icon: Brush },
      { title: "Projets", text: "Carte projet centrale avec statut, progression et action attendue.", icon: Layers3 },
      { title: "Preuves", text: "Fichiers, jalons et messages deviennent des signaux de travail reel.", icon: Files },
      { title: "Contact", text: "Navigation courte vers l'etude et les surfaces inspectables.", icon: MessageSquareText },
    ],
    caseTitle: "Trois blocs suffisent pour comprendre la valeur.",
  },
  en: {
    eyebrow: "3D client workspace",
    title: "A centralized client portal staged like a real control center.",
    intro:
      "ClientHub shows exactly what it does: projects, files, messages, milestones, and decisions converge into one readable premium client workspace.",
    primary: "Explore showcase",
    secondary: "View case study",
    sceneLabel: "Studio deck",
    proofTitle: "The portal is framed as working organization, not a generic dashboard.",
    proof:
      "Recruiters can immediately see that ClientHub centralizes client information. The hero scene is not decorative 3D: it makes the relationship between project, files, messages, milestones, and linked modules visible.",
    modules: [
      { title: "Direction", text: "Restrained 3D workspace, clear hierarchy, and a premium B2B language.", icon: Brush },
      { title: "Projects", text: "A central project card with visible status, progress, and next action.", icon: Layers3 },
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

            <ClientHubScene />
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
