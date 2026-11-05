import Link from "next/link";
import type { Project } from "@/content/projects";
import { Text, isTodo } from "@/components/Text";
import { Icon, iconFor } from "@/components/Icon";

type Props = {
  p: Project;
  kind: "project" | "paper";
  backHref: string;
  backLabel: string;
  next: { href: string; title: string };
};

function Authors({ names }: { names: string[] }) {
  return (
    <>
      {names.map((n, i) => (
        <span key={n}>
          {n.startsWith("Gia Hoa") ? <strong>{n}</strong> : n}
          {i < names.length - 1 ? ", " : ""}
        </span>
      ))}
    </>
  );
}

export function CaseStudy({ p, kind, backHref, backLabel, next }: Props) {
  const paper = kind === "paper";
  const hasLearn = Boolean(p.learnings || p.next);
  const statusClass = p.status.replace(" ", "-").toLowerCase();

  return (
    <article>
      <section className="chero">
        <div className="wrap chero-in">
          <div className="chero-text">
            <Link href={backHref} className="back">← {backLabel}</Link>
            <div className="pills">
              <span className="pill pill-solid">{paper ? "Paper" : p.category}</span>
              <span className="pill">{p.status}</span>
              <span className="pill">{p.year}</span>
            </div>
            <h1 className={paper ? "h1-long" : undefined}>{p.title}</h1>
            <p className="chero-sub">{p.kicker}</p>
            <p className="chero-desc"><Text>{p.summary}</Text></p>
            <div className="pills">
              {p.stack.map((t) => <span key={t} className="pill">{t}</span>)}
            </div>
            {p.links.length > 0 && (
              <div className="cta">
                {p.links.map((l) => {
                  const inner = (<><Icon name={iconFor(l.label)} />{l.label}</>);
                  if (isTodo(l.href)) return <span key={l.label} className="hbtn hbtn-off"><Text>{l.href.startsWith("[[") ? l.href : `[[${l.label}: add link]]`}</Text></span>;
                  return l.href.startsWith("/")
                    ? <Link key={l.label} href={l.href} className="hbtn">{inner}</Link>
                    : <a key={l.label} href={l.href} className="hbtn" target="_blank" rel="noopener noreferrer">{inner}</a>;
                })}
              </div>
            )}
          </div>
          <div className="chero-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.cover} alt={`${paper ? "Key result of" : "Preview of"} ${p.shortTitle ?? p.title}`} width={1600} height={900} />
          </div>
        </div>
      </section>

      <div className="wrap case">
        <dl className="strip">
          <div><dt>Timeline</dt><dd>{p.period}</dd></div>
          <div><dt>Type</dt><dd>{p.type}</dd></div>
          <div><dt>Status</dt><dd><span className={`chip chip-${statusClass}`}>{p.status}</span></dd></div>
          {p.venue && <div className="strip-wide"><dt>Venue</dt><dd className="dd-text">{p.venue}</dd></div>}
          {p.authors && (
            <div className="strip-wide">
              <dt>Authors</dt>
              <dd className="dd-text"><Authors names={p.authors} />{p.authorsNote && <span className="dd-note">{p.authorsNote}</span>}</dd>
            </div>
          )}
        </dl>

        <div className="body">
          <section className="panel cs" aria-label="Case study">
            <h2 className="cs-title">Case study</h2>
            <div className="cs-grid">
              <div>
                <h3 className="cs-h"><span className="n">1</span>Context / Problem</h3>
                {p.problem.map((t, k) => <p key={k}><Text>{t}</Text></p>)}

                <h3 className="cs-h"><span className="n">2</span>My role</h3>
                <p><Text>{p.role}</Text></p>

                <h3 className="cs-h"><span className="n">3</span>Approach</h3>
                <ul>{p.approach.map((t, k) => <li key={k}><Text>{t}</Text></li>)}</ul>
              </div>
              <div>
                <h3 className="cs-h"><span className="n">4</span>Result / Impact</h3>
                {p.highlights && (
                  <div className="stats">
                    {p.highlights.map((h) => (
                      <div key={h.label}><div className="stat-v">{h.value}</div><div className="stat-l">{h.label}</div></div>
                    ))}
                  </div>
                )}
                <ul>{p.results.map((t, k) => <li key={k}><Text>{t}</Text></li>)}</ul>

                {hasLearn && (
                  <>
                    <h3 className="cs-h"><span className="n">5</span>Learnings</h3>
                    {p.learnings && <ul>{p.learnings.map((t, k) => <li key={k}><Text>{t}</Text></li>)}</ul>}
                    {p.next && (<><h4 className="cs-sub">What&apos;s next</h4><ul>{p.next.map((t, k) => <li key={k}>{t}</li>)}</ul></>)}
                  </>
                )}

                <h3 className="cs-h"><span className="n">{hasLearn ? 6 : 5}</span>Links</h3>
                {p.links.length ? (
                  <ul className="cs-links">
                    {p.links.map((l) => (
                      <li key={l.label}>
                        {isTodo(l.href)
                          ? <Text>{l.href.startsWith("[[") ? `${l.label}: ${l.href}` : `[[${l.label}: add link]]`}</Text>
                          : l.href.startsWith("/")
                            ? <Link href={l.href}>{l.label} →</Link>
                            : <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>}
                      </li>
                    ))}
                  </ul>
                ) : <p>No public links yet.</p>}
              </div>
            </div>
          </section>

          {p.figures?.map((f) => (
            <figure className="fig" key={f.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.caption} width={f.width} height={f.height} loading="lazy" />
              <figcaption>{f.caption}</figcaption>
            </figure>
          ))}

          {p.certificate && (
            <figure className="cert">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.certificate.src} alt={p.certificate.caption} width={1372} height={1043} loading="lazy" />
              <figcaption>{p.certificate.caption}</figcaption>
            </figure>
          )}
        </div>

        <Link href={next.href} className="nextp">
          <span>Next</span>
          <strong>{next.title} →</strong>
        </Link>
      </div>
    </article>
  );
}
