/* Mọi chỗ có [[...]] là chưa điền: web sẽ tô vàng ở bản dev và `npm run build` sẽ nhắc. */

export const site = {
  name: "Châu Gia Hòa",
  shortName: "Gia Hòa",
  title: "Châu Gia Hòa — Data Science student",
  description:
    "Final-year Data Science student at UEH working on NLP, analytics and applied AI. Case studies with live demos and code.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  location: "Ho Chi Minh City, Vietnam",
  headline: "Data science student building NLP, analytics and AI systems.",
  intro:
    "Final-year Data Science student at the University of Economics Ho Chi Minh City (UEH). My work sits between NLP research, analytics and small AI products. Each project below has a case study, and where possible something you can try or read.",
  openTo: "Open to internships and entry-level roles in data, AI and analytics.",
  /* Foresight là app riêng (repo riêng, deploy riêng). Điền hai link sau khi deploy xong. */
  foresight: {
    demo: "[[https://your-foresight-demo.vercel.app]]",
    repo: "[[https://github.com/chaugiahoa1903/foresight-demo]]",
  },
  links: {
    github: "https://github.com/chaugiahoa1903",
    linkedin: "[[https://www.linkedin.com/in/your-handle]]",
    email: "[[your-email@example.com]]",
    resume: null as string | null, // đặt file vào public/resume.pdf rồi ghi "/resume.pdf"
  },
};

export const about = {
  paragraphs: [
    "I study Data Science at UEH, expecting to graduate in March 2027. I enjoy projects where the hard part is deciding what the right question is, then making the answer usable: a retrieval system that finds the right legal article, or a prototype that shows a customer what a risk would cost them. I have co-authored and presented two conference papers on Vietnamese legal NLP and on serving such models.",
    "Most of my work is in Python and SQL, with NLP for Vietnamese text as a recurring thread. [[Add one or two sentences about what you want to do next: roles, industries, or a master's abroad.]]",
  ],
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Data & analytics", items: ["Python (pandas, scikit-learn)", "SQL (SQL Server)", "Power BI (DAX, Power Query)", "RFM and KMeans segmentation"] },
  { group: "NLP & retrieval", items: ["Hugging Face Transformers", "PhoBERT, ViDeBERTa, XLM-R", "BM25 + embedding hybrid retrieval", "Local LLMs with Ollama"] },
  { group: "Big data & serving", items: ["Hadoop/HDFS, PySpark, Spark SQL", "Spark Structured Streaming, Kafka", "Docker Swarm, Nginx, FastAPI serving"] },
  { group: "Building & shipping", items: ["React, Next.js, Vite", "Serverless APIs, Postgres (Neon)", "Git, LaTeX"] },
];

export const education = [
  {
    title: "BSc Data Science",
    org: "University of Economics Ho Chi Minh City (UEH)",
    when: "Expected March 2027",
    note: "GPA 3.58 / 4.0",
  },
];

export const experience = [
  {
    title: "Data Analysis Intern",
    org: "FWD Insurance · Banca Compensation team",
    when: "Jun – Aug 2026",
    bullets: [
      "Designed and analysed bancassurance incentive programs.",
      "Built RFM + KMeans customer segmentation in Python.",
      "Analysed K2 persistency in pandas and Jupyter.",
    ],
  },
];
