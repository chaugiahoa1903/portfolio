import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Fx from "@/components/Fx";
import CommandPalette from "@/components/CommandPalette";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <a href="#main" className="skip">Skip to content</a>
      <Fx />
      <CommandPalette />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
