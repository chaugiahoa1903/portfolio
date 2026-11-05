import { site } from "@/content/site";

export function Footer() {
  const { links } = site;
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© {new Date().getFullYear()} {site.name} · {site.location}</span>
        <span className="foot-links">
          <a href={`mailto:${links.email}`}>Email</a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </span>
      </div>
    </footer>
  );
}
