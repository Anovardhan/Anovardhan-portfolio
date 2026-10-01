export type ProjectCategory = 'all' | 'fullstack' | 'systems' | 'ai' | 'design-systems';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'fullstack' | 'systems' | 'ai' | 'design-systems';
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  architectureNotes: string[];
  metrics: ProjectMetric[];
  techStack: string[];
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  year: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Founding';
  description: string;
  achievements: string[];
  techUsed: string[];
  impactMetric: {
    value: string;
    label: string;
  };
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  experienceYears: number;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface Article {
  id: string;
  title: string;
  publication: string;
  readTime: string;
  date: string;
  summary: string;
  tags: string[];
  url?: string;
  keyTakeaway: string;
  fullContent?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
  relationship: string;
  year: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}
