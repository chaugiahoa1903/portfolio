"use client";
import { useEffect, useRef } from "react";

type Piece = { x: number; y: number; speed: number; cells: [number, number][]; c: 0 | 1; rotAt: number };

// 7 khối Tetris
const SHAPES: [number, number][][] = [
  [[0, 0], [1, 0], [2, 0], [3, 0]],
  [[0, 0], [1, 0], [0, 1], [1, 1]],
  [[1, 0], [0, 1], [1, 1], [2, 1]],
  [[0, 0], [0, 1], [1, 1], [2, 1]],
  [[2, 0], [0, 1], [1, 1], [2, 1]],
  [[1, 0], [2, 0], [0, 1], [1, 1]],
  [[0, 0], [1, 0], [1, 1], [2, 1]],
];
const rot = (c: [number, number][]): [number, number][] => c.map(([x, y]) => [-y, x]);

/** Nền pixel: các khối Tetris xanh/tím rơi chậm từng bậc, xoay thỉnh thoảng, sáng lên khi con trỏ lại gần. */
export default function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, CELL = 14, raf = 0, running = true, last = 0;
    let pieces: Piece[] = [];
    let col: [string, string] = ["44, 255, 5", "191, 0, 255"];
    const mouse = { x: -9999, y: -9999 };

    const parse = (c: string, fb: string) => {
      const m = /^#?([0-9a-f]{6})$/i.exec(c.trim());
      if (!m) return fb;
      const n = parseInt(m[1], 16);
      return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
    };
    const readColor = () => {
      const cs = getComputedStyle(document.documentElement);
      col = [parse(cs.getPropertyValue("--accent"), col[0]), parse(cs.getPropertyValue("--accent2"), col[1])];
    };
    const make = (anywhere: boolean): Piece => {
      let cells = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      for (let r = Math.floor(Math.random() * 4); r > 0; r--) cells = rot(cells);
      return {
        x: Math.floor((Math.random() * w) / CELL) * CELL,
        y: anywhere ? Math.random() * h : -CELL * 5,
        speed: 14 + Math.random() * 26, // px/giây
        cells, c: Math.random() < 0.35 ? 1 : 0,
        rotAt: 3 + Math.random() * 7,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      CELL = w < 700 ? 10 : 14;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(8, Math.min(26, Math.round((w * h) / 52000)));
      pieces = Array.from({ length: n }, () => make(true));
      readColor();
      if (reduce) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pieces) {
        const y0 = Math.floor(p.y / CELL) * CELL; // rơi theo từng bậc
        for (const [cx, cy] of p.cells) {
          const x = p.x + cx * CELL, y = y0 + cy * CELL;
                    const glow = 0; // không sáng lên theo con trỏ
          const rgb = col[p.c];
          ctx.fillStyle = `rgba(${rgb}, ${(0.1 + glow * 0.5).toFixed(3)})`;
          ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
          ctx.strokeStyle = `rgba(${rgb}, ${(0.4 + glow * 0.5).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 1.5, y + 1.5, CELL - 3, CELL - 3);
        }
      }
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      for (let i = 0; i < pieces.length; i++) {
        const p = pieces[i];
        p.y += p.speed * dt;
        p.rotAt -= dt;
        if (p.rotAt <= 0) { p.cells = rot(p.cells); p.rotAt = 4 + Math.random() * 8; }
        if (p.y > h + CELL * 5) pieces[i] = make(false);
      }
      draw();
      if (running) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onScroll = () => { canvas.style.opacity = Math.max(0.2, 1 - window.scrollY / (window.innerHeight * 0.85)).toFixed(2); };
    const onVis = () => { running = !document.hidden; cancelAnimationFrame(raf); if (running && !reduce) raf = requestAnimationFrame(frame); };
    const mo = new MutationObserver(() => { readColor(); if (reduce) draw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize(); onScroll();
    if (!reduce) raf = requestAnimationFrame(frame);
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
