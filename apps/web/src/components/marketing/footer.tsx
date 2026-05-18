import Link from "next/link";

import { getCurrentLocale } from "@/lib/locale";

const copy = {
  fr: {
    body: "Portail client pour agences et equipes de service: projets, jalons, fichiers, messages et facturation placeholder.",
    links: [
      { href: "/portal", label: "Portail" },
      { href: "/portal/projects", label: "Projets" },
      { href: "/case-study", label: "Etude de cas" },
    ],
    legal: [
      { href: "/privacy", label: "Confidentialite" },
      { href: "/terms", label: "Conditions" },
      { href: "/contact", label: "Contact" },
    ],
  },
  en: {
    body: "Client portal for agencies and service teams: projects, milestones, files, messages, and invoice placeholders.",
    links: [
      { href: "/portal", label: "Portal" },
      { href: "/portal/projects", label: "Projects" },
      { href: "/case-study", label: "Case study" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/contact", label: "Contact" },
    ],
  },
};

export async function Footer() {
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 text-sm text-muted-foreground sm:grid-cols-3">
        <div>
          <p className="font-medium text-foreground">ClientHub</p>
          <p className="mt-2 leading-6">{t.body}</p>
        </div>
        <div className="grid gap-2">
          {t.links.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </div>
        <div className="grid gap-2">
          {t.legal.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
