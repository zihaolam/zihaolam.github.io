import React, { useState, useRef, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────
interface Experience {
  id: string;
  year: string;
  endYear: string;
  period: string;
  company: string;
  role: string;
  location: string;
  type: "work" | "education" | "activity";
  description: string[];
  technologies: string[];
}

// ─── Tech Icon Map (devicon CDN) ─────────────────────────────────
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";
const techMap: Record<string, string> = {
  Typescript: `${DEVICON}/typescript/typescript-original.svg`,
  Go: `${DEVICON}/go/go-original-wordmark.svg`,
  Golang: `${DEVICON}/go/go-original-wordmark.svg`,
  Python: `${DEVICON}/python/python-original.svg`,
  React: `${DEVICON}/react/react-original.svg`,
  "React Native": `${DEVICON}/react/react-original.svg`,
  "Next.js": `${DEVICON}/nextjs/nextjs-original.svg`,
  NextJS: `${DEVICON}/nextjs/nextjs-original.svg`,
  AWS: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  Docker: `${DEVICON}/docker/docker-original.svg`,
  PostgreSQL: `${DEVICON}/postgresql/postgresql-original.svg`,
  Redis: `${DEVICON}/redis/redis-original.svg`,
  TailwindCSS: `${DEVICON}/tailwindcss/tailwindcss-original.svg`,
  "Node.js": `${DEVICON}/nodejs/nodejs-original.svg`,
  SQLite: `${DEVICON}/sqlite/sqlite-original.svg`,
  FastAPI: `${DEVICON}/fastapi/fastapi-original.svg`,
  PHP: `${DEVICON}/php/php-original.svg`,
  MySQL: `${DEVICON}/mysql/mysql-original.svg`,
  Terraform: `${DEVICON}/terraform/terraform-original.svg`,
  DynamoDB: `${DEVICON}/dynamodb/dynamodb-original.svg`,
  Supabase: `${DEVICON}/supabase/supabase-original.svg`,
  Cloudflare: `${DEVICON}/cloudflare/cloudflare-original.svg`,
  Stripe: `${SI}/stripe/white`,
  Solana: `${SI}/solana/white`,
  Bun: `${SI}/bun/white`,
  FFmpeg: `${SI}/ffmpeg/white`,
  ffmpeg: `${SI}/ffmpeg/white`,
  WebRTC: `${SI}/webrtc/white`,
  Meilisearch: `${SI}/meilisearch/white`,
  OpenAI: `${SI}/openai/white`,
  "Ember.js": `${DEVICON}/ember/ember-original-wordmark.svg`,
  "Scikit-learn": `${SI}/scikitlearn/white`,
  PyTorch: `${DEVICON}/pytorch/pytorch-original.svg`,
  Aptos: `${SI}/aptos/white`,
};

// ─── Experience Data (chronological) ─────────────────────────────
const experiences: Experience[] = (
  [
    {
      id: "hku",
      year: "2018",
      endYear: "2022",
      period: "Sep 2018 — Sep 2022",
      company: "The University of Hong Kong",
      role: "BSc Computer Science & Finance",
      location: "Hong Kong",
      type: "education",
      description: [
        "Awarded a full scholarship — one of approximately 150 recipients out of 13,000 applicants (~1% acceptance rate).",
        "Focused on Distributed Systems & Cloud Computing, Artificial Intelligence & Machine Learning, Web Development, and Algorithms.",
        "Final Year Project: Built financial models leveraging AI/ML techniques and technical indicators for market prediction.",
      ],
      technologies: ["Python", "Typescript", "React", "AWS"],
    },
    {
      id: "handson",
      year: "2019",
      endYear: "2019",
      period: "May 2019 — Jun 2019",
      company: "HandsOn Shanghai",
      role: "Head of Digital Media & Publications",
      location: "Shanghai, China",
      type: "activity",
      description: [
        "Selected as a Funded Scholar for the HKU Horizons & Common Purpose leadership program.",
        "Partnered with senior company managers to produce business content and corporate publications.",
        "Championed elderly healthcare volunteerism initiatives, driving a measurable increase in local community participation.",
      ],
      technologies: [],
    },
    {
      id: "whub",
      year: "2019",
      endYear: "2019",
      period: "Oct 2019",
      company: "WHUB Fintech Hackathon",
      role: "Finalist",
      location: "Hong Kong",
      type: "activity",
      description: [
        "Reached the finals at Hong Kong's largest startup community hackathon, building a financial solution for DBS Bank.",
        "Built an NLP-powered financial data forecaster that analyzed financial ratios alongside text sentiment extracted from news and articles.",
      ],
      technologies: ["Python"],
    },
    {
      id: "shimaier",
      year: "2020",
      endYear: "2021",
      period: "Mar 2020 — May 2021",
      company: "Shimaier Technologies",
      role: "Full Stack Web Developer",
      location: "Kuala Lumpur, Malaysia",
      type: "work",
      description: [
        "Developed educational platforms, e-commerce websites, and various web applications as part of a collaborative engineering team.",
        "Designed and built interactive prototypes with a strong focus on UI/UX refinement.",
        "Practiced agile development methodologies and collaborative Git workflows in a team environment.",
      ],
      technologies: ["Ember.js", "Typescript"],
    },
    {
      id: "mit-hackathon",
      year: "2020",
      endYear: "2020",
      period: "May 2020",
      company: "MIT Health Hackathon",
      role: "Participant",
      location: "Remote",
      type: "activity",
      description: [
        "Developed a bartering platform to tackle resource hoarding during the COVID-19 pandemic with a team of 4.",
        "Implemented statistical pricing models to standardize goods valuation, enabling fair exchanges between those with excess and deficit supplies.",
      ],
      technologies: ["Python", "React"],
    },
    {
      id: "hkmsa",
      year: "2020",
      endYear: "2022",
      period: "May 2020 — Dec 2022",
      company: "HK Malaysian Student Assoc.",
      role: "Webmaster",
      location: "Hong Kong",
      type: "activity",
      description: [
        "Built a student portal to connect and support Malaysian students studying in Hong Kong, featuring community forums and resources.",
        "Originally built with PHP, MySQL & vanilla JS — later led the migration to a modern React frontend.",
      ],
      technologies: ["NextJS", "Typescript", "Python", "FastAPI", "PostgreSQL", "PHP"],
    },
    {
      id: "jane-street",
      year: "2020",
      endYear: "2020",
      period: "Oct 2020",
      company: "Jane Street ETC",
      role: "Finalist — Trading Competition",
      location: "Remote",
      type: "activity",
      description: [
        "Led a team of 3 to develop a trading bot in Python, qualifying for the final round of the competition.",
        "Engineered a mean reversion trading strategy using real-time statistical analysis of live market data.",
      ],
      technologies: ["Python"],
    },
    {
      id: "aws-intern",
      year: "2021",
      endYear: "2021",
      period: "Jun 2021 — Sep 2021",
      company: "Amazon Web Services",
      role: "Solutions Architect Intern",
      location: "Kuala Lumpur, Malaysia",
      type: "work",
      description: [
        "Built a mobile app used by Solutions Architects across the ASEAN region to track sales activity, using React Native with a Lambda serverless backend.",
        "Developed proof-of-concept solutions for enterprise customers, demonstrating AWS integrations for data engineering, AI/ML, BI, and web workloads.",
        "Created a social media listening platform analyzing Twitter and Reddit sentiment using React and a fully serverless architecture.",
      ],
      technologies: ["React Native", "Typescript", "AWS", "DynamoDB"],
    },
    {
      id: "socgen",
      year: "2021",
      endYear: "2022",
      period: "Dec 2021 — Feb 2022",
      company: "Societe Generale",
      role: "Software Developer Intern",
      location: "Hong Kong",
      type: "work",
      description: [
        "Automated change management and release management (CMRM) workflows by developing Python scripting tools.",
        "Improved CI/CD pipeline automation by containerizing APIs with Docker and implementing end-to-end deployment workflows.",
        "Built REST APIs and migrated legacy SOAP services to RESTful standards.",
      ],
      technologies: ["Python", "Docker"],
    },
    {
      id: "luda",
      year: "2022",
      endYear: "2025",
      period: "Feb 2022 — Jan 2025",
      company: "Luda & Genius Development",
      role: "Head of Engineering (prev. Part-time SWE)",
      location: "Kowloon, Hong Kong",
      type: "work",
      description: [
        "Contributed to the technical prospectus for the company's IPO on Nasdaq (NASDAQ: LUD).",
        "Promoted from part-time Software Engineer to Head of Engineering, leading all technical initiatives across multiple business units.",
        "Spearheaded and built an internal HR & Claims management system, coordinating requirements across multiple management teams.",
        "Developed analytics and reporting dashboards for real-time monitoring of business and staff KPIs.",
        "Built an intelligent CRM automating RFP/RFQ workflows — leveraged LLMs to parse inbound emails and messages, cutting response times from hours to minutes.",
        "Led the digitalization of tuition center operations, replacing paper-based and Excel-driven workflows — saving approximately 160 man-hours per month.",
        "Built an internal platform managing class scheduling, learning progress, and POS payment operations for 1,000+ students.",
        "Developed a Learning Management System featuring video processing, automated transcriptions, and multi-language translations powered by OpenAI.",
      ],
      technologies: [
        "Golang",
        "Typescript",
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Redis",
        "NextJS",
        "TailwindCSS",
        "Stripe",
        "AWS",
        "Docker",
        "SQLite",
        "OpenAI",
        "Cloudflare",
        "FFmpeg",
      ],
    },
    {
      id: "aws-full",
      year: "2022",
      endYear: "2023",
      period: "Aug 2022 — Aug 2023",
      company: "Amazon Web Services",
      role: "Cloud Solutions Architect",
      location: "Kuala Lumpur, Malaysia",
      type: "work",
      description: [
        "Designed cloud architectures and migration strategies for data-sensitive and critical government-sector workloads.",
        "Delivered AWS training to technical teams covering compute, databases, data warehouses, and event-driven architectures.",
        "Built internal tools including a reusable asset platform for the ASEAN team and a BI dashboard monitoring storage usage across Malaysia.",
        "Contributed to the cloud migration strategy that enabled customers for the AWS Kuala Lumpur Region Launch.",
      ],
      technologies: [
        "AWS",
        "Terraform",
        "Typescript",
        "Golang",
        "DynamoDB",
        "PostgreSQL",
        "Docker",
      ],
    },
    {
      id: "lean-social",
      year: "2022",
      endYear: "2023",
      period: "Apr 2022 — Mar 2023",
      company: "Lean Social",
      role: "Tech Co-founder",
      location: "Remote",
      type: "work",
      description: [
        "Co-founded a study streaming platform that gamifies learning — students earn tokens by studying, collaborating, and helping others.",
        "Awarded the Hong Kong Cyberport Incubation Program 2023 and UII Startup Incubator grants, securing a combined HKD 300,000 in funding.",
        "Engineered a mesh-based WebRTC streaming architecture enabling low-latency, peer-to-peer video connections between students.",
        "Built a computer vision pipeline to detect user focus — trained a custom CV model from scratch and deployed it for real-time inference.",
      ],
      technologies: [
        "React",
        "Typescript",
        "AWS",
        "Python",
        "FastAPI",
        "Golang",
        "WebRTC",
        "DynamoDB",
        "Scikit-learn",
        "PyTorch",
      ],
    },
    {
      id: "nika",
      year: "2023",
      endYear: "2023",
      period: "Jan 2023 — May 2023",
      company: "Nika.eco",
      role: "Founding Engineer & UI/UX Designer",
      location: "Remote",
      type: "work",
      description: [
        "Founding engineer at a Miracle Plus (formerly YCombinator China) backed startup focused on carbon markets due diligence.",
        "Architected the cloud infrastructure and tech stack from scratch, designed the UI/UX, and built core design systems with reusable React components.",
      ],
      technologies: [
        "Next.js",
        "Typescript",
        "TailwindCSS",
        "Supabase",
        "PostgreSQL",
        "AWS",
        "OpenAI",
      ],
    },
    {
      id: "consensus-hackathon",
      year: "2025",
      endYear: "2025",
      period: "2025",
      company: "Consensus 2025 Aptos Hackathon",
      role: "1st Runner Up — HealthDB",
      location: "Remote",
      type: "activity",
      description: [
        "Built HealthDB — a local-first, GDPR and HIPAA compliant personal health data platform that aggregates data from wearables (Oura, Apple Health), medical devices, and conversations.",
        'Implemented a conversational interface allowing users to discover insights by "talking" to their health data — generating personalized diet plans, symptom analysis, and condition monitoring.',
        "Built a probabilistically-weighted Monte Carlo Tree Search (MCTS) engine to generate contextually rich, accurate, and scored health recommendations.",
        "Designed a structured, local-first medical history system that summarizes, extracts, and collates every dimension of a user's health data.",
      ],
      technologies: ["Typescript", "React", "OpenAI", "Aptos"],
    },
    {
      id: "likelabs",
      year: "2025",
      endYear: "Present",
      period: "Feb 2025 — Present",
      company: "LikeLabs.io",
      role: "Senior Fullstack Engineer",
      location: "Remote",
      type: "work",
      description: [
        "Architected and built a content-heavy platform serving terabytes of video and image assets monthly.",
        "Optimized the media processing pipeline with FFmpeg, achieving up to 80% reduction in overall media bandwidth.",
        "Designed and integrated a durable workflows engine, dramatically improving the reliability of business-critical code paths.",
        "Developed AI Agents powering voice synthesis and image/video generation for AI avatars.",
        "Implemented end-to-end observability with OpenTelemetry across HTTP handler spans, structured logging, and server utilization metrics — significantly accelerating bug discovery and resolution times.",
        "Integrated Web3 payment flows using Solana blockchain.",
        "Built a hybrid recommendation system combining text and image vector embeddings for personalized content discovery.",
      ],
      technologies: [
        "Typescript",
        "Next.js",
        "React",
        "SQLite",
        "Bun",
        "FFmpeg",
        "Solana",
        "OpenAI",
        "Meilisearch",
      ],
    },
  ] as Experience[]
).sort((a, b) => {
  const endA = a.endYear === "Present" ? 9999 : parseInt(a.endYear);
  const endB = b.endYear === "Present" ? 9999 : parseInt(b.endYear);
  if (endB !== endA) return endB - endA;
  return parseInt(b.year) - parseInt(a.year);
});

// ─── Components ──────────────────────────────────────────────────

function TechBadge({ name }: { name: string }) {
  const iconUrl = techMap[name];
  const [iconError, setIconError] = useState(false);

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#151515] border border-[#222] rounded-md hover:border-[#444] hover:bg-[#1a1a1a] transition-all duration-200 shrink-0">
      {iconUrl && !iconError ? (
        <img
          src={iconUrl}
          alt={name}
          className="w-4 h-4 object-contain"
          onError={() => setIconError(true)}
          loading="lazy"
        />
      ) : null}
      <span className="text-[11px] font-mono text-[#999] whitespace-nowrap">{name}</span>
    </div>
  );
}

function FilmFrame({
  exp,
  isSelected,
  onClick,
  onMount,
}: {
  exp: Experience;
  isSelected: boolean;
  onClick: () => void;
  onMount?: (el: HTMLButtonElement | null) => void;
}) {
  const typeStyles = {
    work: "text-emerald-400 bg-emerald-400/10",
    education: "text-blue-400 bg-blue-400/10",
    activity: "text-amber-400 bg-amber-400/10",
  };
  const typeLabels = { work: "WORK", education: "EDU", activity: "EVENT" };

  return (
    <button
      ref={onMount}
      onClick={onClick}
      className={[
        "w-[210px] min-w-[210px] h-[130px] p-3.5 flex flex-col gap-1.5",
        "bg-[#1a1a1a] border cursor-pointer transition-all duration-200",
        "font-mono text-left",
        isSelected
          ? "border-white shadow-[0_0_0_1px_white,0_0_24px_rgba(255,255,255,0.08)] bg-[#1e1e1e]"
          : "border-[#2a2a2a] hover:bg-[#222] hover:border-[#444]",
      ].join(" ")}
    >
      <div className="flex items-end gap-1.5">
        <div
          className={`text-[20px] md:text-[28px] font-bold leading-none tracking-tight ${exp.endYear === "Present" ? "text-emerald-400" : "text-[#ededed]"}`}
        >
          {exp.endYear}
        </div>
        {exp.endYear !== exp.year && (
          <div className="text-[11px] md:text-[13px] text-[#555] mb-0.5 md:mb-1 leading-none">
            &larr; {exp.year}
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-[#ededed] truncate w-full">{exp.company}</span>
      <span className="text-[10px] text-[#888] truncate w-full">{exp.role}</span>
      <span
        className={`text-[8px] font-semibold tracking-[1.5px] uppercase px-1.5 py-0.5 rounded-sm w-fit mt-auto ${typeStyles[exp.type]}`}
      >
        {typeLabels[exp.type]}
      </span>
    </button>
  );
}

function DetailPanel({ experience }: { experience: Experience }) {
  return (
    <div
      key={experience.id}
      className="px-8 py-8 md:px-16 lg:px-24 max-w-5xl"
      style={{ animation: "fadeIn 0.35s ease-out" }}
    >
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#ededed] mb-1">
          {experience.role}
        </h2>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm">
          <span className="text-[#ededed]">{experience.company}</span>
          <span className="text-[#333]">/</span>
          <span className="text-[#888]">{experience.period}</span>
          <span className="text-[#333]">/</span>
          <span className="text-[#666]">{experience.location}</span>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-3 mb-10">
        {experience.description.map((bullet, i) => (
          <div key={i} className="relative pl-5 text-[#999] leading-relaxed text-sm">
            <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-[#333]" />
            {bullet}
          </div>
        ))}
      </div>

      {/* Technologies */}
      {experience.technologies.length > 0 && (
        <div>
          <h3 className="font-mono text-[11px] font-semibold tracking-[2px] uppercase text-[#555] mb-3">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Collect unique technologies across all experiences
const allTechnologies = Array.from(new Set(experiences.flatMap((e) => e.technologies)));

// ─── Main App ────────────────────────────────────────────────────
export function App() {
  const [selectedId, setSelectedId] = useState(experiences[0]?.id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const selected = experiences.find((e) => e.id === selectedId)!;

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
    // Scroll the selected frame into view
    const el = frameRefs.current.get(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-6 py-3 font-mono bg-[#111] border-b border-[#1a1a1a] shrink-0">
        <span className="text-sm font-bold tracking-wide text-[#ededed]">ZIHAO LAM</span>
        <div className="flex items-center gap-4">
          <a
            href="mailto:lamzihao98@gmail.com"
            className="text-xs text-[#888] hover:text-[#ededed] transition-colors no-underline hidden sm:inline"
          >
            lamzihao98@gmail.com
          </a>
          <a
            href="https://github.com/zihaolam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#888] hover:text-[#ededed] transition-colors no-underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/zihaolam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#888] hover:text-[#ededed] transition-colors no-underline"
          >
            LinkedIn
          </a>
        </div>
      </div>

      {/* ── Film Strip ── */}
      <div className="bg-[#111] border-b border-[#222] shrink-0 relative z-10">
        {/* Shadow cast below */}
        <div className="absolute -bottom-5 left-0 right-0 h-5 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        <div
          ref={scrollRef}
          className="overflow-x-auto overflow-y-hidden [scrollbar-width:thin] [scrollbar-color:#333_transparent]"
        >
          <div className="min-w-fit">
            <div className="flex gap-2 px-3 py-1">
              {experiences.map((exp) => (
                <FilmFrame
                  key={exp.id}
                  exp={exp}
                  isSelected={exp.id === selectedId}
                  onClick={() => handleSelect(exp.id)}
                  onMount={(el) => {
                    if (el) frameRefs.current.set(exp.id, el);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Detail Panel ── */}
      <div className="flex-1 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#333_transparent]">
        {selected ? (
          <DetailPanel experience={selected} />
        ) : (
          <div className="flex items-center justify-center h-full text-[#555] font-mono text-sm">
            Select a frame to view details
          </div>
        )}
      </div>

      {/* ── Tech Scroll Bar (sticky bottom) ── */}
      <div className="shrink-0 border-t border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="flex gap-2 px-4 py-2.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {allTechnologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
