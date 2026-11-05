import Link from "next/link";
import type { Credential } from "@/content/credentials";

export function CredentialCard({ c, view = "gallery" }: { c: Credential; view?: "gallery" | "list" }) {
  return (
    <article className={`cred cred-${view}`}>
      <a className="cred-img" href={c.image} target="_blank" rel="noopener noreferrer" aria-label={`Open the image: ${c.title}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.image} alt={c.title} width={1372} height={1043} loading="lazy" />
        <span className="cred-shade" aria-hidden />
        <span className={`cred-badge cred-kind kind-${c.kind.toLowerCase()}`}>{c.kind}</span>
        <span className="cred-badge cred-year">{c.year}</span>
      </a>
      <div className="cred-body">
        <h3 className="cred-title">{c.title}</h3>
        <p className="cred-sub">{c.subtitle}</p>
        <p className="cred-issuer"><strong>Issuer:</strong> {c.issuer}</p>
        <p className="cred-desc">{c.description}</p>
        <div className="tags">{c.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
        <Link href={c.href} className="cred-more">{c.hrefLabel} <span aria-hidden>→</span></Link>
      </div>
    </article>
  );
}
