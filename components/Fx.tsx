"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const MAG = ".btn,.hbtn";

/** Hiệu ứng toàn trang: thanh tiến độ cuộn, nút "hút" con trỏ, hiện dần khi cuộn. */
export default function Fx() {
  const bar = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      const d = document.documentElement;
      const p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
      bar.current?.style.setProperty("--sp", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    onScroll();
    const onMove = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      if (!reduce && e.pointerType === "mouse") {
        const m = t.closest<HTMLElement>(MAG);
        if (m) {
          const r = m.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) / r.width;
          const y = (e.clientY - (r.top + r.height / 2)) / r.height;
          m.style.transform = `translate(${(x * 8).toFixed(1)}px, ${(y * 6).toFixed(1)}px)`;
        }
      }
    };
    const onOut = (e: PointerEvent) => {
      const m = (e.target as Element | null)?.closest?.<HTMLElement>(MAG);
      if (m) m.style.transform = "";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onOut);

    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("rv-in"); io?.unobserve(e.target); } }),
        { threshold: 0.06 },
      );
      document.querySelectorAll<HTMLElement>(".section").forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.9) { el.classList.add("rv"); io!.observe(el); }
      });
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      io?.disconnect();
    };
  }, [path]);

  return <div ref={bar} className="progress" aria-hidden="true" />;
}
