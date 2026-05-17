import { EcosystemNotificationPanel } from "@/components/ecosystem/notification-panel";
import { getIncomingEcosystemEvents } from "@/lib/ecosystem";

const stats = [
  ["Rendez-vous aujourd'hui", "0"],
  ["Revenus du mois", "$0"],
  ["Requetes API du mois", "0"],
  ["Abonnements actifs", "0"],
];

export default async function DashboardPage() {
  const receivedProjects = await getIncomingEcosystemEvents("clienthub", undefined, 8);

  return (
    <main className="px-6 py-10 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Dashboard
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
        <section className="mt-8 rounded-md border bg-card">
          <div className="border-b p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Nouveautes de l'ecosysteme
            </p>
            <h2 className="mt-2 text-xl font-semibold">Projets recus de l'ecosysteme</h2>
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
                <article key={event.id} className="grid gap-3 p-5 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="border bg-background px-2 py-1 text-xs font-semibold">{event.sourceApp}</span>
                      <span className="font-mono text-xs text-muted-foreground">{event.flowId}</span>
                    </div>
                    <h3 className="mt-3 font-semibold">{event.customerName ?? "Client ecosysteme"}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{event.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Soumission {String(payload.quoteNumber ?? "-")} · Consultant {String(payload.consultantName ?? "-")}
                    </p>
                  </div>
                  <span className="self-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                    {event.eventType}
                  </span>
                </article>
              );
            })}
            {receivedProjects.length === 0 ? (
              <p className="p-5 text-sm text-muted-foreground">
                Aucun projet entrant pour l'instant. Planifie un rendez-vous ReserveFlow pour alimenter ClientHub.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
