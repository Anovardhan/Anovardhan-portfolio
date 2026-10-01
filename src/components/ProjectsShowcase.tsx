import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { ExternalLink, Github, Search, Sparkles, ArrowRight, Star, Cpu, Layers } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types/portfolio';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'systems', label: 'Distributed Systems' },
    { id: 'ai', label: 'AI & Canvas Studios' },
    { id: 'design-systems', label: 'Design Systems' },
    { id: 'fullstack', label: 'Full-Stack Commerce' },
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 lg:py-28 relative">
      <Container className="max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
              Featured Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Selected Engineering Works
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mb-0">
            A curated collection of production platforms focusing on low-latency data ingestion, complex canvas state, and resilient cloud architectures.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-72">
            <InputGroup size="sm">
              <InputGroup.Text className="bg-slate-900 border-white/10 text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Filter by tech or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border-white/10 text-slate-200 text-xs placeholder:text-slate-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-2.5 text-xs text-slate-400 hover:text-white bg-slate-900 border-y border-r border-white/10 rounded-r"
                >
                  ✕
                </button>
              )}
            </InputGroup>
          </div>
        </div>

        {/* Projects Grid (React-Bootstrap Row & Col) */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 border border-white/5 rounded-2xl">
            <p className="text-slate-400 text-sm mb-3">No projects matching your current filter criteria.</p>
            <Button
              variant="outline-glow"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="btn-outline-glow text-xs py-1.5 px-3.5 rounded-lg"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProjects.map((project) => (
              <Col key={project.id} lg={6}>
                <Card className="h-full bg-slate-900/80 border border-white/10 hover:border-indigo-500/40 transition-all duration-300 rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-indigo-950/40 flex flex-col">
                  {/* Media Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                    {/* Category & Stars Overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-indigo-300 uppercase tracking-wider">
                        {project.category}
                      </span>
                      {project.stars && (
                        <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-amber-300 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-300" />
                          <span>{project.stars.toLocaleString()}</span>
                        </span>
                      )}
                    </div>

                    {/* Bottom overlay metrics */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3 text-xs">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="bg-slate-950/90 backdrop-blur-md border border-white/10 rounded px-2 py-1">
                          <span className="text-indigo-300 font-mono font-bold">{m.value}</span>
                          <span className="text-slate-400 text-[10px] ml-1">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Content */}
                  <Card.Body className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-mono mb-1">
                        Year {project.year} · Production Deployed
                      </div>
                      <h3 className="text-xl font-bold text-white font-display group-hover:text-indigo-300 transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs text-indigo-200/80 font-medium mb-3">
                        {project.subtitle}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed line-clamp-2 mb-4">
                        {project.summary}
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 text-[11px] font-mono border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <Button
                        variant="outline-glow"
                        size="sm"
                        onClick={() => setActiveProject(project)}
                        className="btn-outline-glow text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5"
                      >
                        <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Architecture Deep-Dive</span>
                      </Button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors border border-white/5"
                            title="GitHub Repository"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-indigo-400 hover:text-white rounded-lg bg-indigo-950/60 hover:bg-indigo-600 transition-colors border border-indigo-500/30"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        show={!!activeProject}
        onHide={() => setActiveProject(null)}
      />
    </section>
  );
};
