import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { papers, getPaper } from "@/content/research";
import { CaseStudy } from "@/components/CaseStudy";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => papers.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPaper((await params).slug);
  if (!p) return {};
  return { title: p.shortTitle ?? p.title, description: p.kicker, openGraph: { title: p.title, description: p.kicker, images: [p.cover] } };
}

export default async function PaperPage({ params }: Props) {
  const p = getPaper((await params).slug);
  if (!p) notFound();
  const n = papers[(papers.indexOf(p) + 1) % papers.length];
  return <CaseStudy p={p} kind="paper" backHref="/research" backLabel="Back to papers & research" next={{ href: `/research/${n.slug}`, title: n.shortTitle ?? n.title }} />;
}
