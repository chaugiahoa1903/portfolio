// Nhắc các chỗ còn [[...]] chưa điền. `--strict` thì báo lỗi (dùng trước khi công bố).
import { readFileSync } from "node:fs";

const strict = process.argv.includes("--strict");
const files = ["content/site.ts", "content/projects.ts"];
let found = 0;
for (const f of files) {
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    if (line.trim().startsWith("//") || line.trim().startsWith("/*")) return;
    for (const m of line.matchAll(/\[\[(.*?)\]\]/g)) {
      found++;
      console.warn(`  ${f}:${i + 1}  ${m[1].slice(0, 80)}`);
    }
  });
}
if (found) {
  console.warn(`\n⚠ Còn ${found} chỗ chưa điền [[...]] (hiện trên web dưới dạng chữ nền vàng).\n`);
  if (strict) process.exit(1);
} else {
  console.log("✓ Không còn placeholder.");
}
