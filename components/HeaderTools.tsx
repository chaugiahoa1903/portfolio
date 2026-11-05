"use client";
import { useEffect, useState } from "react";

/** Nút mở command palette và nút đổi theme (hiệu ứng vòng tròn loang từ chỗ bấm). */
export default function HeaderTools() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => { setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark"); }, []);

  const flip = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch {}
      setTheme(next);
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) { apply(); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = doc.startViewTransition(apply);
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
      );
    }).catch(() => {});
  };

  return (
    <div className="hdr-tools">
      <button type="button" className="tool-btn" onClick={() => window.dispatchEvent(new Event("cmdk:open"))} aria-label="Open command palette">
        <span aria-hidden>&gt;_</span><span className="kbd-label"><kbd>Ctrl K</kbd></span>
      </button>
      <button type="button" className="tool-btn" data-theme-toggle onClick={flip} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
        <span aria-hidden>{theme === "dark" ? "☀" : "☾"}</span>
      </button>
    </div>
  );
}
