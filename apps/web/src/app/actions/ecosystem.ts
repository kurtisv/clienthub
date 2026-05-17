"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { Prisma } from "@/generated/prisma";

import { prisma } from "@/lib/db";
import { linkEcosystemEntities, publishEcosystemEvent } from "@/lib/ecosystem";
import { requireDashboardAccess } from "@/lib/dashboard-auth";

function payloadOf(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function numberValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export async function createProjectFromEcosystemEvent(formData: FormData) {
  await requireDashboardAccess();

  const eventId = String(formData.get("eventId") ?? "").trim();
  if (!eventId) return;

  const event = await prisma.ecosystemEvent.findUnique({ where: { id: eventId } });
  if (!event) return;

  const payload = payloadOf(event.payload);
  const customerName = event.customerName || text(payload.customerName) || text(payload.name) || "Nom recu du formulaire";
  const customerEmail = event.customerEmail || text(payload.customerEmail) || undefined;
  const projectName =
    text(payload.projectName) ||
    text(payload.serviceName) ||
    text(payload.quoteTitle) ||
    `Projet ${customerName}`;
  const quoteNumber = text(payload.quoteNumber) || undefined;
  const quoteTotalCents = numberValue(payload.quoteTotalCents) ?? numberValue(payload.totalCents);
  const consultantName = text(payload.consultantName) || undefined;
  const bookingNotes = text(payload.bookingNotes) || text(payload.notes) || undefined;
  const slug = `ecosystem-${event.id.slice(0, 10)}`;

  const project = await prisma.clientHubProject.upsert({
    where: { slug },
    update: {
      name: projectName,
      clientName: customerName,
      budgetCents: quoteTotalCents,
      quoteTotalCents,
      quoteNumber,
      consultantName,
      bookingNotes,
      contextJson: {
        sourceEvent: event,
        payload,
      } as Prisma.InputJsonValue,
    },
    create: {
      slug,
      name: projectName,
      clientName: customerName,
      status: "ACTIVE",
      progress: event.eventType === "booking.created" ? 35 : 25,
      budgetCents: quoteTotalCents,
      nextStep: "Transformer le contexte client en commande, billet ou suivi support",
      accent: "#2563eb",
      flowId: event.flowId,
      sourceApp: event.sourceApp,
      sourceEventId: event.id,
      quoteNumber,
      quoteTotalCents,
      consultantName,
      bookingNotes,
      contextJson: {
        sourceEvent: event,
        payload,
      } as Prisma.InputJsonValue,
      milestones: {
        create: [
          {
            title: event.eventType === "booking.created" ? "Rendez-vous ReserveFlow recu" : "Contexte ecosysteme recu",
            status: "done",
          },
          {
            title: "Projet ClientHub centralise",
            status: "current",
          },
          {
            title: "Commande, billet ou support a connecter",
            status: "upcoming",
          },
        ],
      },
      messages: {
        create: {
          author: "Ecosystem",
          body: `${event.title}${event.description ? ` - ${event.description}` : ""}`,
        },
      },
    },
  });

  await linkEcosystemEntities({
    flowId: event.flowId,
    fromApp: event.sourceApp,
    fromEntityType: event.entityType,
    fromEntityId: event.entityId ?? event.id,
    toApp: "clienthub",
    toEntityType: "project",
    toEntityId: project.id,
  });

  await publishEcosystemEvent({
    flowId: event.flowId,
    sourceApp: "clienthub",
    targetApps: ["commercekit", "eventpass", "supportdesk-lite", "api-meter"],
    eventType: "project.created",
    entityType: "project",
    entityId: project.id,
    customerName,
    customerEmail,
    title: "Projet ClientHub cree depuis le parcours reel",
    description: `${customerName} est maintenant centralise dans ClientHub pour ${project.name}.`,
    payload: {
      projectId: project.id,
      projectName: project.name,
      quoteNumber,
      quoteTotalCents,
      consultantName,
      bookingNotes,
      sourceApp: event.sourceApp,
      sourceEventId: event.id,
      flowId: event.flowId,
    },
    priority: "NORMAL",
    actionLabel: "Voir le projet",
    actionUrl: `/dashboard/projects/${project.slug}`,
  });

  const downstreamEvent = {
    flowId: event.flowId,
    sourceApp: "clienthub",
    eventType: "project.created",
    entityType: "project",
    entityId: project.id,
    customerName,
    customerEmail,
    title: "Projet ClientHub cree depuis le parcours reel",
    description: `${customerName} est maintenant centralise dans ClientHub pour ${project.name}.`,
    payload: {
      projectId: project.id,
      projectName: project.name,
      quoteNumber,
      quoteTotalCents,
      consultantName,
      bookingNotes,
      sourceApp: event.sourceApp,
      sourceEventId: event.id,
      flowId: event.flowId,
    },
    priority: "NORMAL",
  };

  await Promise.all([
    sendEcosystemHandoff(process.env.COMMERCEKIT_INGEST_URL ?? "https://commercekit.vercel.app/api/ecosystem/ingest", {
      ...downstreamEvent,
      actionLabel: "Creer la commande CommerceKit",
      actionUrl: "/dashboard",
    }),
    sendEcosystemHandoff(process.env.EVENTPASS_INGEST_URL ?? "https://eventpass-nine.vercel.app/api/ecosystem/ingest", {
      ...downstreamEvent,
      actionLabel: "Creer le billet EventPass",
      actionUrl: "/dashboard",
    }),
    sendEcosystemHandoff(process.env.SUPPORTDESK_INGEST_URL ?? "https://supportdesk-lite-jet.vercel.app/api/ecosystem/ingest", {
      ...downstreamEvent,
      actionLabel: "Creer le ticket SupportDesk",
      actionUrl: "/dashboard",
    }),
    sendEcosystemHandoff(process.env.API_METER_INGEST_URL ?? "https://api-meter.vercel.app/api/ecosystem/ingest", downstreamEvent),
  ]);

  revalidatePath("/dashboard");
  redirect(`/dashboard?projectCreated=${project.id}`);
}

async function sendEcosystemHandoff(url: string, body: Record<string, unknown>) {
  if (!body.flowId) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Ecosystem handoff failed", error);
  }
}
