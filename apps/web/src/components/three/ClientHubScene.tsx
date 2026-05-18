import Image from "next/image";

const desktopImage = "/images/hero/clienthub-hero-3d.svg";
const mobileImage = "/images/hero/clienthub-hero-3d-mobile.svg";

export function ClientHubScene() {
  return (
    <div className="clienthub-hero-image group relative h-[420px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1624] shadow-2xl shadow-slate-950/25 sm:h-[460px] lg:h-[520px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(125,211,252,0.18),transparent_18rem),radial-gradient(circle_at_84%_24%,rgba(148,163,184,0.2),transparent_22rem),linear-gradient(150deg,#0b1220,#132033_52%,#0c1424)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />

      <div className="absolute inset-0 hidden md:block">
        <Image
          src={desktopImage}
          alt=""
          fill
          priority
          unoptimized
          aria-hidden="true"
          sizes="(max-width: 1279px) 48vw, 42rem"
          className="object-contain object-center p-5 transition-transform duration-700 ease-out motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:scale-[1.012]"
        />
      </div>

      <div className="absolute inset-0 md:hidden">
        <Image
          src={mobileImage}
          alt=""
          fill
          priority
          unoptimized
          aria-hidden="true"
          sizes="100vw"
          className="object-contain object-center p-4 transition-transform duration-700 ease-out motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:scale-[1.01]"
        />
      </div>

      <div className="absolute inset-y-0 left-[-30%] w-[40%] bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.1),transparent)] opacity-30 mix-blend-screen transition-transform duration-1000 ease-out motion-reduce:hidden motion-safe:group-hover:translate-x-[210%]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#09101c] via-[#09101c]/55 to-transparent" />
    </div>
  );
}
