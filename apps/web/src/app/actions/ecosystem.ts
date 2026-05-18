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
    text(payload.projectType) ||
    text(payload.serviceName) ||
    text(payload.quoteTitle) ||
    `Projet ${customerName}`;
  const quoteNumber = text(payload.quoteNumber) || undefined;
  const quoteTotalCents = numberValue(payload.quoteTotalCents) ?? numberValue(payload.quoteTotal) ?? numberValue(payload.totalCents);
  const consultantName = text(payload.consultantName) || undefined;
  const bookingNotes = text(payload.bookingNotes) || text(payload.notes) || undefined;
  const slug = `ecosystem-${event.flowId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48) || event.id.slice(0, 10)}`;

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
        customerEmail,
        customerPhone: text(payload.phone),
        projectType: text(payload.projectType),
        budgetRange: text(payload.budgetRange),
        originalMessage: text(payload.originalMessage),
        bookingStartAt: text(payload.startAt),
        bookingEndAt: text(payload.endAt),
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
        customerEmail,
        customerPhone: text(payload.phone),
        projectType: text(payload.projectType),
        budgetRange: text(payload.budgetRange),
        originalMessage: text(payload.originalMessage),
        bookingStartAt: text(payload.startAt),
        bookingEndAt: text(payload.endAt),
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

  const sharedPayload = {
    projectId: project.id,
    projectName: project.name,
    clientHubProjectId: project.id,
    clientHubProjectSlug: project.slug,
    customerName,
    customerEmail,
    phone: text(payload.phone) || undefined,
    projectType: text(payload.projectType) || project.name,
    budgetRange: text(payload.budgetRange) || undefined,
    originalMessage: text(payload.originalMessage) || event.description,
    quoteId: text(payload.quoteId) || undefined,
    quoteNumber,
    quoteTotal: quoteTotalCents,
    quoteTotalCents,
    consultantName,
    bookingId: text(payload.bookingId) || event.entityId,
    serviceName: text(payload.serviceName) || undefined,
    startAt: text(payload.startAt) || undefined,
    endAt: text(payload.endAt) || undefined,
    notes: bookingNotes,
    sourceApp: event.sourceApp,
    sourceEventId: event.id,
    flowId: event.flowId,
  };

  await publishEcosystemEvent({
    flowId: event.flowId,
    sourceApp: "clienthub",
    targetApp: "api-meter",
    eventType: "project.created",
    entityType: "project",
    entityId: project.id,
    customerName,
    customerEmail,
    title: "Projet ClientHub cree depuis le parcours reel",
    description: `${customerName} est maintenant centralise dans ClientHub pour ${project.name}.`,
    payload: sharedPayload,
    priority: "NORMAL",
    actionLabel: "Voir le projet",
    actionUrl: `/dashboard/projects/${project.slug}`,
  });

  const intentDefinitions = [
    {
      eventType: "commerce.intent.created",
      targetApp: "commercekit",
      title: "Commande prete a creer depuis ClientHub",
      description: `${project.name} est pret a devenir une commande CommerceKit.`,
      actionLabel: "Creer la commande",
      actionUrl: "/dashboard",
      url: process.env.COMMERCEKIT_INGEST_URL ?? "https://commercekit.vercel.app/api/ecosystem/ingest",
    },
    {
      eventType: "event.intent.created",
      targetApp: "eventpass",
      title: "Atelier recommande depuis ClientHub",
      description: `${project.name} peut etre transforme en atelier EventPass.`,
      actionLabel: "Creer inscription et billet",
      actionUrl: "/dashboard",
      url: process.env.EVENTPASS_INGEST_URL ?? "https://eventpass-nine.vercel.app/api/ecosystem/ingest",
    },
    {
      eventType: "support.context.created",
      targetApp: "supportdesk-lite",
      title: "Contexte support prepare depuis ClientHub",
      description: `${project.name} est pret pour un suivi SupportDesk Lite.`,
      actionLabel: "Creer un ticket de suivi",
      actionUrl: "/dashboard",
      url: process.env.SUPPORTDESK_INGEST_URL ?? "https://supportdesk-lite-jet.vercel.app/api/ecosystem/ingest",
    },
  ];

  const createdIntents = await Promise.all(intentDefinitions.map((intent) =>
    publishEcosystemEvent({
      flowId: event.flowId,
      sourceApp: "clienthub",
      targetApp: intent.targetApp,
      eventType: intent.eventType,
      entityType: "project",
      entityId: project.id,
      customerName,
      customerEmail,
      title: intent.title,
      description: intent.description,
      payload: sharedPayload,
      priority: "HIGH",
      actionLabel: intent.actionLabel,
      actionUrl: intent.actionUrl,
    }),
  ));

  await Promise.all(intentDefinitions.map((intent, index) =>
    sendEcosystemHandoff(intent.url, {
      flowId: event.flowId,
      sourceApp: "clienthub",
      targetApp: intent.targetApp,
      eventType: intent.eventType,
      entityType: "project",
      entityId: project.id,
      customerName,
      customerEmail,
      title: intent.title,
      description: intent.description,
      payload: sharedPayload,
      priority: "HIGH",
      actionLabel: intent.actionLabel,
      actionUrl: intent.actionUrl,
      sourceEventId: createdIntents[index]?.id,
    }),
  ));

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
    payload: sharedPayload,
    priority: "NORMAL",
  };

  await sendEcosystemHandoff(process.env.API_METER_INGEST_URL ?? "https://api-meter.vercel.app/api/ecosystem/ingest", downstreamEvent);

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
