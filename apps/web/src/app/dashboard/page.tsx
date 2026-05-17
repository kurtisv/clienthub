import { EcosystemNotificationPanel } from "@/components/ecosystem/notification-panel";
import { createProjectFromEcosystemEvent } from "@/app/actions/ecosystem";
import { getIncomingEcosystemEvents } from "@/lib/ecosystem";

const stats = [
  ["Rendez-vous aujourd'hui", "0"],
  ["Revenus du mois", "$0"],
  ["Requetes API du mois", "0"],
  ["Abonnements actifs", "0"],
];

const timeline = ["Luma Studio", "QuotePilot", "ReserveFlow", "ClientHub", "CommerceKit", "EventPass", "SupportDesk Lite", "API Meter"];

export default async function DashboardPage() {
  const receivedProjects = await getIncomingEcosystemEvents("clienthub", undefined, 8);

  return (
    <main className="px-6 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Dashboard
          </p>
          <p className="mt-2 inline-flex border bg-secondary px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            KV Portfolio Ecosystem - Demo Mode
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Centre de controle</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([label, value]) => (
            <section key={label} className="border bg-card p-5">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-3 text-2xl font-semibold">{value}</p>
            </section>
          ))}
        </div>
        <div className="mt-8">
          <EcosystemNotificationPanel appKey="clienthub" />
        </div>
        <section className="mt-8 rounded-md border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Timeline du parcours</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            {timeline.map((item, index) => (
              <span key={item} className={index === 3 ? "border bg-foreground px-3 py-2 text-background" : "border bg-background px-3 py-2"}>
                {String(index + 1).padStart(2, "0")} {item}
              </span>
            ))}
          </div>
        </section>
        <section className="mt-8 rounded-md border bg-card">
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
              <p className="p-5 text-sm text-muted-foreground">
                Aucun projet entrant pour l&apos;instant. Planifie un rendez-vous ReserveFlow pour alimenter ClientHub.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
