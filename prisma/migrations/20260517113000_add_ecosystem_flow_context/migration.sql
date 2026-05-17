alter table if exists public."ClientHubProject"
  add column if not exists "flowId" text,
  add column if not exists "sourceApp" text,
  add column if not exists "sourceEventId" text,
  add column if not exists "quoteNumber" text,
  add column if not exists "quoteTotalCents" integer,
  add column if not exists "consultantName" text,
  add column if not exists "bookingNotes" text,
  add column if not exists "contextJson" jsonb;

create index if not exists "ClientHubProject_flowId_idx" on public."ClientHubProject"("flowId");
