"use client";
import { useEffect, useRef, useState } from "react";
import type { Journey } from "@/content/site";
import { Text } from "@/components/Text";

/** Timeline hai bên: đường dọc "vẽ" dần theo thanh cuộn, các thẻ trượt vào khi tới tầm nhìn. */
export default function Timeline({ items }: { items: Journey[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      el.style.setProperty("--p", "1");
      return;
    }
    setAnim(true);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    el.querySelectorAll(".tl-item").forEach((n) => io.observe(n));

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.62 - r.top) / r.height));
      el.style.setProperty("--p", p.toFixed(3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <div ref={root} className={`tl${anim ? " anim" : ""}`}>
      <div className="tl-line" aria-hidden><span className="tl-fill" /></div>
      {items.map((it, i) => (
        <div key={it.title} className={`tl-item ${i % 2 === 0 ? "main-left" : "main-right"}`}>
          <div className="tl-card tl-main">
            <span className="tl-kind">{it.kind}</span>
            <h3>{it.title}</h3>
            <div className="tl-org">{it.org}</div>
            <div className="tl-when">{it.when}</div>
          </div>
          <span className="tl-dot" aria-hidden />
          <div className="tl-card tl-side">
            <h4>{it.kind === "Education" ? "Highlights" : "What I did"}</h4>
            <ul>{it.points.map((t) => <li key={t}><Text>{t}</Text></li>)}</ul>
          </div>
        </div>
      ))}
    </div>
  );
}
