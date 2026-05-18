"use client";

import dynamic from "next/dynamic";

import { ClientHubSceneFallback } from "./ClientHubSceneFallback";
import { ThreeSceneShell } from "./ThreeSceneShell";

const ClientHubSceneCanvas = dynamic(() => import("./ClientHubSceneCanvas"), {
  ssr: false,
  loading: () => <ClientHubSceneFallback />,
});

export function ClientHubScene() {
  return (
    <ThreeSceneShell
      label="ClientHub premium client workspace"
      fallback={<ClientHubSceneFallback />}
      className="h-[420px] sm:h-[460px] lg:h-[520px]"
    >
      <ClientHubSceneCanvas />
    </ThreeSceneShell>
  );
}
