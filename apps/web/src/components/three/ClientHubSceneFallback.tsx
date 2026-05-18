export function ClientHubSceneFallback() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] border bg-[#111827] p-6 text-white shadow-2xl shadow-slate-950/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(148,163,184,0.24),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.96))]" />
      <div className="relative grid h-full min-h-[360px] grid-cols-[0.82fr_1.18fr] gap-4">
        <div className="self-end rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Client workspace</p>
          <h3 className="mt-3 text-2xl font-semibold">Command center</h3>
          <p className="mt-3 text-sm leading-6 text-white/62">Projects, files, messages, milestones, and decisions stay connected in one client room.</p>
        </div>
        <div className="relative">
          {["QuotePilot", "ReserveFlow", "CommerceKit", "SupportDesk"].map((item, index) => (
            <div
              key={item}
              className="absolute rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold backdrop-blur"
              style={{ left: `${index % 2 === 0 ? 4 : 42}%`, top: `${16 + index * 18}%` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
