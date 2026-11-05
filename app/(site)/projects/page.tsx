import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { papers } from "@/content/research";
import WorkBrowser from "@/components/WorkBrowser";

export const metadata: Metadata = { title: "Work & Research" };

export default function Projects() {
  const items = [
    ...projects.map((p) => ({ p, base: "projects" as const })),
    ...papers.map((p) => ({ p, base: "research" as const })),
  ];
  return (
    <section className="wrap section">
      <Link href="/" className="back">← Back to home</Link>
      <h1 className="h-page">Work &amp; Research</h1>
      <p className="lead">Every project, paper and competition. Filter by type, or switch between gallery and list.</p>
      <WorkBrowser items={items} />
    </section>
  );
}
