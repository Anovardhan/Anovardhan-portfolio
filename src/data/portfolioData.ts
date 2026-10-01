import { Project, WorkExperience, SkillCategory, Article, Testimonial } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Anovardhan',
  title: 'Principal Software Engineer & Systems Architect',
  shortBio: 'Specializing in high-throughput distributed systems, modern React frontends, and production AI orchestration. Over 10 years scaling platforms from zero to 25M+ active users.',
  location: 'San Francisco, CA (Open to Remote)',
  email: 'anovardhan18@gmail.com',
  github: 'https://github.com/anovardhan',
  linkedin: 'https://linkedin.com/in/anovardhan',
  twitter: 'https://x.com/anovardhan',
  avatarUrl: '/src/assets/images/hero_avatar_portrait_1790837924816.jpg',
  yearsOfExperience: 10,
  patentsCount: 2,
  systemsBuilt: '40+',
  uptimeRecord: '99.995%',
  availability: 'Available for Select Advisory & Lead Architecture Roles (Q4 2026)',
};

export const PROJECTS: Project[] = [
  {
    id: 'krypton-terminal',
    title: 'Krypton Market Intelligence Terminal',
    subtitle: 'High-frequency streaming analytics engine and order-book visualization',
    category: 'systems',
    image: '/src/assets/images/project_fintech_platform_1790837939117.jpg',
    summary: 'A sub-10ms latency WebGL trading terminal handling 50,000 WebSocket market ticks per second with zero UI frame drops and real-time risk metrics.',
    challenge: 'Standard React component trees choked on raw Level-2 orderbook streams with frequent garbage collection pauses and canvas stuttering.',
    solution: 'Engineered an offscreen WebWorker ring buffer with WebGL2 instanced rendering pipeline and zero-copy binary serialization using Protobuf over WebSockets.',
    architectureNotes: [
      'Zero-allocation message deserializer in WebAssembly',
      'Custom React virtual windowing with canvas frame sync',
      'Dual WebSocket failover cluster with raft consensus backend'
    ],
    metrics: [
      { label: 'Latency', value: '4.2ms' },
      { label: 'Throughput', value: '50k ops/sec' },
      { label: 'Frame Rate', value: '60 fps solid' }
    ],
    techStack: ['React', 'TypeScript', 'WebGL', 'WebAssembly', 'WebSockets', 'Go', 'Redis'],
    featured: true,
    githubUrl: 'https://github.com/anovardhan/krypton-terminal',
    liveUrl: 'https://krypton-demo.anovardhan.io',
    stars: 1420,
    year: '2026'
  },
  {
    id: 'synapse-ai-canvas',
    title: 'Synapse Spatial AI Studio',
    subtitle: 'Node-based multi-agent workflow engine & collaborative LLM canvas',
    category: 'ai',
    image: '/src/assets/images/project_ai_workspace_1790837949996.jpg',
    summary: 'An infinite collaborative canvas allowing engineering teams to design, chain, and benchmark multi-agent AI execution graphs in real time.',
    challenge: 'Synchronizing multi-agent streaming state across distributed participants with optimistic graph reconciliation without race conditions.',
    solution: 'Designed a CRDT-backed directed acyclic graph (DAG) scheduler with server-sent event (SSE) multiplexing and real-time token cost estimation.',
    architectureNotes: [
      'Yjs CRDT for peer-to-peer real-time node dragging and state sync',
      'Streaming token parser with auto-repairing JSON parser for tool calls',
      'React Flow customized with custom WebGL edge connector shaders'
    ],
    metrics: [
      { label: 'Team Adoption', value: '14,000+ devs' },
      { label: 'Graph Ops/s', value: '1,200 nodes' },
      { label: 'Sync Latency', value: '<25ms' }
    ],
    techStack: ['React 19', 'React-Bootstrap', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'Gemini API'],
    featured: true,
    githubUrl: 'https://github.com/anovardhan/synapse-ai-studio',
    liveUrl: 'https://synapse.anovardhan.io',
    stars: 2850,
    year: '2025'
  },
  {
    id: 'strata-design-tokens',
    title: 'Strata Enterprise Token & Component Suite',
    subtitle: 'Multi-brand design system architecture for 40+ engineering squads',
    category: 'design-systems',
    image: '/src/assets/images/project_design_system_1790837962822.jpg',
    summary: 'An enterprise design token compiler and headless accessible component architecture powering over 40 production apps with automated WCAG AA audits.',
    challenge: 'Massive fragmentation across brand acquisitions with 8 different legacy UI frameworks causing UI inconsistency and accessibility compliance risks.',
    solution: 'Architected a token pipeline utilizing Style Dictionary and custom AST transformers that generates type-safe theme artifacts for React, Tailwind, and React-Bootstrap.',
    architectureNotes: [
      'Automated visual regression testing via Playwright & headless Chrome',
      'Sub-millisecond dynamic theme switching with CSS Variables and PostCSS',
      'Strict TypeScript generic prop polymorphism with zero runtime overhead'
    ],
    metrics: [
      { label: 'Brand Rollouts', value: '8 Brands' },
      { label: 'Accessibility Score', value: '100% WCAG AA' },
      { label: 'Dev Velocity', value: '+45% Faster' }
    ],
    techStack: ['React', 'React-Bootstrap', 'Tailwind CSS', 'TypeScript', 'Storybook', 'Vite'],
    featured: true,
    githubUrl: 'https://github.com/anovardhan/strata-design-system',
    liveUrl: 'https://strata.anovardhan.io',
    stars: 940,
    year: '2025'
  },
  {
    id: 'atelier-arch-commerce',
    title: 'Atelier Minimalist Architecture Commerce',
    subtitle: 'Headless global storefront with instant micro-frontend caching',
    category: 'fullstack',
    image: '/src/assets/images/project_ecommerce_editorial_1790837975777.jpg',
    summary: 'High-end architectural goods and furniture editorial e-commerce platform with 99 Core Web Vitals score and edge server-side personalization.',
    challenge: 'Heavy editorial photography and interactive 3D spatial models caused bounce rates on mobile network connections.',
    solution: 'Implemented responsive AVIF/WebP adaptive streaming, Cloudflare Workers edge caching, and progressive hydration with micro-animations.',
    architectureNotes: [
      'Edge geo-distributed shopping cart with optimistic rollback',
      'Custom React-Bootstrap responsive grid with fluid clamp typography',
      'Stripe Payment Elements with automated tax localization'
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '99 / 100' },
      { label: 'Conversion Lift', value: '+32.4%' },
      { label: 'TTFB at Edge', value: '18ms' }
    ],
    techStack: ['React', 'Next.js / Vite', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind'],
    featured: true,
    githubUrl: 'https://github.com/anovardhan/atelier-commerce',
    liveUrl: 'https://atelier.anovardhan.io',
    stars: 670,
    year: '2024'
  }
];

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'exp-1',
    role: 'Principal Software Architect',
    company: 'Apex Cloud Platforms',
    location: 'San Francisco, CA',
    period: '2023 — Present',
    type: 'Full-time',
    description: 'Directing core platform architecture for serverless compute mesh and developer tooling supporting 2.4B monthly API calls.',
    achievements: [
      'Spearheaded migration from monolithic ingress to distributed Envoy mesh, reducing P99 latency by 64% across 18 cloud regions.',
      'Authored the company-wide frontend standard using React 19, React-Bootstrap, and Tailwind, unifying 24 separate internal products.',
      'Mentored 32 senior and staff engineers across North America and Europe, establishing RFC architecture review councils.'
    ],
    techUsed: ['React 19', 'TypeScript', 'Go', 'Rust', 'Kubernetes', 'GraphQL', 'Kafka'],
    impactMetric: {
      value: '-64% P99 Latency',
      label: 'Global Mesh Optimization'
    }
  },
  {
    id: 'exp-2',
    role: 'Staff Frontend Engineer & Tech Lead',
    company: 'Vertex AI Laboratories',
    location: 'Palo Alto, CA',
    period: '2020 — 2023',
    type: 'Full-time',
    description: 'Led a cross-functional squad of 14 engineers delivering enterprise generative AI interfaces, streaming visualization, and token management consoles.',
    achievements: [
      'Created real-time streaming token renderer that eliminated browser main-thread freezes during massive 128k context LLM outputs.',
      'Delivered self-serve prompt evaluation and testing workbench adopted by 85 enterprise Fortune 500 customers.',
      'Cut frontend bundle size by 58% through fine-grained code-splitting, tree-shaking, and custom chunk allocation.'
    ],
    techUsed: ['React', 'React-Bootstrap', 'TypeScript', 'Python', 'WebSockets', 'Tailwind', 'Docker'],
    impactMetric: {
      value: '85+ Enterprises',
      label: 'Direct Platform Adoption'
    }
  },
  {
    id: 'exp-3',
    role: 'Senior Full-Stack Engineer',
    company: 'Hyperion FinTech Systems',
    location: 'New York, NY',
    period: '2017 — 2020',
    type: 'Full-time',
    description: 'Built high-throughput institutional trading dashboards, compliance audit tools, and real-time ledger verification microservices.',
    achievements: [
      'Constructed WebGL orderbook chart engine executing 60fps renders under volatile market surges.',
      'Designed zero-downtime database partitioning scheme for PostgreSQL handling 800M transaction records.',
      'Led SOC2 Type II security compliance implementation and cryptographic audit logs.'
    ],
    techUsed: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Jest'],
    impactMetric: {
      value: '$4.2B Daily Vol',
      label: 'Processed Volume'
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend & UI Architecture',
    subtitle: 'State machines, virtual DOM performance, accessibility, modern styling',
    skills: [
      { name: 'React 19 & Next.js', level: 98, experienceYears: 9, featured: true },
      { name: 'React-Bootstrap & Bootstrap 5', level: 95, experienceYears: 8, featured: true },
      { name: 'TypeScript & Type Systems', level: 96, experienceYears: 8, featured: true },
      { name: 'Tailwind CSS & Token Systems', level: 94, experienceYears: 6, featured: true },
      { name: 'State Management (Zustand / Redux)', level: 92, experienceYears: 7 },
      { name: 'WebGL & Canvas Rendering', level: 85, experienceYears: 4 },
      { name: 'Web Performance & Core Web Vitals', level: 95, experienceYears: 8, featured: true }
    ]
  },
  {
    id: 'backend',
    title: 'Distributed Systems & Backend',
    subtitle: 'Microservices, concurrent pipelines, event streaming, data modeling',
    skills: [
      { name: 'Node.js & Express / Fastify', level: 95, experienceYears: 10, featured: true },
      { name: 'Go (Golang)', level: 88, experienceYears: 5, featured: true },
      { name: 'Python & FastAPI', level: 86, experienceYears: 6 },
      { name: 'PostgreSQL & Drizzle / Prisma', level: 92, experienceYears: 8, featured: true },
      { name: 'Redis & In-Memory Caches', level: 90, experienceYears: 7 },
      { name: 'Apache Kafka & Event Queues', level: 84, experienceYears: 5 },
      { name: 'GraphQL & gRPC Protocols', level: 88, experienceYears: 6 }
    ]
  },
  {
    id: 'cloud-ai',
    title: 'Cloud, DevOps & AI Integration',
    subtitle: 'Containerization, orchestration, LLM pipelines, CI/CD observability',
    skills: [
      { name: 'Docker & Kubernetes', level: 90, experienceYears: 7, featured: true },
      { name: 'Google Cloud Platform (GCP)', level: 92, experienceYears: 8, featured: true },
      { name: 'AWS Cloud Architecture', level: 88, experienceYears: 7 },
      { name: 'LLM Prompt Chaining & Gemini API', level: 94, experienceYears: 3, featured: true },
      { name: 'CI/CD & GitHub Actions', level: 92, experienceYears: 8 },
      { name: 'Terraform & Infrastructure as Code', level: 85, experienceYears: 5 }
    ]
  },
  {
    id: 'leadership',
    title: 'Architecture & Engineering Leadership',
    subtitle: 'RFC design, mentorship, system design, cross-functional delivery',
    skills: [
      { name: 'System Design & Distributed Patterns', level: 98, experienceYears: 10, featured: true },
      { name: 'Technical RFCs & Architecture Roadmaps', level: 96, experienceYears: 8, featured: true },
      { name: 'Engineering Mentorship & Hiring', level: 92, experienceYears: 6 },
      { name: 'Security & Compliance (SOC2 / OWASP)', level: 88, experienceYears: 7 }
    ]
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Zero-Allocation WebSocket Deserialization in React 19',
    publication: 'Distributed Systems Quarterly',
    readTime: '6 min read',
    date: 'August 2026',
    summary: 'How to bypass garbage collector jitter during high-frequency market data streams by utilizing WebAssembly shared memory buffers.',
    tags: ['React', 'WebAssembly', 'Performance', 'WebSockets'],
    keyTakeaway: 'Decoupling streaming ingestion from React component render lifecycles reduces frame spikes from 120ms to under 3ms.'
  },
  {
    id: 'art-2',
    title: 'Architecting Enterprise Design Token Systems with React-Bootstrap',
    publication: 'Modern Frontend Architecture',
    readTime: '8 min read',
    date: 'May 2026',
    summary: 'A deep dive into combining semantic tokens, Bootstrap variable maps, and headless accessible hooks across multi-tenant enterprise frontends.',
    tags: ['React-Bootstrap', 'Design Systems', 'CSS Tokens', 'Architecture'],
    keyTakeaway: 'Semantic token aliasing bridges designer Figma exports directly to CSS custom properties with zero manual translation.'
  },
  {
    id: 'art-3',
    title: 'Taming the Storm: Multi-Agent Consensus on Graph Workflows',
    publication: 'AI Engineering Insights',
    readTime: '10 min read',
    date: 'February 2026',
    summary: 'Designing deterministic fallback paths and optimistic graph validation when chaining autonomous LLM agents in production.',
    tags: ['AI Agents', 'DAG Scheduler', 'Reliability', 'System Design'],
    keyTakeaway: 'Strict JSON schema contracts paired with fast verification passes prevent cascade hallucinations across agent tool calls.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Elena Rostova',
    role: 'VP of Engineering',
    company: 'Apex Cloud Platforms',
    text: 'Anovardhan is that rare 1-in-1,000 architect who can articulate high-level cloud topologies to our board and then sit down to write flawless, high-throughput React and Go code that handles billions of events.',
    relationship: 'Managed Anovardhan directly at Apex Cloud',
    year: '2026'
  },
  {
    id: 'test-2',
    name: 'Marcus Sterling',
    role: 'Head of Product',
    company: 'Vertex AI Labs',
    text: 'Our enterprise customers constantly praise the fluidity and speed of our AI studio canvas. Anovardhan transformed a clunky prototype into a lightning-fast commercial powerhouse in under four months.',
    relationship: 'Worked closely on AI Product Squads',
    year: '2025'
  },
  {
    id: 'test-3',
    name: 'Sarah Chen-Kim',
    role: 'Staff Infrastructure Architect',
    company: 'Hyperion FinTech',
    text: 'Anovardhan set the engineering standard our teams still follow today. His dedication to low latency, resilient failover systems, and ultra-accessible frontends is unmatched.',
    relationship: 'Collaborated across Core Platform Systems',
    year: '2024'
  }
];
