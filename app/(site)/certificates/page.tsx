import type { Metadata } from "next";
import Link from "next/link";
import CredentialsBrowser from "@/components/CredentialsBrowser";

export const metadata: Metadata = { title: "Certificates & Awards" };

export default function Certificates() {
  return (
    <section className="wrap section">
      <Link href="/" className="back">← Back to home</Link>
      <h1 className="h-page">Certificates &amp; Awards</h1>
      <p className="lead">Awards and certificates from competitions and conferences. Click an image to open it in full size.</p>
      <CredentialsBrowser />
    </section>
  );
}
