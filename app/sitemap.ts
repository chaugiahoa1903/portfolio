import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { papers } from "@/content/research";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/certificates`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/research`, changeFrequency: "monthly", priority: 0.8 },
    ...papers.map((p) => ({ url: `${site.url}/research/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
