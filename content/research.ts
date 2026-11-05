/* Bài báo / nghiên cứu. Số liệu lấy từ bản thảo và giấy chứng nhận bạn gửi; chỗ chưa biết để [[...]]. */
import type { Project } from "./projects";

const COAUTHORS = ["Quoc Hung Nguyen*", "Gia Hoa Chau", "Duc Tuan Anh Nguyen", "Minh Khoi Nong", "Hoang Khang Le"];
const AUTHORS_NOTE = "* Corresponding author. All authors are at the University of Economics Ho Chi Minh City (UEH).";

export const papers: Project[] = [
  {
    slug: "legal-text-classification-icdam",
    shortTitle: "PhoBERT, ViDeBERTa and XLM-R for Vietnamese legal text",
    title: "Comparative Analysis of PhoBERT, ViDeBERTa and XLM-R for Vietnamese Legal Text Classification: An Implementation in the Vietnamese Legal System",
    category: "Publication",
    year: "2026",
    cover: "/research/legal-text-classification-icdam.png",
    kicker: "Which Vietnamese language model classifies legal text best? A like-for-like comparison of three Transformers on 2,080 legal articles.",
    type: "Conference paper · NLP",
    period: "Presented 12–14 June 2026",
    status: "Presented",
    venue: "7th International Conference on Data Analytics and Management (ICDAM-2026), organised by London Metropolitan University with WSG University, Portalegre Polytechnic University and the SGGW Management Institute.",
    authors: COAUTHORS,
    authorsNote: AUTHORS_NOTE,
    role: "Team leader and presenter. Second of five authors; presented the paper at ICDAM-2026.",
    summary:
      "We fine-tuned PhoBERT, ViDeBERTa and XLM-R with one identical pipeline to assign Vietnamese legal text to the right law, then compared them on accuracy, F1 and real example questions.",
    problem: [
      "Vietnamese law changes quickly, and keyword search cannot follow the context of a question. Classifying a text into the right law narrows what a reader, or a retrieval system, has to search.",
      "Few studies compare modern Transformer models on Vietnamese legal text, and results across papers are hard to compare because pipelines differ.",
    ],
    approach: [
      "Data: 2,080 legal articles from seven Vietnamese laws (Civil Law 689, Civil Procedure 517, Land 260, Labor 220, Enterprise 218, Marriage and Family 133, Cybersecurity 43), split 80/20 with stratified sampling (1,664 training, 416 testing).",
      "Models: PhoBERT-base, XLM-RoBERTa-base and ViDeBERTa-base, all trained with the same Hugging Face pipeline. Only the classification layer and the last two encoder layers are trained, to limit overfitting and training time.",
      "Training: 10 epochs, batch size 32, mixed precision, learning rate 2e-5 for PhoBERT and XLM-R and 5e-5 for ViDeBERTa. Metrics are weighted averages, to handle the class imbalance.",
      "Beyond the test set, each model classified real-world legal questions to see how it behaves on natural phrasing.",
    ],
    highlights: [
      { label: "XLM-R accuracy · F1 0.9666", value: "96.63%" },
      { label: "PhoBERT accuracy · F1 0.9283", value: "92.79%" },
      { label: "ViDeBERTa accuracy · F1 0.8952", value: "89.42%" },
    ],
    results: [
      "XLM-R scored highest (accuracy 0.9663, F1 0.9666) even though Vietnamese is a small share of its multilingual pre-training. PhoBERT was second and stable; ViDeBERTa third.",
      "On real questions, ViDeBERTa kept predicting Civil Law for labor-law text. The authors attribute this to its tokenizer splitting Vietnamese legal terms into many pieces under the 128-token limit, so information is lost.",
      "The paper concludes that XLM-R and PhoBERT are good candidates for legal article retrieval. That is the direction of my thesis, where classification scopes the search before ranking.",
      "The comparison is under constrained fine-tuning on an in-domain dataset, so it is not a claim of state of the art for all legal settings.",
    ],
    stack: ["Python", "Hugging Face Transformers", "PhoBERT", "ViDeBERTa", "XLM-R"],
    links: [{ label: "Paper", href: "[[link to the proceedings when they are online]]", primary: true }],
    certificate: { src: "/research/icdam-2026-certificate.jpg", caption: "Certificate of presentation, ICDAM-2026." },
  },
  {
    slug: "docker-swarm-inference-indea",
    shortTitle: "Docker Swarm serving for Vietnamese legal text classifiers",
    title: "A Containerized HPC Framework for Scalable Deployment of Vietnamese Legal Text Classification Models Using Docker Swarm",
    category: "Publication",
    year: "2026",
    cover: "/research/docker-swarm-inference-indea.png",
    kicker: "What do you gain by replicating a CPU-bound Transformer classifier with Docker Swarm and Nginx? Measured from 1 to 100 concurrent users.",
    type: "Conference paper · ML systems",
    period: "Presented 21–22 August 2026",
    status: "Presented",
    venue: "International Conference on Next-Generation Data Engineering and Analytics (INDEA-2026), University of Salford, Manchester, UK, with Universal Innovators.",
    authors: COAUTHORS,
    authorsNote: AUTHORS_NOTE,
    role: "Team leader and presenter. Second of five authors; led the revision after peer review, including the response to the reviewers, and presented the paper at INDEA-2026.",
    summary:
      "A follow-up to the classification study: we deployed the best model as a FastAPI service and benchmarked a single container against three replicas behind an Nginx load balancer, looking at throughput, latency and CPU use.",
    problem: [
      "A single container serving a Transformer saturates quickly when requests arrive together. Replicating the service should help, but there was little real benchmark data for Vietnamese legal NLP under concurrent load.",
      "Kubernetes is the usual answer, but its overhead is hard to justify on small, resource-limited machines. The paper looks at Docker Swarm as a lighter option.",
    ],
    approach: [
      "Three models were fine-tuned on the same 2,080 legal texts (XLM-R 95.67%, PhoBERT 93.03%, ViDeBERTa 90.87% accuracy). The best, XLM-R, was packaged as a Docker image and served through FastAPI and Uvicorn on CPU.",
      "Baseline: one container with one worker thread. Swarm setup: three replicas with four worker threads each, behind Nginx with round-robin balancing.",
      "Benchmark: 1, 5, 10, 20, 50 and 100 concurrent users, 50 requests per level, a 30-second timeout. Measured throughput, mean, P95 and max latency, CPU and RAM.",
      "Everything ran on one physical machine (Intel Core Ultra 7 155H, 16 cores, 32 GB RAM, Windows 11, Docker Desktop), so the experiment measures replicas on a single host rather than a multi-node cluster.",
    ],
    highlights: [
      { label: "More throughput at 50 users", value: "+13.4%" },
      { label: "More throughput at 100 users", value: "+20.2%" },
      { label: "Average parallel efficiency (ideal 3×)", value: "≈ 37%" },
    ],
    results: [
      "Replication raised throughput from 2.61 to 2.96 requests/s at 50 users and from 1.29 to 1.55 requests/s at 100 users.",
      "Speed-up stayed between 0.97× and 1.33×, far below the ideal 3×. At 10 users the extra Nginx hop cost slightly more than it saved.",
      "The cause is CPU-bound inference: with three replicas the CPU reached 100% at 10 users and stayed around 90% beyond. Memory was not the limit (about 13 GB of 31.6 GB).",
      "At 100 users neither setup finished every request within the 30-second limit. The paper concludes that GPU acceleration is needed to run Transformer models at production scale.",
    ],
    stack: ["Docker Swarm", "Nginx", "FastAPI", "PyTorch", "Python"],
    links: [{ label: "Paper", href: "[[link to the proceedings when they are online]]", primary: true }],
    certificate: { src: "/research/indea-2026-certificate.jpg", caption: "Certificate of appreciation, INDEA-2026." },
  },
];

export const getPaper = (slug: string) => papers.find((p) => p.slug === slug);
