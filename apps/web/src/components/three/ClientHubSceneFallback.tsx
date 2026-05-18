export function ClientHubSceneFallback() {
  return (
    <div className="relative h-full overflow-hidden bg-[radial-gradient(circle_at_22%_18%,rgba(148,163,184,0.18),transparent_16rem),radial-gradient(circle_at_80%_24%,rgba(96,165,250,0.14),transparent_18rem),linear-gradient(150deg,#111827,#162234_46%,#0f172a)] p-5 text-white sm:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />

      <div className="relative flex h-full items-center justify-center">
        <div className="relative w-full max-w-[36rem] [perspective:1400px]">
          <div className="absolute left-1/2 top-[53%] h-[15rem] w-[24rem] -translate-x-1/2 rounded-[2rem] border border-white/8 bg-[#0d1420]/60 shadow-[0_28px_80px_rgba(2,6,12,0.45)] [transform:translate3d(-50%,0,0)_rotateX(76deg)]" />

          <div className="absolute left-4 top-12 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-100 backdrop-blur">
            Files
          </div>
          <div className="absolute right-2 top-14 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-100 backdrop-blur">
            Messages
          </div>
          <div className="absolute right-10 bottom-12 rounded-full border border-emerald-300/15 bg-emerald-300/10 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-emerald-100 backdrop-blur">
            82%
          </div>

          <div className="relative mx-auto max-w-[25rem] rounded-[2rem] border border-white/14 bg-[linear-gradient(145deg,rgba(229,236,245,0.18),rgba(190,205,224,0.07))] p-5 shadow-[0_24px_90px_rgba(2,6,12,0.45)] backdrop-blur-xl [transform:rotateX(10deg)_rotateY(-16deg)_rotateZ(1deg)]">
            <div className="absolute inset-x-8 top-0 h-14 rounded-b-[1.6rem] bg-[linear-gradient(180deg,rgba(148,163,184,0.16),transparent)]" />
            <div className="relative">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-300">Northline Workspace</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">Client control center</h3>
              <p className="mt-3 max-w-[18rem] text-sm leading-6 text-white/64">
                Files, milestones, messages, and decisions stay attached to one organized project card.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[1.4rem] border border-white/12 bg-white/8 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-300">Files</p>
                  <p className="mt-2 text-sm font-semibold text-white">Proposal, handoff, scope, assets</p>
                </div>
                <div className="rounded-[1.4rem] border border-white/12 bg-white/8 p-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-300">Decision needed</p>
                  <p className="mt-2 text-sm font-semibold text-white">Launch copy review</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-200/80">
                {["QuotePilot", "ReserveFlow", "CommerceKit", "EventPass"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/8 px-3 py-1.5">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 flex w-[18rem] -translate-x-1/2 items-center justify-between gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-200/80">
            {["Files", "Messages", "Milestones", "Handoff"].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-sky-300" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
