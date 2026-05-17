export const projects = [
  {
    id: "ch-project-001",
    slug: "studio-moreau-rebrand",
    name: "Studio Moreau Creative Workspace",
    client: "Studio Moreau",
    status: "IN_REVIEW",
    progress: 82,
    budgetCents: 2400000,
    source: "QuotePilot QP-2026-014",
    booking: "ReserveFlow discovery call - 2026-05-23",
    commerceOrder: "CommerceKit CK-2026-0001",
    event: "EventPass Founder Summit",
    support: "SupportDesk onboarding ticket ready",
    nextStep: "Approve final launch checklist",
    dueDate: "2026-06-04",
    accent: "#273c57",
    milestones: [
      { title: "Lead captured in Luma Studio", status: "DONE" },
      { title: "Quote approved in QuotePilot", status: "DONE" },
      { title: "Launch kit purchased", status: "DONE" },
      { title: "Final QA and support handoff", status: "ACTIVE" },
    ],
    files: ["QP-2026-014-approved.pdf", "ReserveFlow-call-notes.md", "CommerceKit-order-CK-2026-0001.pdf", "Launch checklist.md"],
    messages: [
      { author: "Kurtis", body: "The approved quote, booking notes, and launch kit order are now attached to this workspace." },
      { author: "Camille Moreau", body: "The connected view keeps the handoff tied to the original inquiry." },
    ],
  },
  {
    id: "ch-project-002",
    slug: "atelier-portal",
    name: "Atelier Boutique Operations Portal",
    client: "Atelier Boutique",
    status: "ACTIVE",
    progress: 64,
    budgetCents: 1800000,
    source: "QuotePilot QP-2026-019",
    booking: "ReserveFlow workshop - 2026-05-29",
    commerceOrder: "CommerceKit CK-2026-0002",
    event: "EventPass Design Ops Night",
    support: "SupportDesk training follow-up",
    nextStep: "Prepare event materials and fulfillment handoff",
    dueDate: "2026-06-18",
    accent: "#b95738",
    milestones: [
      { title: "Lead qualified", status: "DONE" },
      { title: "Workshop booked", status: "DONE" },
      { title: "Event materials ordered", status: "ACTIVE" },
      { title: "Post-event support", status: "UPCOMING" },
    ],
    files: ["QuotePilot-QP-2026-019.pdf", "EventPass-attendee-list.csv", "CommerceKit-fulfillment.md"],
    messages: [
      { author: "Kurtis", body: "EventPass registration and CommerceKit fulfillment are now visible in the same client workspace." },
      { author: "Elliot Moore", body: "Keep the workshop follow-up and support ticket linked here after the event." },
    ],
  },
];

export const portalStats = [
  { label: "Active projects", value: "2" },
  { label: "Milestones tracked", value: "8" },
  { label: "Shared files", value: "7" },
  { label: "Client messages", value: "4" },
];

export const ecosystemHandoffs = [
  { module: "Luma Studio", signal: "Initial request", owner: "Camille Moreau" },
  { module: "QuotePilot", signal: "Approved proposal", owner: "Studio Moreau" },
  { module: "ReserveFlow", signal: "Discovery and workshop bookings", owner: "Camille Moreau / Elliot Moore" },
  { module: "CommerceKit", signal: "Launch kit and event materials", owner: "Operations" },
  { module: "EventPass", signal: "Founder Summit and Design Ops Night", owner: "Events" },
  { module: "SupportDesk Lite", signal: "Post-delivery follow-up", owner: "Support" },
];

export type ClientHubProject = (typeof projects)[number];
