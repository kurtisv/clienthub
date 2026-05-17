import Link from "next/link";
import { ArrowRight, CheckCircle2, Files, MessageSquareText, Milestone, ShieldCheck } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { ecosystemHandoffs, portalStats, projects } from "@/data/clienthub";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    eyebrow: "Projet 7 - Portail client",
    title: "Un portail client qui rend les projets, fichiers et decisions visibles.",
    intro:
      "ClientHub montre comment le boilerplate devient une experience B2B protegee avec projets, jalons, fichiers, messages et facturation placeholder.",
    primary: "Ouvrir le portail",
    secondary: "Voir l'etude",
    cockpit: "Client workspace",
    modules: [
      { title: "Projets", text: "Vue client par projet avec statut, progression et prochaine decision.", icon: Milestone },
      { title: "Fichiers", text: "Documents partages, livrables et traces utiles au suivi.", icon: Files },
      { title: "Messages", text: "Fil de discussion simple pour garder le contexte au meme endroit.", icon: MessageSquareText },
      { title: "Confiance", text: "Base Auth.js/Prisma prete pour portail protege et acces client.", icon: ShieldCheck },
    ],
    ecosystemTitle: "Le portail rassemble les signaux des autres modules.",
    ecosystemText:
      "ClientHub devient le dossier client central: devis QuotePilot, rendez-vous ReserveFlow, achats CommerceKit, inscriptions EventPass et suivi SupportDesk restent visibles au meme endroit.",
  },
  en: {
    eyebrow: "Project 7 - Client portal",
    title: "A client portal that makes projects, files, and decisions visible.",
    intro:
      "ClientHub shows how the boilerplate becomes a protected B2B experience with projects, milestones, files, messages, and invoice placeholders.",
    primary: "Open portal",
    secondary: "View case study",
    cockpit: "Client workspace",
    modules: [
      { title: "Projects", text: "Client-facing project view with status, progress, and next decision.", icon: Milestone },
      { title: "Files", text: "Shared documents, deliverables, and useful project trail.", icon: Files },
      { title: "Messages", text: "Simple message thread to keep context in one place.", icon: MessageSquareText },
      { title: "Trust", text: "Auth.js/Prisma foundation ready for protected client access.", icon: ShieldCheck },
    ],
    ecosystemTitle: "The portal gathers signals from the other modules.",
    ecosystemText:
      "ClientHub becomes the central client record: QuotePilot proposals, ReserveFlow appointments, CommerceKit purchases, EventPass registrations, and SupportDesk follow-up stay visible in one place.",
  },
};

export default async function Home() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <main className="overflow-hidden">
        <section className="relative border-b">
          <div className="absolute inset-0 -z-10 clienthub-grid" />
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
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
                  <Link href="/portal">
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
            <div className="rounded-[1.25rem] border bg-card shadow-2xl shadow-slate-950/10">
              <div className="border-b px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{t.cockpit}</p>
                <p className="mt-1 text-xl font-semibold">Northline Studio</p>
              </div>
              <div className="grid gap-4 p-5">
                {projects.map((project) => (
                  <div key={project.slug} className="rounded-lg border bg-background p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold">{project.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{project.nextStep}</p>
                      </div>
                      <p className="rounded-full bg-secondary px-2 py-1 text-xs font-medium">{project.status}</p>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                    </div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-4">
                      {project.milestones.map((milestone) => (
                        <div key={milestone.title} className="rounded-md border bg-card p-2 text-xs">
                          <CheckCircle2 className="mb-2 size-3 text-primary" />
                          {milestone.title}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-4 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {t.modules.map((module) => (
            <div key={module.title} className="clienthub-lift rounded-lg border bg-card p-5">
              <module.icon className="size-6 text-primary" />
              <h2 className="mt-5 font-semibold">{module.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.text}</p>
            </div>
          ))}
        </section>
        <section className="border-y bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                KV Portfolio ecosystem
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal text-balance sm:text-5xl">
                {t.ecosystemTitle}
              </h2>
              <p className="mt-5 text-lg leading-8 text-primary-foreground/75">{t.ecosystemText}</p>
            </div>
            <div className="grid gap-3">
              {ecosystemHandoffs.map((handoff) => (
                <div key={handoff.module} className="grid gap-3 rounded-lg border border-white/15 bg-white/[0.06] p-4 sm:grid-cols-[0.7fr_1fr_auto]">
                  <p className="font-semibold">{handoff.module}</p>
                  <p className="text-sm text-primary-foreground/72">{handoff.signal}</p>
                  <p className="text-sm font-medium text-secondary">{handoff.owner}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}
