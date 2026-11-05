import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource/press-start-2p";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.shortName}` },
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: "website", siteName: site.name, images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} portfolio` }] },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
