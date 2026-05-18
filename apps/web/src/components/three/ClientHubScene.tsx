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
    <ThreeSceneShell label="ClientHub 3D command center" fallback={<ClientHubSceneFallback />}>
      <ClientHubSceneCanvas />
    </ThreeSceneShell>
  );
}
