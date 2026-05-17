import Link from "next/link";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { projects } from "@/data/clienthub";

export default function ProjectsPage() {
  return (
    <MarketingPageShell>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Projects</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal">Client project list</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.slug} href={`/portal/projects/${project.slug}`} className="clienthub-lift rounded-lg border bg-card p-5">
              <div className="h-2 w-20 rounded-full" style={{ backgroundColor: project.accent }} />
              <p className="mt-5 text-sm text-muted-foreground">{project.client}</p>
              <h2 className="mt-1 text-2xl font-semibold">{project.name}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{project.nextStep}</p>
              <div className="mt-5 h-2 rounded-full bg-muted">
                <div className="h-2 rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </MarketingPageShell>
  );
}
