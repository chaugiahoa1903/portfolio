/* Giải thưởng và chứng nhận. Chỉ ghi những gì có giấy tờ hoặc bạn đã xác nhận. */

export type Credential = {
  slug: string;
  kind: "Certificate" | "Award";
  title: string;
  subtitle: string;
  issuer: string;
  year: string;
  image: string; // ảnh trong public/
  description: string;
  tags: string[];
  href: string; // trang chi tiết trên web này
  hrefLabel: string;
};

export const credentials: Credential[] = [
  {
    slug: "springboard-winner-2026",
    kind: "Award",
    title: "Winner, The Springboard Challenge",
    subtitle: "FWD Summer Internship 2026 · team “Những Chú Ô”",
    issuer: "FWD Insurance Vietnam",
    year: "2026",
    image: "/projects/fwd-foresight-winners.jpg",
    description:
      "Our team won the 2026 challenge with FWD Foresight, a life-journey planner for insurance conversations. I built the working prototype and did the market research behind it.",
    tags: ["Hackathon", "Prototype", "Market research"],
    href: "/projects/fwd-foresight",
    hrefLabel: "View case study",
  },
  {
    slug: "icdam-2026-presentation",
    kind: "Certificate",
    title: "ICDAM-2026: Certificate of presentation",
    subtitle: "Presented a paper comparing PhoBERT, ViDeBERTa and XLM-R on Vietnamese legal text",
    issuer: "7th International Conference on Data Analytics and Management · 12–14 June 2026",
    year: "2026",
    image: "/research/icdam-2026-certificate.jpg",
    description:
      "Presenter and co-author certificate for our paper on classifying Vietnamese legal articles with three Transformer models.",
    tags: ["Conference", "NLP", "Vietnamese legal text"],
    href: "/research/legal-text-classification-icdam",
    hrefLabel: "View the paper summary",
  },
  {
    slug: "indea-2026-appreciation",
    kind: "Certificate",
    title: "INDEA-2026: Certificate of appreciation",
    subtitle: "Presented a paper on serving Vietnamese legal classifiers with Docker Swarm",
    issuer: "International Conference on Next-Generation Data Engineering and Analytics, University of Salford · 21–22 August 2026",
    year: "2026",
    image: "/research/indea-2026-certificate.jpg",
    description:
      "Presenter and co-author certificate for our paper on deploying the classifier as a service and benchmarking one container against three replicas.",
    tags: ["Conference", "Docker Swarm", "Model serving"],
    href: "/research/docker-swarm-inference-indea",
    hrefLabel: "View the paper summary",
  },
];
