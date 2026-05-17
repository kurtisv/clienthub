import { EcosystemNotificationPanel } from "@/components/ecosystem/notification-panel";
import { createProjectFromEcosystemEvent } from "@/app/actions/ecosystem";
import { getIncomingEcosystemEvents } from "@/lib/ecosystem";

const stats = [
  ["Projets actifs", "0", "jalons, fichiers et messages"],
  ["Fichiers partages", "0", "documents client visibles"],
  ["Messages", "0", "conversation centralisee"],
  ["Jalons ouverts", "0", "progression projet"],
];

const timeline = ["Luma Studio", "QuotePilot", "ReserveFlow", "ClientHub", "CommerceKit", "EventPass", "SupportDesk Lite", "API Meter"];

const workspaceBlocks = [
  ["Fiche client", "Nom, email, besoin, budget et source du formulaire Luma."],
  ["Soumission acceptee", "Montant, numero de soumission, consultant et statut."],
  ["Notes rendez-vous", "Contexte ReserveFlow et prochaines decisions a documenter."],
  ["Livraison", "Jalons, fichiers, messages et actions vers les modules aval."],
];

export default async function DashboardPage() {
  const receivedProjects = await getIncomingEcosystemEvents("clienthub", undefined, 8);

  return (
    <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] px-6 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
          <p className="inline-flex rounded-md border bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            KV Portfolio Ecosystem - Demo Mode
          </p>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Client portal / project hub
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal">Project command center</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              ClientHub demontre comment le boilerplate devient un portail B2B: contexte client,
              soumission acceptee, notes de rendez-vous, jalons, fichiers et messages dans un seul espace.
            </p>
          </div>
          <section className="rounded-md border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Ce que tu peux tester ici
            </p>
            <div className="mt-3 grid gap-2 text-sm">
              <p><span className="font-semibold">Recoit:</span> booking.created depuis ReserveFlow.</p>
              <p><span className="font-semibold">Transmet:</span> commandes, billets evenement, tickets support et activite API.</p>
              <p><span className="font-semibold">Boilerplate:</span> dashboard relationnel, server actions et donnees projet.</p>
            </div>
          </section>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([label, value, hint]) => (
            <section key={label} className="rounded-md border bg-card p-5 shadow-sm">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-3 text-2xl font-semibold">{value}</p>
              <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
            </section>
          ))}
        </div>
        <div className="mt-8">
          <EcosystemNotificationPanel appKey="clienthub" />
        </div>
        <section className="mt-8 rounded-md border bg-card p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Timeline du parcours</p>
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
                Workspace client
              </p>
              <h2 className="mt-2 text-xl font-semibold">Pieces visibles dans un vrai portail projet</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <a className="rounded-md border bg-background px-3 py-2" href="https://commercekit.vercel.app">CommerceKit</a>
              <a className="rounded-md border bg-background px-3 py-2" href="https://eventpass-nine.vercel.app">EventPass</a>
              <a className="rounded-md border bg-background px-3 py-2" href="https://supportdesk-lite-jet.vercel.app">SupportDesk</a>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            {workspaceBlocks.map(([title, text]) => (
              <article key={title} className="rounded-md border bg-background p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="mt-8 rounded-md border bg-card shadow-sm">
          <div className="border-b p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Nouveautes de l&apos;ecosysteme
            </p>
            <h2 className="mt-2 text-xl font-semibold">Projets recus de l&apos;ecosysteme</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              ClientHub centralise les soumissions acceptees, rendez-vous, notes, fichiers, messages et jalons.
            </p>
          </div>
          <div className="divide-y">
            {receivedProjects.map((event) => {
              const payload = typeof event.payload === "object" && event.payload !== null
                ? event.payload as Record<string, unknown>
                : {};
              return (
                <article key={event.id} className="grid gap-4 p-5 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="border bg-background px-2 py-1 text-xs font-semibold">{event.sourceApp}</span>
                      <span className="font-mono text-xs text-muted-foreground">{event.flowId}</span>
                    </div>
                    <h3 className="mt-3 font-semibold">{event.customerName ?? "Nom recu du formulaire"}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{event.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Soumission {String(payload.quoteNumber ?? "-")} · Consultant {String(payload.consultantName ?? "-")}
                    </p>
                    <div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                      <span className="rounded-md border bg-background px-3 py-2">Fiche client prete</span>
                      <span className="rounded-md border bg-background px-3 py-2">Jalons a creer</span>
                      <span className="rounded-md border bg-background px-3 py-2">Messages centralises</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-3 self-center md:items-end">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                      {event.eventType}
                    </span>
                    <form action={createProjectFromEcosystemEvent}>
                      <input type="hidden" name="eventId" value={event.id} />
                      <button className="border bg-foreground px-3 py-2 text-xs font-semibold text-background hover:opacity-90">
                        Creer le projet ClientHub
                      </button>
                    </form>
                  </div>
                </article>
              );
            })}
            {receivedProjects.length === 0 ? (
              <div className="p-5">
                <p className="rounded-md border bg-background p-4 text-sm text-muted-foreground">
                  Aucun projet entrant pour l&apos;instant. Planifie un rendez-vous ReserveFlow pour alimenter ClientHub;
                  la fiche client et l&apos;historique Luma - QuotePilot - ReserveFlow apparaitront ici.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
