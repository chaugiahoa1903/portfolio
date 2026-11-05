"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/content/site";

type Item = { label: string; hint: string; run: () => void };

/** Ctrl/⌘ + K hoặc "/" để nhảy nhanh tới một mục, như palette trong IDE. */
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    const go = (h: string) => () => { if (h.startsWith("http") || h.startsWith("mailto")) window.open(h, h.startsWith("mailto") ? "_self" : "_blank"); else router.push(h); };
    return [
      { label: "About me", hint: "section", run: go("/#about") },
      { label: "Skills", hint: "section", run: go("/#skills") },
      { label: "Education & experience", hint: "section", run: go("/#experience") },
      { label: "Projects", hint: "section", run: go("/#projects") },
      { label: "Papers & research", hint: "section", run: go("/#research") },
      { label: "Certificates & awards", hint: "section", run: go("/#awards") },
      { label: "Work & Research (all)", hint: "page", run: go("/projects") },
      { label: "FWD Foresight demo", hint: "open ↗", run: go(site.foresight.demo) },
      { label: "GitHub", hint: "open ↗", run: go(site.links.github) },
      { label: "LinkedIn", hint: "open ↗", run: go(site.links.linkedin) },
      { label: "Send an email", hint: "mailto", run: go(`mailto:${site.links.email}`) },
      { label: "Toggle light / dark theme", hint: "action", run: () => document.querySelector<HTMLButtonElement>("[data-theme-toggle]")?.click() },
    ];
  }, [router]);

  const shown = items.filter((x) => x.label.toLowerCase().includes(q.trim().toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target as HTMLElement)?.tagName ?? "");
      if ((e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing && !open)) { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("cmdk:open", onOpen); };
  }, [open]);

  useEffect(() => { if (open) { setQ(""); setI(0); setTimeout(() => input.current?.focus(), 0); } }, [open]);
  useEffect(() => { setI(0); }, [q]);

  if (!open) return null;
  const choose = (it?: Item) => { if (!it) return; setOpen(false); setTimeout(it.run, 30); };
  return (
    <div className="cmdk-back" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div className="cmdk" role="dialog" aria-modal="true" aria-label="Command palette">
        <input
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type to jump to a section, project or link…"
          aria-label="Search commands"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setI((x) => Math.min(shown.length - 1, x + 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setI((x) => Math.max(0, x - 1)); }
            else if (e.key === "Enter") { e.preventDefault(); choose(shown[i]); }
          }}
        />
        {shown.length ? (
          <ul role="listbox">
            {shown.map((it, n) => (
              <li key={it.label}>
                <button type="button" role="option" aria-selected={n === i} onMouseEnter={() => setI(n)} onClick={() => choose(it)}>
                  <span>{it.label}</span><small>{it.hint}</small>
                </button>
              </li>
            ))}
          </ul>
        ) : <div className="cmdk-empty">No match. Try “projects” or “github”.</div>}
        <div className="cmdk-foot">↑ ↓ to move · Enter to open · Esc to close</div>
      </div>
    </div>
  );
}
