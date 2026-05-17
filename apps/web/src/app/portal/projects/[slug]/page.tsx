import Link from "next/link";
import { notFound } from "next/navigation";
import { Files, Link2, MessageSquareText } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/clienthub";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <MarketingPageShell>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[1.25rem] border bg-card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{project.client}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-6xl">{project.name}</h1>
          <p className="mt-5 text-lg text-muted-foreground">{project.nextStep}</p>
          <div className="mt-8 h-3 rounded-full bg-muted">
            <div className="h-3 rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <section className="rounded-lg border bg-card p-5">
            <h2 className="font-semibold">Milestones</h2>
            <div className="mt-4 grid gap-3">
              {project.milestones.map((milestone) => (
                <div key={milestone.title} className="rounded-md border bg-background p-3 text-sm">
                  <p className="font-medium">{milestone.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{milestone.status}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-lg border bg-card p-5">
            <h2 className="flex items-center gap-2 font-semibold"><Files className="size-4" /> Files</h2>
            <div className="mt-4 grid gap-3">
              {project.files.map((file) => (
                <div key={file} className="rounded-md border bg-background p-3 text-sm">{file}</div>
              ))}
            </div>
          </section>
          <section className="rounded-lg border bg-card p-5">
            <h2 className="flex items-center gap-2 font-semibold"><MessageSquareText className="size-4" /> Messages</h2>
            <div className="mt-4 grid gap-3">
              {project.messages.map((message) => (
                <div key={`${message.author}-${message.body}`} className="rounded-md border bg-background p-3 text-sm">
                  <p className="font-medium">{message.author}</p>
                  <p className="mt-1 text-muted-foreground">{message.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <section className="mt-8 rounded-lg border bg-primary p-5 text-primary-foreground">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Link2 className="size-5" />
            KV Portfolio connections
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["QuotePilot", project.source],
              ["ReserveFlow", project.booking],
              ["CommerceKit", project.commerceOrder],
              ["EventPass", project.event],
              ["SupportDesk Lite", project.support],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-white/15 bg-white/[0.08] p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">{label}</p>
                <p className="mt-2 text-sm text-primary-foreground/78">{value}</p>
              </div>
            ))}
          </div>
        </section>
        <Button asChild className="mt-8" variant="secondary">
          <Link href="/portal/projects">Back to projects</Link>
        </Button>
      </main>
    </MarketingPageShell>
  );
}
