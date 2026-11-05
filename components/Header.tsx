import Link from "next/link";
import { site } from "@/content/site";
import HeaderTools from "@/components/HeaderTools";

export function Header() {
  return (
    <header className="header">
      <div className="wrap header-in">
        <Link href="/" className="brand" aria-label={site.name}>
          <span className="logo" aria-hidden="true"><img src="/mascot.png" alt="" width={28} height={28} /></span>
          <span>{site.shortName}</span>
        </Link>
        <HeaderTools />
        <nav aria-label="Main">
          <Link href="/#about">About</Link>
          <Link href="/#skills">Skills</Link>
          <Link href="/#experience">Journey</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/#research">Research</Link>
          <Link href="/#awards">Awards</Link>
        </nav>
      </div>
    </header>
  );
}
