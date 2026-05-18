import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { MarketingPageShell } from "@/components/marketing/page-shell";
import { Button } from "@/components/ui/button";
import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    eyebrow: "Etude de cas",
    title: "ClientHub devient une vitrine portfolio 3D pour une experience client premium.",
    intro: "Le projet prouve qu'une meme base peut livrer un site vitrine moderne avec scene 3D CSS, composition editoriale, preuves de projets et navigation claire pour recruteur.",
    cta: "Explorer la vitrine",
    points: [
      "Hero 3D CSS avec cartes inclinees et profondeur visuelle.",
      "Sections de preuve avec projets, progression, fichiers et jalons.",
      "Positionnement vitrine moderne au lieu d'un dashboard generique.",
      "Systeme visuel distinct des autres sites portfolio.",
      "Copie FR/EN et explication claire pour recruteur.",
    ],
  },
  en: {
    eyebrow: "Case study",
    title: "ClientHub becomes a 3D portfolio showcase for a premium client experience.",
    intro: "The project proves one foundation can deliver a modern showcase site with a CSS 3D scene, editorial composition, project proof, and a clear recruiter path.",
    cta: "Explore showcase",
    points: [
      "CSS 3D hero with tilted cards and visual depth.",
      "Proof sections with projects, progress, files, and milestones.",
      "Modern showcase positioning instead of a generic dashboard.",
      "Distinct visual system from the other portfolio sites.",
      "FR/EN public copy and recruiter-facing explanation.",
    ],
  },
};

export default async function CaseStudyPage() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <MarketingPageShell>
      <main className="mx-auto grid max-w-5xl gap-8 px-6 py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{t.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-balance sm:text-5xl">{t.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{t.intro}</p>
        </div>
        <div className="grid gap-3">
          {t.points.map((point) => (
            <div key={point} className="flex gap-3 rounded-lg border bg-card p-5 text-sm leading-6 text-muted-foreground">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
              {point}
            </div>
          ))}
        </div>
        <Button asChild>
          <Link href="/#showcase">{t.cta}</Link>
        </Button>
      </main>
    </MarketingPageShell>
  );
}
