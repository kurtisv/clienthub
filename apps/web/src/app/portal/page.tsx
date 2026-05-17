import Link from "next/link";
import { ArrowRight, Files, MessageSquareText, Milestone } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { ecosystemHandoffs, portalStats, projects } from "@/data/clienthub";
import { getCurrentLocale } from "@/lib/locale";

export default async function PortalPage() {
  const locale = await getCurrentLocale();

  return (
    <MarketingPageShell>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Portal</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">
              {locale === "fr" ? "Un espace client clair pour suivre le travail." : "A clear client space for tracking work."}
            </h1>
          </div>
          <Button asChild>
            <Link href="/portal/projects">
              {locale === "fr" ? "Voir les projets" : "View projects"} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {portalStats.map((stat) => (
            <div key={stat.label} className="rounded-lg border bg-card p-5">
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-lg border bg-card">
            <div className="border-b p-5">
              <h2 className="text-xl font-semibold">Project timeline</h2>
            </div>
            <div className="divide-y">
              {projects.map((project) => (
                <Link key={project.slug} href={`/portal/projects/${project.slug}`} className="block p-5 hover:bg-muted">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold">{project.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <p className="text-sm font-medium">{project.progress}%</p>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
          <section className="grid gap-4">
            {[
              { icon: Milestone, title: "Milestones", value: "8" },
              { icon: Files, title: "Shared files", value: "6" },
              { icon: MessageSquareText, title: "Messages", value: "4" },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border bg-card p-5">
                <item.icon className="size-5 text-primary" />
                <p className="mt-4 text-sm text-muted-foreground">{item.title}</p>
                <p className="mt-1 text-3xl font-semibold">{item.value}</p>
              </div>
            ))}
          </section>
        </div>
        <section className="mt-8 rounded-lg border bg-card p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            KV Portfolio handoffs
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            {locale === "fr" ? "Les donnees client viennent de plusieurs modules." : "Client data arrives from several modules."}
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {ecosystemHandoffs.map((handoff) => (
              <div key={handoff.module} className="rounded-md border bg-background p-4">
                <p className="font-semibold">{handoff.module}</p>
                <p className="mt-1 text-sm text-muted-foreground">{handoff.signal}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}
