import { Fragment } from "react";

/** Hiện chữ thường; đoạn [[...]] chưa điền được tô nền vàng để dễ thấy. */
export function Text({ children }: { children: string }) {
  const parts = children.split(/(\[\[.*?\]\]|\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[[") ? (
          <mark key={i} className="todo">{p.slice(2, -2)}</mark>
        ) : p.startsWith("**") ? (
          <strong key={i} className="hl">{p.slice(2, -2)}</strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}

export const isTodo = (s: string | null | undefined) => !s || s.includes("[[");
