import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    title: "ClientHub montre le cote portail client du boilerplate.",
    intro: "Ce projet prouve qu'une meme base peut livrer un espace B2B protege avec projets, fichiers, messages, jalons et facturation placeholder.",
    cta: "Explorer le portail",
  },
  en: {
    title: "ClientHub shows the client portal side of the boilerplate.",
    intro: "This project proves that one foundation can deliver a protected B2B space with projects, files, messages, milestones, and invoice placeholders.",
    cta: "Explore portal",
  },
};

export default async function CaseStudyPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];
  const points = [
    "Protected portal-ready UX built on Auth.js and Prisma foundations.",
    "Project detail pages with milestones, files, messages, and next decisions.",
    "Distinct visual system from commerce, booking, API, and marketing projects.",
    "FR/EN public copy and recruiter-facing explanation.",
  ];

  return (
    <MarketingPageShell>
      <main className="mx-auto grid max-w-5xl gap-8 px-6 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Case study</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">{t.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{t.intro}</p>
        </div>
        <div className="grid gap-3">
          {points.map((point) => (
            <div key={point} className="flex gap-3 rounded-lg border bg-card p-5 text-sm leading-6 text-muted-foreground">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
              {point}
            </div>
          ))}
        </div>
        <Button asChild>
          <Link href="/portal">{t.cta}</Link>
        </Button>
      </main>
    </MarketingPageShell>
  );
}
