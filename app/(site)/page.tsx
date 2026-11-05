import Link from "next/link";
import { site, about, skills, education, experience, awards, certificates } from "@/content/site";
import { projects } from "@/content/projects";
import { papers } from "@/content/research";
import { ProjectCard } from "@/components/ProjectCard";
import { Text, isTodo } from "@/components/Text";
import NeuralBackground from "@/components/NeuralBackground";

const pretty = (v: string) => {
  const t = v.replace(/^https?:\/\/(www\.)?/, "");
  try { return decodeURIComponent(t); } catch { return t; }
};

function Contact({ label, value, href }: { label: string; value: string; href?: string }) {
  return isTodo(value) ? (
    <li><span className="c-label">{label}</span><span><Text>{value}</Text></span></li>
  ) : (
    <li><span className="c-label">{label}</span><a href={href ?? value}>{pretty(value)}</a></li>
  );
}

export default function Home() {
  const { links } = site;
  return (
    <>
      <NeuralBackground />
      <section className="hero wrap hero-grid">
        <div className="hero-text">
          <p className="eyebrow">{site.name} · {site.location}</p>
          <h1>{site.headline}</h1>
          <p className="lead">{site.intro}</p>
          <p className="open">{site.openTo}</p>
          <div className="cta">
            <Link href="/#projects" className="btn btn-primary">See the projects</Link>
            {links.resume && <a href={links.resume} className="btn">Résumé (PDF)</a>}
            <a href={links.github} className="btn" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
        <figure className="hero-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/me.jpg" alt={`${site.name} at the FWD Springboard Challenge graduation ceremony`} width={880} height={1100} />
        </figure>
      </section>

      <section id="projects" className="wrap section">
        <h2 className="h-sec">Selected projects</h2>
        <p className="sec-sub">A focused selection. The full gallery has every project, paper and competition.</p>
        <div className="grid">
          {projects.filter((p) => p.featured).map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
        <div className="center">
          <Link href="/projects" className="btn btn-primary">Explore full gallery</Link>
        </div>
      </section>

      <section id="research" className="wrap section">
        <h2 className="h-sec">Papers &amp; research</h2>
        <p className="sec-sub">Conference papers I co-authored and presented in 2026.</p>
        <div className="grid grid-2">
          {papers.map((p) => <ProjectCard key={p.slug} p={p} base="research" />)}
        </div>
      </section>

      <section id="about" className="wrap section two">
        <h2 className="h-sec">About</h2>
        <div className="prose">
          {about.paragraphs.map((t, i) => <p key={i}><Text>{t}</Text></p>)}
        </div>
      </section>

      <section id="skills" className="wrap section two">
        <h2 className="h-sec">Skills</h2>
        <div className="skills">
          {skills.map((g) => (
            <div key={g.group}>
              <h3>{g.group}</h3>
              <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap section two">
        <h2 className="h-sec">Experience & education</h2>
        <div className="timeline">
          {experience.map((e) => (
            <article key={e.title}>
              <div className="t-when">{e.when}</div>
              <div>
                <h3>{e.title}</h3>
                <div className="t-org">{e.org}</div>
                <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              </div>
            </article>
          ))}
          {education.map((e) => (
            <article key={e.title}>
              <div className="t-when">{e.when}</div>
              <div>
                <h3>{e.title}</h3>
                <div className="t-org">{e.org}</div>
                <p className="t-note">{e.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="awards" className="wrap section two">
        <h2 className="h-sec">Certificates &amp; awards</h2>
        <div>
          <div className="timeline">
            {awards.map((a) => (
              <article key={a.title}>
                <div className="t-when">{a.when}</div>
                <div>
                  <h3>{a.href ? <Link href={a.href}>{a.title}</Link> : a.title}</h3>
                  <div className="t-org">{a.org}</div>
                </div>
              </article>
            ))}
          </div>
          <div className="certs">
            {certificates.map((c) => (
              <figure key={c.src}>
                <a href={c.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${c.title}, ${c.org}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} alt={`${c.title}: ${c.org}`} width={1372} height={1043} loading="lazy" />
                </a>
                <figcaption>
                  <strong>{c.title}</strong>
                  <span>{c.org}</span>
                  <span>{c.when}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="wrap section two">
        <h2 className="h-sec">Contact</h2>
        <div>
          <p className="prose-p">Happy to talk about internships, projects or research.</p>
          <ul className="contacts">
            <Contact label="Email" value={links.email} href={`mailto:${links.email}`} />
            <Contact label="LinkedIn" value={links.linkedin} />
            <Contact label="GitHub" value={links.github} />
          </ul>
        </div>
      </section>
    </>
  );
}
