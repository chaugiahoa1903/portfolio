/* Mọi chỗ có [[...]] là chưa điền: web sẽ tô vàng ở bản dev và `npm run build` sẽ nhắc. */

export const site = {
  name: "Châu Gia Hòa",
  shortName: "Châu Gia Hòa",
  title: "Châu Gia Hòa — Data Science student",
  description:
    "Final-year Data Science student at UEH working on NLP, analytics and applied AI. Case studies with live demos and code.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://chaugiahoa.vercel.app",
  location: "Ho Chi Minh City, Vietnam",
  headline: "Data science student building NLP, analytics and AI systems.",
  intro:
    "Final-year Data Science student at the University of Economics Ho Chi Minh City (UEH). My work sits between NLP research, analytics and small AI products. Each project below has a case study, and where possible something you can try or read.",
  openTo: "Open to internships and entry-level roles in data, AI and analytics.",
  /* Foresight là app riêng (repo riêng, deploy riêng). Điền hai link sau khi deploy xong. */
  foresight: {
    demo: "https://foresight-demo-pied.vercel.app",
    repo: "https://github.com/chaugiahoa1903/foresight-demo",
  },
  links: {
    github: "https://github.com/chaugiahoa1903",
    linkedin: "https://www.linkedin.com/in/h%C3%B2a-ch%C3%A2u-02a77a304/",
    email: "giahoa990@gmail.com",
    resume: null as string | null, // đặt file vào public/resume.pdf rồi ghi "/resume.pdf"
  },
};

export const about = {
  intro:
    "I study **Data Science** at UEH. I enjoy projects where the hard part is deciding **what the right question is**, then making the answer **usable**: a retrieval system that finds the right legal article, or a prototype that shows a customer what a risk would cost them.",
  education: "**BSc in Data Science** (expected March 2027), University of Economics Ho Chi Minh City (UEH). **GPA 3.58 / 4.0**.",
  goals:
    "Most of my work is in **Python and SQL**, with **NLP for Vietnamese text** as a recurring thread. After graduating I am looking for **data roles** where analysis meets real business decisions, such as analytics, credit risk or applied NLP.",
  strengths: [
    "**Leading a small team:** team leader on two conference papers (ICDAM-2026 and INDEA-2026).",
    "**Turning an idea into a working product:** FWD Foresight, from market research to a deployed prototype.",
    "**NLP for Vietnamese text:** fine-tuning and comparing PhoBERT, ViDeBERTa and XLM-R; retrieval over legal documents.",
    "**Presenting technical work:** presented at two international conferences in 2026.",
  ],
};

export type SkillGroup = {
  group: string;
  blurb: string;
  tools: string[];
  where: { text: string; href?: string }[];
};

export const skills: SkillGroup[] = [
  {
    group: "Data & analytics",
    blurb: "The foundation I use most: querying and cleaning data, then turning it into a segment, a metric or a decision someone can act on.",
    tools: ["Python (pandas, scikit-learn)", "SQL (SQL Server)", "Power BI (DAX, Power Query)", "RFM and KMeans segmentation", "Jupyter"],
    where: [
      { text: "LendingClub: SQL Server and Power BI to separate borrower risk from mix shift", href: "/projects/lendingclub-mix-shift" },
      { text: "FWD internship: RFM + KMeans customer segmentation and K2 persistency analysis", href: "/#experience" },
      { text: "Text-to-SQL: question to SQL to Excel on AdventureWorks", href: "/projects/text-to-sql-adventureworks" },
    ],
  },
  {
    group: "NLP & retrieval",
    blurb: "Vietnamese text is a recurring thread: comparing language models fairly, and finding the right passage in a large legal corpus.",
    tools: ["Hugging Face Transformers", "PhoBERT, ViDeBERTa, XLM-R", "BM25 + embedding hybrid retrieval", "Local LLMs with Ollama"],
    where: [
      { text: "ICDAM-2026: like-for-like comparison of three Transformers on legal text", href: "/research/legal-text-classification-icdam" },
      { text: "Thesis: Vietnamese legal document retrieval", href: "/projects/vietnamese-legal-retrieval" },
      { text: "Text-to-SQL: local LLM generating SQL from Vietnamese questions", href: "/projects/text-to-sql-adventureworks" },
    ],
  },
  {
    group: "Big data & serving",
    blurb: "Making a model usable under load: containers, replicas and a load balancer in front of an API.",
    tools: ["Docker Swarm, Nginx", "FastAPI serving", "PyTorch", "Hadoop/HDFS, PySpark, Spark SQL", "Spark Structured Streaming, Kafka"],
    where: [
      { text: "INDEA-2026: Docker Swarm serving measured from 1 to 100 concurrent users", href: "/research/docker-swarm-inference-indea" },
    ],
  },
  {
    group: "Building & shipping",
    blurb: "I can take an idea to a working, deployed prototype: interface, API, database and hosting.",
    tools: ["React, Next.js, Vite", "Serverless APIs", "Postgres (Neon)", "Vercel", "Git, LaTeX"],
    where: [
      { text: "FWD Foresight: prototype deployed on Vercel with a Neon database", href: "/projects/fwd-foresight" },
      { text: "This portfolio: Next.js, deployed on Vercel", href: "/" },
    ],
  },
];

/** Đường học vấn và kinh nghiệm: thẻ chính bên này, thẻ "Highlights" bên kia (mới nhất ở trên). */
export type Journey = { when: string; title: string; org: string; kind: "Education" | "Experience"; points: string[] };

export const journey: Journey[] = [
  {
    when: "Expected March 2027",
    title: "BSc in Data Science",
    org: "University of Economics Ho Chi Minh City (UEH)",
    kind: "Education",
    points: [
      "**GPA 3.58 / 4.0.**",
      "Co-authored and presented **two international conference papers** (ICDAM-2026, INDEA-2026).",
      "**Winner, The Springboard Challenge 2026** (FWD Insurance Vietnam) with FWD Foresight.",
    ],
  },
  {
    when: "Jun – Aug 2026",
    title: "Data Analysis Intern",
    org: "FWD Insurance · Banca Compensation team",
    kind: "Experience",
    points: [
      "Designed and analysed **bancassurance incentive programs**.",
      "Built **RFM + KMeans** customer segmentation in Python.",
      "Analysed **K2 persistency** in pandas and Jupyter.",
    ],
  },
];
