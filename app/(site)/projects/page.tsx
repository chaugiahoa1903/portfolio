import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = { title: "Gallery" };

export default function Projects() {
  return (
    <section className="wrap section">
      <Link href="/" className="back">← Back to home</Link>
      <h1 className="h-page">Gallery</h1>
      <p className="lead">Every project, paper and competition, newest work first where dates are known.</p>
      <div className="grid">
        {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </section>
  );
}
