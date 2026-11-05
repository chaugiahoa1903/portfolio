/* Chỉ ghi những gì đã xác nhận. Chỗ chưa biết để [[...]] cho bạn điền. */

export type ProjectLink = { label: string; href: string; primary?: boolean };

export type Project = {
  slug: string;
  shortTitle?: string; // tiêu đề ngắn cho thẻ, khi tiêu đề thật quá dài
  category: "Project" | "Hackathon" | "Publication" | "Thesis"; // nhãn trên thẻ
  venue?: string; // chỉ cho paper
  authors?: string[]; // chỉ cho paper
  authorsNote?: string;
  certificate?: { src: string; caption: string };
  figures?: { src: string; caption: string; width: number; height: number }[]; // ảnh minh hoạ thêm cho project
  year: string;
  cover: string; // ảnh trong public/projects/
  featured?: boolean; // hiện ở trang chủ; còn lại nằm trong gallery
  title: string;
  kicker: string; // một câu cho trang chủ
  type: string;
  period: string;
  status: "Live demo" | "In progress" | "Presented" | "Published" | "Prototype";
  role: string;
  summary: string;
  problem: string[];
  approach: string[];
  highlights?: { label: string; value: string }[];
  results: string[];
  stack: string[];
  links: ProjectLink[];
  learnings?: string[]; // điều học được, chỉ ghi điều bạn đã xác nhận
  next?: string[];
};

import { site } from "./site";

export const projects: Project[] = [
  {
    slug: "fwd-foresight",
    category: "Hackathon",
    year: "2026",
    cover: "/projects/fwd-foresight-cover.jpg",
    featured: true,
    title: "FWD Foresight",
    kicker: "A life-journey planner that shows a customer which of their goals slip, and by how many years, if a risk hits.",
    type: "Hackathon prototype · full-stack",
    period: "FWD Springboard Challenge, 2026",
    status: "Live demo",
    role: "Built the working prototype and did the market research behind the solution, as part of the team.",
    summary:
      "An advisor-facing tool for insurance conversations. The customer enters their profile, goals and worries; Foresight draws a timeline of their life and shows how a critical illness or loss of income would push each goal back.",
    problem: [
      "Insurance conversations often start from products and premiums, which is abstract. Customers decide faster when they can see what a risk would do to goals they already care about: a home, children's education, retirement.",
      "The brief was to prototype an AI-assisted way for advisors to open that conversation, while handling personal data properly under Vietnam's Decree 13/2023 on personal data protection.",
    ],
    approach: [
      "Intake: age, province, family, income, savings, goals with target ages and costs, and the risks the customer worries about.",
      "A projection engine compares a plain timeline with a risk scenario and flags the goals that move later, with the number of years lost. Assumptions such as inflation are visible and adjustable, so the customer can challenge the maths.",
      "Product suggestions follow from the biggest gaps rather than the other way round. A PDF summary can be exported for the customer to review at home.",
      "The data model is designed in two layers: an identified profile that only the responsible advisor sees, and anonymised patterns for the wider team (illustrative in this prototype). Consent is recorded with a version and a timestamp, and a profile can be deleted if consent is withdrawn.",
      "Customers who are not ready to decide can book a call-back. The advisor sees the due date and updates the status from a password-protected page.",
    ],
    highlights: [
      { label: "Frontend", value: "React, embedded in this Next.js site" },
      { label: "Backend", value: "Next.js route handler on Vercel" },
      { label: "Database", value: "Neon Postgres" },
      { label: "Export", value: "PDF with embedded Vietnamese font" },
      { label: "Result", value: "Winner, 2026" },
    ],
    results: [
      "Our team won The Springboard Challenge (FWD Summer Internship 2026).",
      "A working end-to-end prototype, deployed as its own app: profile → timeline → recommendations → PDF → saved lead with consent → advisor call-back list. Try it with made-up data; demo records are deleted automatically after a few days.",
    ],
    stack: ["React", "Next.js", "Vercel", "Postgres (Neon)", "jsPDF"],
    figures: [
      {
        src: "/projects/fwd-foresight.png",
        caption: "The prototype: a timeline of the customer's goals that shows which ones slip, and by how many years, if a risk hits.",
        width: 1280,
        height: 864,
      },
      {
        src: "/projects/fwd-foresight-winners.jpg",
        caption: "The team at the final of The Springboard Challenge (FWD Summer Internship 2026), where we won.",
        width: 1600,
        height: 1083,
      },
    ],
    links: [
      { label: "Try the live demo", href: site.foresight.demo, primary: true },
      { label: "Source on GitHub", href: site.foresight.repo },
    ],
    next: [
      "Compute the anonymised pattern layer from saved profiles instead of showing illustrative examples.",
    ],
  },
  {
    slug: "text-to-sql-adventureworks",
    category: "Project",
    year: "2026",
    cover: "/projects/text-to-sql-adventureworks.png",
    featured: true,
    title: "Text-to-SQL on AdventureWorks",
    kicker: "Ask a sales question in Vietnamese, get SQL and an Excel file back. Metric definitions are written down first, and ambiguous questions are asked back.",
    type: "Personal project · LLM application",
    period: "Oct 2026 – ongoing",
    status: "In progress",
    role: "Solo project. An AI assistant drafted code and test questions; I set the business rules and thresholds, ran every reference query, and scored every round.",
    summary:
      "A Vietnamese question goes in; a local LLM writes SQL against AdventureWorks2022; the result lands in an Excel file. The part I care most about is the product spec behind it: what \"revenue\" means, which orders count, and what the system should do when a question is vague.",
    problem: [
      "Text-to-SQL demos usually work on easy questions and quietly fail on business ones. \"How much did we earn last quarter?\" has at least three defensible answers, and a model that picks one silently is worse than no model.",
    ],
    approach: [
      "Wrote a PRD before the code and settled each definition one decision at a time.",
      "Revenue is SubTotal by default; TotalDue only when the user asks about total payment. Phrases like \"tổng tiền\" are ambiguous, so the system asks back instead of guessing.",
      "Only shipped orders (Status = 5) count, because revenue is recognised on delivery. Quarters are calendar quarters.",
      "The model runs locally through Ollama and connects to SQL Server with a read-only login, so a bad query cannot change data.",
    ],
    highlights: [
      { label: "Test set", value: "70 questions, 9 groups" },
      { label: "Baseline → final", value: "30/70 → 64/70 (lenient)" },
      { label: "Holdout sets", value: "8/12 and 9/12" },
    ],
    results: [
      "Scored by comparing result tables with reference SQL, not SQL text. Starting from schema only, the baseline got 30 of 70 right. After business rules, date-range fixes, ask-back and a SELECT-only guard, the final round got 64 of 70 under lenient grading (58 of 70 strict), above the 70% target I set in the PRD.",
      "On two held-out sets of 12 questions the system got 8 and 9 right. Holdout 1 stopped being fully independent once I fixed a failure I saw in it, and holdout 2 was drafted by AI, so I read these as a rough guide, not a clean estimate.",
      "The ask-back target (at least 80% of ambiguous questions asked back correctly) was not met: 2 of 6 and 4 of 6 on the holdouts. In a manual trial of 10 questions through the interface, two vague date questions silently returned full-year revenue instead of Q1. A number that looks plausible but answers the wrong question is the failure I most want to remove.",
      "Caveats: the labels are my own and not yet checked by a second person; the sample data contains only shipped orders, so the status filter is untested; there are no real users.",
    ],
    stack: ["Python", "FastAPI", "SQL Server", "Ollama (qwen2.5-coder 7b)", "pyodbc", "xlsxwriter"],
    links: [{ label: "Source on GitHub", href: "https://github.com/chaugiahoa1903/text2sql-adventureworks", primary: true }],
    learnings: [
      "A confident wrong number is the dangerous failure. Asking back is better than guessing, and it has to be measured, not assumed.",
      "Categories that reached 100% did so partly because I wrote the rules after seeing the answers. The holdout sets are the more honest measure.",
      "A small local model still writes DELETE, UPDATE and DROP when asked, so the SELECT-only filter and a read-only login are required, not optional.",
    ],
    next: ["Improve ask-back, which missed its 80% target, starting with date-range questions that lack a year.", "Have a second person re-label a sample of the test questions.", "Promotion and repeat-customer analysis on AdventureWorks (descriptive only: the data has no vouchers and no control group)."],
  },
  {
    slug: "lendingclub-mix-shift",
    category: "Project",
    year: "2026",
    cover: "/projects/lendingclub-mix-shift.png",
    title: "LendingClub: risk or mix shift?",
    kicker: "When a portfolio's bad-loan rate changes, is the borrower getting riskier, or is the borrower mix just different?",
    type: "Personal project · credit risk analytics",
    period: "Nov 2026 – ongoing",
    status: "In progress",
    role: "Solo project.",
    summary:
      "An analysis of public LendingClub data (accepted and rejected applications, 2007 to 2018 Q4) separating a real change in risk from a change in the mix of loans.",
    problem: [
      "A rising bad-loan rate can mean underwriting got worse, or it can mean the book simply tilted towards riskier segments. The two call for different decisions, and a single headline rate cannot tell them apart.",
    ],
    approach: [
      "Plan: load and clean the accepted and rejected datasets in SQL Server.",
      "Plan: decompose the change in bad-loan rate into a mix effect and a within-segment rate effect.",
      "Plan: present the result in Power BI so a non-technical reader can see which segments drove the change.",
    ],
    results: ["Just started. Findings will be added here once the decomposition is done."],
    stack: ["SQL Server", "Python", "Power BI"],
    links: [{ label: "Source on GitHub", href: "https://github.com/chaugiahoa1903/lc-mix-shift", primary: true }],
  },
  {
    slug: "vietnamese-legal-retrieval",
    category: "Thesis",
    year: "2026",
    cover: "/projects/vietnamese-legal-retrieval.png",
    featured: true,
    title: "Vietnamese legal document retrieval",
    kicker: "A two-stage retrieval system for Vietnamese law: classify the question into the right legal code first, then rank articles within it.",
    type: "Undergraduate thesis · NLP",
    period: "2026 – ongoing",
    status: "In progress",
    role: "Thesis author.",
    summary:
      "Finding the right article in Vietnamese law is a retrieval problem with a lot of near-duplicate wording. The thesis narrows the search space with a classifier before ranking, using the ALQAC 2025 corpus (28 legal codes, 3,368 articles).",
    problem: [
      "Searching every article for every question is slow and noisy: many codes use similar phrasing. The thesis tests whether scoping to the right code first makes ranking easier.",
    ],
    approach: [
      "Stage 1, scoping: a fine-tuned PhoBERT, ViDeBERTa or XLM-R classifier predicts the relevant legal code, evaluated with F1 and expected calibration error (ECE).",
      "Stage 2, ranking: hybrid scoring that combines embedding cosine similarity, BM25 with a custom Vietnamese legal stopword list, and a keyword boost.",
    ],
    highlights: [
      { label: "Corpus", value: "ALQAC 2025 · 28 codes · 3,368 articles" },
      { label: "Models", value: "PhoBERT · ViDeBERTa · XLM-R" },
    ],
    results: [
      "Related work, presented at ICDAM 2026 (see Papers & Research): classifying Vietnamese legal text into 7 law categories on 2,080 articles, where XLM-R scored best with 96.63% accuracy and F1 0.9666. It motivates the classification-guided scoping in Stage 1.",
      "[[Add thesis retrieval results (e.g. Recall@k, MRR) when available.]]",
    ],
    stack: ["Python", "Hugging Face Transformers", "BM25", "PhoBERT / ViDeBERTa / XLM-R"],
    links: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
