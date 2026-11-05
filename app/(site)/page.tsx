import Link from "next/link";
import { site, about, skills, journey } from "@/content/site";
import Timeline from "@/components/Timeline";
import ScrambleText from "@/components/ScrambleText";
import Typewriter from "@/components/Typewriter";
import PixelPhoto from "@/components/PixelPhoto";
import { credentials } from "@/content/credentials";
import { CredentialCard } from "@/components/CredentialCard";
import { projects } from "@/content/projects";
import { papers } from "@/content/research";
import { ProjectCard } from "@/components/ProjectCard";
import { Text, isTodo } from "@/components/Text";
import NeuralBackground from "@/components/NeuralBackground";


const Ic = {
  folder: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>,
  github: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" /></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
  linkedin: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.05c.53-1 1.82-1.85 3.75-1.85 4 0 4.75 2.5 4.75 5.75v5.6h-4v-5c0-1.2 0-2.75-1.7-2.75s-1.95 1.3-1.95 2.65v5.1h-4z" /></svg>,
  pin: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>,
};

export default function Home() {
  const { links } = site;
  return (
    <>
      <NeuralBackground />
      <section className="hero wrap hero-grid">
        <div className="hero-text">
          <p className="eyebrow">{site.name} · {site.location}</p>
          <h1><ScrambleText text={site.headline} /></h1>
          <div className="panel hero-note">
            <p className="term"><span className="pr">$</span>focus --now <Typewriter words={["Vietnamese NLP", "credit-risk analytics", "model serving", "decision-support prototypes"]} /></p>
            <p className="lead">{site.intro}</p>
            <p className="open">{site.openTo}</p>
          </div>
          <div className="cta">
            <Link href="/#projects" className="btn btn-primary">{Ic.folder} See the projects</Link>
            {links.resume && <a href={links.resume} className="btn">Résumé (PDF)</a>}
            <a href={links.github} className="btn" target="_blank" rel="noopener noreferrer">{Ic.github} GitHub</a>
          </div>
        </div>
        <div className="hero-side">
        <PixelPhoto src="/me.jpg" alt={`${site.name} at the FWD Springboard Challenge graduation ceremony`} width={880} height={1100} />
          <ul className="hero-contact" aria-label="Contact">
            <li><a href={`mailto:${links.email}`}>{Ic.mail}<span>{links.email}</span></a></li>
            <li><a href={links.linkedin} target="_blank" rel="noopener noreferrer">{Ic.linkedin}<span>LinkedIn</span></a></li>
            <li><a href={links.github} target="_blank" rel="noopener noreferrer">{Ic.github}<span>GitHub</span></a></li>
            <li><span className="hc-plain">{Ic.pin}<span>{site.location}</span></span></li>
          </ul>
        </div>
      </section>

      <section id="about" className="wrap section">
        <div className="panel about">
          <h2 className="h-sec">About me</h2>
          <p className="about-intro"><Text>{about.intro}</Text></p>
          <div className="about-grid">
            <div>
              <h3>Education</h3>
              <p><Text>{about.education}</Text></p>
              <h3>Career goals</h3>
              <p><Text>{about.goals}</Text></p>
            </div>
            <div>
              <h3>Strengths</h3>
              <ul className="strengths">{about.strengths.map((t) => <li key={t}><Text>{t}</Text></li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="wrap section">
        <h2 className="h-sec">Skills</h2>
        <p className="lead-sm">A practical view of what I have used in projects and where it shows up.</p>
        <div className="skill-grid">
          {skills.map((g) => (
            <article key={g.group} className="skill-card">
              <h3>{g.group}</h3>
              <p className="sk-blurb">{g.blurb}</p>
              <h4>Used tools and methods</h4>
              <div className="sk-tools">{g.tools.map((t) => <span key={t} className="sk-chip">{t}</span>)}</div>
              <h4>Where it appears</h4>
              <ul className="sk-where">
                {g.where.map((w) => (
                  <li key={w.text}>{w.href ? <Link href={w.href}>{w.text}</Link> : w.text}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="wrap section">
        <h2 className="h-sec">Education &amp; experience</h2>
        <Timeline items={journey} />
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

      <section id="awards" className="wrap section">
        <h2 className="h-sec">Certificates &amp; awards</h2>
        <p className="sec-sub">Competitions and conferences from 2026.</p>
        <div className="cred-grid">
          {credentials.map((c) => <CredentialCard key={c.slug} c={c} />)}
        </div>
        <div className="center">
          <Link href="/certificates" className="btn btn-primary">See all certificates &amp; awards</Link>
        </div>
      </section>
    </>
  );
}
