# Portfolio — Châu Gia Hòa

Next.js 16 (App Router, TypeScript) · giao diện sáng tối giản, tự đổi sang tối theo máy · tiếng Anh.
Web này chỉ chứa giao diện portfolio. Foresight là app riêng (repo `foresight-demo`, deploy riêng, database riêng): `/projects/fwd-foresight` (case study) → nút **Try the live demo** → trang Vercel của Foresight.

```
app/(site)/           trang portfolio (có header/footer)
content/              toàn bộ chữ trên web: site.ts, projects.ts
```

## Sửa nội dung
- `content/site.ts`: tên, giới thiệu, About, skills, kinh nghiệm, học vấn, link liên hệ, `foresight.demo` và `foresight.repo` (link demo và repo của Foresight).
- `content/research.ts`: các bài báo (ICDAM, INDEA), hiện ở mục Papers & Research và `/research`. Ảnh chứng nhận và ảnh bìa nằm trong `public/research/`. Không đưa bản thảo PDF lên web vì có thể vướng quy định nhà xuất bản; khi kỷ yếu Springer lên mạng thì điền link vào nút Paper.
- `content/projects.ts`: mỗi project là một object; thêm project mới = thêm một object, trang tự sinh.
  - `featured: true` = hiện ở trang chủ (đang là Foresight, INDEA, thesis); project còn lại nằm trong Gallery (`/projects`).
  - `cover`: ảnh bìa trong `public/projects/` (16:9, ví dụ 1600×900). Ảnh Foresight là ảnh chụp app thật; các ảnh còn lại là sơ đồ vẽ từ thông tin đã xác nhận. Thay bằng ảnh chụp thật khi có (ví dụ kết quả Power BI của LendingClub).
- Chỗ còn `[[...]]` là chưa điền: hiện nền vàng trên web. `npm run check` liệt kê hết; làm sạch rồi mới công bố.
- Résumé: bỏ file vào `public/resume.pdf`, đặt `resume: "/resume.pdf"` trong `content/site.ts`.

## Deploy lên Vercel (khoảng 5 phút)
Không cần database cho web này.
1. Đẩy lên GitHub (repo public, ví dụ `portfolio`).
2. Vercel → Add New → Project → Import repo (tự nhận Next.js).
3. Environment Variables: thêm `NEXT_PUBLIC_SITE_URL` = địa chỉ web sẽ có (xem `.env.example`; sửa lại nếu đổi tên miền). Deploy.
4. Mỗi lần `git push` là tự deploy lại.

Thứ tự gợi ý: deploy `foresight-demo` trước để có link demo, điền vào `foresight.demo` / `foresight.repo` trong `content/site.ts`, rồi deploy portfolio.

## Thêm project mới
Tạo repo riêng cho project, (nếu có demo thì deploy riêng), rồi thêm một object vào `content/projects.ts` với link repo và link demo.

## Chạy local
```
npm install
npm run dev
npm run build
```

Vercel Hobby chỉ dành cho dùng cá nhân, phi thương mại: phù hợp cho portfolio.
