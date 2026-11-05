"use client";
import { useState } from "react";
import { credentials } from "@/content/credentials";
import { CredentialCard } from "@/components/CredentialCard";

const filters = ["All", "Certificate", "Award"] as const;
type Filter = (typeof filters)[number];
const label: Record<Filter, string> = { All: "All", Certificate: "Certificates", Award: "Awards" };

export default function CredentialsBrowser() {
  const [view, setView] = useState<"gallery" | "list">("gallery");
  const [filter, setFilter] = useState<Filter>("All");
  const shown = credentials.filter((c) => filter === "All" || c.kind === filter);

  return (
    <>
      <div className="toolbar">
        <div className="seg" role="group" aria-label="View">
          <button type="button" aria-pressed={view === "gallery"} onClick={() => setView("gallery")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
            Gallery
          </button>
          <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
            List
          </button>
        </div>
        <div className="seg" role="group" aria-label="Filter">
          {filters.map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{label[f]}</button>
          ))}
        </div>
      </div>
      <div className={view === "gallery" ? "cred-grid" : "cred-list"}>
        {shown.map((c) => <CredentialCard key={c.slug} c={c} view={view} />)}
      </div>
    </>
  );
}
