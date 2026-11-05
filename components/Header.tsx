import Link from "next/link";
import { site } from "@/content/site";

export function Header() {
  return (
    <header className="header">
      <div className="wrap header-in">
        <Link href="/" className="brand">{site.shortName}</Link>
        <nav aria-label="Main">
          <Link href="/#projects">Projects</Link>
          <Link href="/#research">Research</Link>
          <Link href="/#about">About</Link>
          <Link href="/#skills">Skills</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
