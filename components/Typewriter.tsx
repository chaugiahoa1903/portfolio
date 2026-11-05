"use client";
import { useEffect, useState } from "react";

/** Gõ và xoá lần lượt các từ khoá; với người bật "giảm chuyển động" chỉ hiện từ đầu tiên. */
export default function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, n = words[0].length, dir: 1 | -1 = -1, t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const cur = words[w];
      n += dir;
      setText(cur.slice(0, n));
      let delay = dir === 1 ? 70 : 35;
      if (dir === 1 && n >= cur.length) { dir = -1; delay = 1700; }
      else if (dir === -1 && n <= 0) { dir = 1; w = (w + 1) % words.length; delay = 300; }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 1800);
    return () => clearTimeout(t);
  }, [words]);
  return <><span className="kw">{text}</span><span className="caret" aria-hidden="true" /></>;
}
