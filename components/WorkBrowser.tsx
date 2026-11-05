"use client";
import { useState } from "react";
import type { Project } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export type WorkItem = { p: Project; base: "projects" | "research" };

const groupOf = (c: Project["category"]) =>
  c === "Hackathon" ? "Competitions" : c === "Publication" ? "Publications" : c === "Thesis" ? "Research" : "Projects";

const order = ["All", "Projects", "Publications", "Research", "Competitions"] as const;
type Filter = (typeof order)[number];

export default function WorkBrowser({ items }: { items: WorkItem[] }) {
  const [view, setView] = useState<"gallery" | "list">("gallery");
  const [filter, setFilter] = useState<Filter>("All");
  const shown = items.filter((it) => filter === "All" || groupOf(it.p.category) === filter);
  const available = order.filter((f) => f === "All" || items.some((it) => groupOf(it.p.category) === f));

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
      </div>
      <div className="chips" role="group" aria-label="Filter">
        {available.map((f) => (
          <button key={f} type="button" className="chipbtn" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className={view === "gallery" ? "grid" : "card-rows"}>
        {shown.map((it) => <ProjectCard key={`${it.base}-${it.p.slug}`} p={it.p} base={it.base} view={view} />)}
      </div>
    </>
  );
}
