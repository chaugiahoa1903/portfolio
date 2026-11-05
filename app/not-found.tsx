import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap section">
      <h1 className="h-page">Page not found</h1>
      <p className="lead">That page does not exist. <Link href="/">Back to the homepage</Link>.</p>
    </section>
  );
}
