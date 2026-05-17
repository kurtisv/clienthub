export const projects = [
  {
    id: "ch-project-001",
    slug: "northline-rebrand",
    name: "Northline Rebrand Portal",
    client: "Northline Studio",
    status: "IN_REVIEW",
    progress: 78,
    budgetCents: 1840000,
    nextStep: "Brand system approval",
    dueDate: "2026-06-04",
    accent: "#273c57",
    milestones: [
      { title: "Discovery", status: "DONE" },
      { title: "Design system", status: "IN_REVIEW" },
      { title: "Website build", status: "ACTIVE" },
      { title: "Launch", status: "UPCOMING" },
    ],
    files: ["Brand direction.pdf", "Homepage wireframe.fig", "Launch checklist.md"],
    messages: [
      { author: "Kurtis", body: "Homepage direction is ready for review." },
      { author: "Client", body: "The calmer version feels closer to the brand." },
    ],
  },
  {
    id: "ch-project-002",
    slug: "milo-commerce",
    name: "Milo Commerce Rollout",
    client: "Milo Goods",
    status: "ACTIVE",
    progress: 54,
    budgetCents: 1260000,
    nextStep: "Checkout QA",
    dueDate: "2026-06-18",
    accent: "#b95738",
    milestones: [
      { title: "Catalog setup", status: "DONE" },
      { title: "Checkout flow", status: "ACTIVE" },
      { title: "Email receipts", status: "UPCOMING" },
      { title: "Fulfillment handoff", status: "UPCOMING" },
    ],
    files: ["Product import.csv", "Checkout notes.md", "QA report.xlsx"],
    messages: [
      { author: "Kurtis", body: "Tax and shipping logic is now visible in the demo." },
      { author: "Client", body: "Please keep the checkout simple for the first release." },
    ],
  },
];

export const portalStats = [
  { label: "Active projects", value: "2" },
  { label: "Milestones tracked", value: "8" },
  { label: "Shared files", value: "6" },
  { label: "Client messages", value: "4" },
];

export type ClientHubProject = (typeof projects)[number];
