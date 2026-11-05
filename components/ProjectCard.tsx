import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ p, base = "projects" }: { p: Project; base?: "projects" | "research" }) {
  const label = base === "research" ? "Read the summary" : "View case study";
  return (
    <Link href={`/${base}/${p.slug}`} className="card">
      <span className="card-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.cover} alt={`${p.shortTitle ?? p.title} cover`} width={1600} height={900} loading="lazy" />
      </span>
      <span className="card-body">
        {base === "projects" && <span className="card-cat">{p.category}</span>}
        <span className="card-title">{p.shortTitle ?? p.title}</span>
        <span className="card-kicker">{p.kicker}</span>
        {base === "research" && <span className="card-venue">{p.period}</span>}
        <span className="card-more">{label} <span aria-hidden>→</span></span>
      </span>
    </Link>
  );
}
