import { EcosystemNotificationPanel } from "@/components/ecosystem/notification-panel";
import { createProjectFromEcosystemEvent } from "@/app/actions/ecosystem";
import { getIncomingEcosystemEvents } from "@/lib/ecosystem";
import { prisma } from "@/lib/db";
import { getCurrentLocale } from "@/lib/locale";

const timeline = ["Luma Studio", "QuotePilot", "ReserveFlow", "ClientHub", "CommerceKit", "EventPass", "SupportDesk Lite", "API Meter"];

const workspaceBlocks = [
  {
    fr: ["Fiche client", "Nom, email, besoin, budget et source du formulaire Luma."],
    en: ["Client profile", "Name, email, need, budget, and source from the Luma form."],
  },
  {
    fr: ["Soumission acceptee", "Montant, numero de soumission, consultant et statut."],
    en: ["Accepted proposal", "Amount, quote number, consultant, and status."],
  },
  {
    fr: ["Notes rendez-vous", "Contexte ReserveFlow et prochaines decisions a documenter."],
    en: ["Meeting notes", "ReserveFlow context and next decisions to document."],
  },
  {
    fr: ["Livraison", "Jalons, fichiers, messages et actions vers les modules aval."],
    en: ["Delivery", "Milestones, files, messages, and downstream module actions."],
  },
];

const copy = {
  fr: {
    product: "Portail client / hub projet",
    title: "Centre de commande projet",
    intro:
      "ClientHub demontre comment le boilerplate devient un portail B2B: contexte client, soumission acceptee, notes de rendez-vous, jalons, fichiers et messages dans un seul espace.",
    testTitle: "Ce que tu peux tester ici",
    receives: "Recoit",
    receivesText: "booking.created depuis ReserveFlow.",
    sends: "Transmet",
    sendsText: "commandes, billets evenement, tickets support et activite API.",
    boilerplate: "Boilerplate",
    boilerplateText: "dashboard relationnel, server actions et donnees projet.",
    timeline: "Timeline du parcours",
    workspace: "Workspace client",
    workspaceTitle: "Pieces visibles dans un vrai portail projet",
    updates: "Nouveautes de l'ecosysteme",
    receivedTitle: "Projets recus de l'ecosysteme",
    receivedText:
      "ClientHub centralise les soumissions acceptees, rendez-vous, notes, fichiers, messages et jalons.",
    newProject: "Nouveau projet recu depuis ReserveFlow",
    source: "Source",
    client: "Client",
    email: "Email",
    phone: "Telephone",
    bookingDate: "Date du rendez-vous",
    projectType: "Type de projet",
    budget: "Budget",
    initialMessage: "Message initial",
    acceptedQuote: "Soumission acceptee",
    amount: "Montant",
    notes: "Notes du rendez-vous",
    projectFile: "Fiche projet ClientHub",
    nextActions: "Actions suivantes envoyees par ClientHub",
    commerce: "Creer une commande dans CommerceKit",
    event: "Creer un atelier dans EventPass",
    support: "Preparer le support client",
    formName: "Nom recu du formulaire",
    quote: "Soumission",
    consultant: "Consultant",
    profileReady: "Fiche client prete",
    milestones: "Jalons a creer",
    messages: "Messages centralises",
    createProject: "Creer le projet ClientHub",
    empty:
      "Aucun projet entrant pour l'instant. Planifie un rendez-vous ReserveFlow pour alimenter ClientHub; la fiche client et l'historique Luma - QuotePilot - ReserveFlow apparaitront ici.",
  },
  en: {
    product: "Client portal / project hub",
    title: "Project command center",
    intro:
      "ClientHub shows how the boilerplate becomes a B2B portal: customer context, accepted proposal, meeting notes, milestones, files, and messages in one workspace.",
    testTitle: "What you can test here",
    receives: "Receives",
    receivesText: "booking.created from ReserveFlow.",
    sends: "Sends",
    sendsText: "orders, event tickets, support tickets, and API activity.",
    boilerplate: "Boilerplate",
    boilerplateText: "relational dashboard, server actions, and project data.",
    timeline: "Journey timeline",
    workspace: "Client workspace",
    workspaceTitle: "Visible pieces in a real project portal",
    updates: "Ecosystem updates",
    receivedTitle: "Projects received from the ecosystem",
    receivedText:
      "ClientHub centralizes accepted proposals, meetings, notes, files, messages, and milestones.",
    newProject: "New project received from ReserveFlow",
    source: "Source",
    client: "Client",
    email: "Email",
    phone: "Phone",
    bookingDate: "Booking date",
    projectType: "Project type",
    budget: "Budget",
    initialMessage: "Initial message",
    acceptedQuote: "Accepted quote",
    amount: "Amount",
    notes: "Meeting notes",
    projectFile: "ClientHub project file",
    nextActions: "Next actions sent by ClientHub",
    commerce: "Create an order in CommerceKit",
    event: "Create a workshop in EventPass",
    support: "Prepare customer support",
    formName: "Name received from the form",
    quote: "Quote",
    consultant: "Consultant",
    profileReady: "Client profile ready",
    milestones: "Milestones to create",
    messages: "Centralized messages",
    createProject: "Create ClientHub project",
    empty:
      "No incoming project yet. Schedule a ReserveFlow meeting to feed ClientHub; the client profile and Luma - QuotePilot - ReserveFlow history will appear here.",
  },
} as const;

export default async function DashboardPage() {
  const [receivedProjects, projects] = await Promise.all([
    getIncomingEcosystemEvents("clienthub", "booking.created", 8),
    prisma.clientHubProject.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      include: { milestones: true, files: true, messages: true },
    }).catch(() => []),
  ]);
  const locale = await getCurrentLocale();
  const t = copy[locale];

  return (
    <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] px-6 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
          <p className="inline-flex rounded-md border bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            KV Portfolio Ecosystem - Demo Mode
          </p>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.product}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal">{t.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {t.intro}
            </p>
          </div>
          <section className="rounded-md border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t.testTitle}
            </p>
            <div className="mt-3 grid gap-2 text-sm">
              <p><span className="font-semibold">{t.receives}:</span> {t.receivesText}</p>
              <p><span className="font-semibold">{t.sends}:</span> {t.sendsText}</p>
              <p><span className="font-semibold">{t.boilerplate}:</span> {t.boilerplateText}</p>
            </div>
          </section>
        </div>
        <div className="mt-8">
          <EcosystemNotificationPanel appKey="clienthub" />
        </div>
        <section className="mt-8 rounded-md border bg-card p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t.timeline}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            {timeline.map((item, index) => (
              <span key={item} className={index === 3 ? "rounded-md border bg-foreground px-3 py-2 text-background" : "rounded-md border bg-background px-3 py-2"}>
                {String(index + 1).padStart(2, "0")} {item}
              </span>
            ))}
          </div>
        </section>
        <section className="mt-8 rounded-md border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t.workspace}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{t.workspaceTitle}</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <a className="rounded-md border bg-background px-3 py-2" href="https://commercekit.vercel.app">CommerceKit</a>
              <a className="rounded-md border bg-background px-3 py-2" href="https://eventpass-nine.vercel.app">EventPass</a>
              <a className="rounded-md border bg-background px-3 py-2" href="https://supportdesk-lite-jet.vercel.app">SupportDesk</a>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {workspaceBlocks.map((block) => {
              const [title, text] = block[locale];
              return (
              <article key={title} className="rounded-md border bg-background p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
              );
            })}
          </div>
        </section>
        <section className="mt-8 rounded-md border bg-card shadow-sm">
          <div className="border-b p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {t.updates}
            </p>
            <h2 className="mt-2 text-xl font-semibold">{t.receivedTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.receivedText}
            </p>
          </div>
          <div className="divide-y">
            {receivedProjects.map((event) => {
              const payload = typeof event.payload === "object" && event.payload !== null
                ? event.payload as Record<string, unknown>
                : {};
              const fields = [
                [t.source, event.sourceApp],
                [t.client, event.customerName ?? t.formName],
                [t.email, event.customerEmail ?? "-"],
                [t.phone, String(payload.phone ?? "-")],
                [t.consultant, String(payload.consultantName ?? "-")],
                [t.bookingDate, String(payload.startAt ?? "-")],
                [t.projectType, String(payload.projectType ?? payload.serviceName ?? "-")],
                [t.budget, String(payload.budgetRange ?? "-")],
                [t.initialMessage, String(payload.originalMessage ?? "-")],
                [t.acceptedQuote, String(payload.quoteNumber ?? payload.quoteId ?? "-")],
                [t.amount, String(payload.quoteTotalCents ?? payload.quoteTotal ?? "-")],
                [t.notes, String(payload.notes ?? "-")],
              ];
              return (
                <article key={event.id} className="grid gap-5 p-5 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="border bg-background px-2 py-1 text-xs font-semibold">{event.sourceApp}</span>
                      <span className="font-mono text-xs text-muted-foreground">{event.flowId}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{t.newProject}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{event.title}</p>
                    <div className="mt-4 grid gap-2 text-xs sm:grid-cols-2 lg:grid-cols-3">
                      {fields.map(([label, value]) => (
                        <div key={label} className="rounded-md border bg-background px-3 py-2">
                          <p className="font-semibold text-muted-foreground">{label}</p>
                          <p className="mt-1 break-words">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-3 self-center md:items-end">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                      {event.eventType}
                    </span>
                    <form action={createProjectFromEcosystemEvent}>
                      <input type="hidden" name="eventId" value={event.id} />
                      <button className="border bg-foreground px-3 py-2 text-xs font-semibold text-background hover:opacity-90">
                        {t.createProject}
                      </button>
                    </form>
                  </div>
                </article>
              );
            })}
            {receivedProjects.length === 0 ? (
              <div className="p-5">
                <p className="rounded-md border bg-background p-4 text-sm text-muted-foreground">
                  {t.empty}
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="mt-8 rounded-md border bg-card shadow-sm">
          <div className="border-b p-5">
            <h2 className="text-xl font-semibold">{t.projectFile}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {locale === "fr"
                ? "L'historique ReserveFlow devient un dossier client avec jalons, fichiers, messages et actions vers les modules aval."
                : "The ReserveFlow history becomes a client file with milestones, files, messages, and downstream module actions."}
            </p>
          </div>
          <div className="divide-y">
            {projects.map((project) => {
              const context = typeof project.contextJson === "object" && project.contextJson !== null
                ? project.contextJson as Record<string, unknown>
                : {};
              return (
                <article key={project.id} className="grid gap-5 p-5 lg:grid-cols-[1fr_0.8fr]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">{project.status}</span>
                      <span className="font-mono text-xs text-muted-foreground">{project.flowId}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{project.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.clientName}</p>
                    <div className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
                      <span className="rounded-md border bg-background px-3 py-2">{t.acceptedQuote}: {project.quoteNumber ?? "-"}</span>
                      <span className="rounded-md border bg-background px-3 py-2">{t.consultant}: {project.consultantName ?? "-"}</span>
                      <span className="rounded-md border bg-background px-3 py-2">{t.notes}: {project.bookingNotes ?? "-"}</span>
                      <span className="rounded-md border bg-background px-3 py-2">{t.email}: {String(context.customerEmail ?? "-")}</span>
                    </div>
                  </div>
                  <div className="rounded-md border bg-background p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{t.nextActions}</p>
                    <div className="mt-4 grid gap-2 text-sm">
                      <span className="rounded-md border bg-card px-3 py-2">{t.commerce}</span>
                      <span className="rounded-md border bg-card px-3 py-2">{t.event}</span>
                      <span className="rounded-md border bg-card px-3 py-2">{t.support}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
