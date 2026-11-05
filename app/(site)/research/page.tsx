import type { Metadata } from "next";
import Link from "next/link";
import { papers } from "@/content/research";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = { title: "Papers & Research" };

export default function Research() {
  return (
    <section className="wrap section">
      <Link href="/" className="back">← Back to home</Link>
      <h1 className="h-page">Papers &amp; Research</h1>
      <p className="lead">Conference papers I co-authored and presented. Each page summarises the question, the method and the findings.</p>
      <div className="grid grid-2">
        {papers.map((p) => <ProjectCard key={p.slug} p={p} base="research" />)}
      </div>
    </section>
  );
}
