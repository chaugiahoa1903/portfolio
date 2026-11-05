"use client";
import { useEffect, useRef } from "react";

/** Ảnh hiện từ khối pixel thô đến nét dần. Nếu giảm chuyển động thì hiện ảnh thẳng. */
export default function PixelPhoto({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const im = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = im.current, c = cv.current;
    if (!img || !c) return;
    let dead = false;
    let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      const W = img.clientWidth, H = img.clientHeight;
      if (!W || !H) return;
      c.width = W; c.height = H;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const tmp = document.createElement("canvas");
      const tctx = tmp.getContext("2d");
      if (!tctx) return;
      const steps = [5, 8, 13, 21, 34, 55, 90, 150];
      let k = 0;
      c.style.opacity = "1";
      const draw = () => {
        if (dead) return;
        if (k >= steps.length) { c.style.opacity = "0"; return; }
        const n = steps[k++];
        const h = Math.max(1, Math.round((n * H) / W));
        tmp.width = n; tmp.height = h;
        tctx.drawImage(img, 0, 0, n, h);
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(tmp, 0, 0, n, h, 0, 0, W, H);
        timer = setTimeout(draw, 120);
      };
      draw();
    };
    if (img.complete) run(); else img.addEventListener("load", run, { once: true });
    return () => { dead = true; clearTimeout(timer); };
  }, []);
  return (
    <figure className="hero-photo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={im} src={src} alt={alt} width={width} height={height} />
      <canvas ref={cv} style={{ opacity: 0 }} aria-hidden="true" />
    </figure>
  );
}
