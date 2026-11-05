import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { CaseStudy } from "@/components/CaseStudy";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return { title: p.title, description: p.kicker, openGraph: { title: p.title, description: p.kicker, images: [p.cover] } };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const n = projects[(projects.indexOf(p) + 1) % projects.length];
  return <CaseStudy p={p} kind="project" backHref="/projects" backLabel="Back to projects" next={{ href: `/projects/${n.slug}`, title: n.title }} />;
}
