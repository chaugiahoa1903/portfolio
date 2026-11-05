"use client";
import { useEffect, useState } from "react";

const CH = "01<>/_{}[]#$%&*+=?";

/** Chữ "giải mã" từng ký tự lúc tải trang. Bản đọc cho trình đọc màn hình luôn là chữ thật. */
export default function ScrambleText({ text }: { text: string }) {
  const [shown, setShown] = useState(text);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = now - start;
      let out = "";
      let done = true;
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === " " || t > 250 + i * 16) out += c;
        else { out += CH[Math.floor(Math.random() * CH.length)]; done = false; }
      }
      setShown(out);
      if (!done) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text]);
  return <><span className="sr-only">{text}</span><span aria-hidden="true">{shown}</span></>;
}
