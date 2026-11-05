"use client";
import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Pulse = { a: number; b: number; t: number; speed: number };

/** Nền mạng neuron: các nút trôi chậm, nối nhau khi ở gần, thỉnh thoảng có xung chạy dọc cạnh nối. */
export default function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, running = true;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let rgb = "15, 94, 90";
    const mouse = { x: -9999, y: -9999 };

    const readColor = () => {
      const c = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      const m = /^#?([0-9a-f]{6})$/i.exec(c);
      if (m) {
        const n = parseInt(m[1], 16);
        rgb = `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
      }
    };

    const LINK = () => (w < 700 ? 110 : 150);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(22, Math.min(80, Math.round((w * h) / 20000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.2 + Math.random() * 1.6,
      }));
      pulses = [];
      readColor();
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      const L = LINK();
      const L2 = L * L;

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -10) n.x = w + 10; else if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10; else if (n.y > h + 10) n.y = -10;
        }
      }

      // cạnh nối giữa các nút gần nhau
      const edges: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < L2) {
            edges.push([i, j]);
            const a = (1 - Math.sqrt(d2) / L) * 0.32;
            ctx.strokeStyle = `rgba(${rgb}, ${a.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // nối với con trỏ chuột
      const ML = L * 1.25;
      for (const n of nodes) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < ML) {
          ctx.strokeStyle = `rgba(${rgb}, ${((1 - d / ML) * 0.5).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // xung tín hiệu chạy dọc cạnh nối
      if (!reduce && edges.length && pulses.length < 6 && Math.random() < 0.04) {
        const [a, b] = edges[Math.floor(Math.random() * edges.length)];
        pulses.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.012 });
      }
      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        p.t += p.speed;
        const A = nodes[p.a], B = nodes[p.b];
        const x = A.x + (B.x - A.x) * p.t, y = A.y + (B.y - A.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 9);
        g.addColorStop(0, `rgba(${rgb}, 0.85)`);
        g.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fill();
      }

      // các nút
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${rgb}, 0.55)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running && !reduce) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    // đậm ở đầu trang, mờ dần khi cuộn để không làm rối phần nội dung
    const onScroll = () => {
      const o = Math.max(0.2, 1 - window.scrollY / (window.innerHeight * 0.85));
      canvas.style.opacity = o.toFixed(2);
    };
    const onVis = () => {
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(frame);
    };
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const onScheme = () => readColor();

    resize();
    onScroll();
    frame();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    scheme.addEventListener("change", onScheme);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      scheme.removeEventListener("change", onScheme);
    };
  }, []);

  return <canvas ref={ref} className="neural" aria-hidden="true" />;
}
