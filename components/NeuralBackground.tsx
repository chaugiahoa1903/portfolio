"use client";
import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; s: number; c: 0 | 1 };
type Pulse = { a: number; b: number; t: number; speed: number; c: 0 | 1 };

const PX = 3;
const snap = (v: number) => Math.round(v / PX) * PX;

/** Nền mạch điện pixel: các nút vuông trôi chậm, nối nhau bằng đường gấp khúc ngang-dọc, xung tín hiệu chạy dọc đường nối. */
export default function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, running = true;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let col: [string, string] = ["44, 255, 5", "191, 0, 255"];
    const mouse = { x: -9999, y: -9999 };

    const parse = (c: string, fallback: string) => {
      const m = /^#?([0-9a-f]{6})$/i.exec(c.trim());
      if (!m) return fallback;
      const n = parseInt(m[1], 16);
      return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
    };
    const readColor = () => {
      const cs = getComputedStyle(document.documentElement);
      col = [parse(cs.getPropertyValue("--accent"), col[0]), parse(cs.getPropertyValue("--accent2"), col[1])];
    };
    const LINK = () => (w < 700 ? 120 : 170);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(18, Math.min(60, Math.round((w * h) / 26000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        s: Math.random() < 0.25 ? PX * 2 : PX, c: (i % 3 === 0 ? 1 : 0) as 0 | 1,
      }));
      pulses = [];
      readColor();
    };

    // đường gấp khúc: ngang rồi dọc
    const link = (x1: number, y1: number, x2: number, y2: number, a: number, c: string) => {
      ctx.fillStyle = `rgba(${c}, ${a.toFixed(3)})`;
      const ax = snap(x1), ay = snap(y1), bx = snap(x2), by = snap(y2);
      ctx.fillRect(Math.min(ax, bx), ay, Math.abs(bx - ax) + 2, 2);
      ctx.fillRect(bx, Math.min(ay, by), 2, Math.abs(by - ay) + 2);
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      const L = LINK(), L2 = L * L;
      if (!reduce) {
        for (const n of nodes) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10;
        }
      }
      const edges: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < L2) {
            edges.push([i, j]);
            link(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, (1 - Math.sqrt(d2) / L) * 0.3, col[nodes[i].c]);
          }
        }
      }
      const ML = L * 1.2;
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < ML) link(n.x, n.y, mouse.x, mouse.y, (1 - d / ML) * 0.55, col[0]);
      }
      if (mouse.x > -999) { ctx.fillStyle = `rgba(${col[0]}, .9)`; ctx.fillRect(snap(mouse.x) - 3, snap(mouse.y) - 3, 6, 6); }

      if (!reduce && edges.length && pulses.length < 6 && Math.random() < 0.04) {
        const [a, b] = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ a, b, t: 0, speed: 0.01 + Math.random() * 0.012, c: Math.random() < 0.4 ? 1 : 0 });
      }
      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        p.t += p.speed;
        const A = nodes[p.a], B = nodes[p.b];
        const dx = B.x - A.x, dy = B.y - A.y, tot = Math.abs(dx) + Math.abs(dy) || 1;
        for (let k = 0; k < 4; k++) {
          const d = Math.max(0, p.t - k * 0.02) * tot;
          const x = d < Math.abs(dx) ? A.x + Math.sign(dx) * d : B.x;
          const y = d < Math.abs(dx) ? A.y : A.y + Math.sign(dy) * (d - Math.abs(dx));
          ctx.fillStyle = `rgba(${col[p.c]}, ${(0.95 - k * 0.22).toFixed(2)})`;
          ctx.fillRect(snap(x) - 3, snap(y) - 3, 6 - k, 6 - k);
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${col[n.c]}, 0.7)`;
        ctx.fillRect(snap(n.x), snap(n.y), n.s, n.s);
      }
      if (running && !reduce) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onScroll = () => { canvas.style.opacity = Math.max(0.22, 1 - window.scrollY / (window.innerHeight * 0.85)).toFixed(2); };
    const onVis = () => { running = !document.hidden; cancelAnimationFrame(raf); if (running) raf = requestAnimationFrame(frame); };
    const mo = new MutationObserver(() => { readColor(); if (reduce) frame(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize(); onScroll(); frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      running = false; cancelAnimationFrame(raf); mo.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="neural" aria-hidden="true" />;
}
