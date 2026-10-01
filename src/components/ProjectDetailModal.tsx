import React, { useState } from 'react';
import { Modal, Button, Tabs, Tab, Row, Col, Table } from 'react-bootstrap';
import { ExternalLink, Github, CheckCircle2, Layers, Cpu, BarChart2, ShieldCheck, X } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  show: boolean;
  onHide: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, show, onHide }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!project) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      scrollable
      className="project-deepdive-modal"
    >
      <Modal.Header className="bg-slate-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-indigo-500" />
          <div>
            <Modal.Title className="text-xl font-bold font-display text-white mb-0.5">
              {project.title}
            </Modal.Title>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="capitalize">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>Year {project.year}</span>
              {project.stars && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>★ {project.stars.toLocaleString()} GitHub stars</span>
                </>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={onHide}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </Modal.Header>

      <Modal.Body className="bg-slate-950 p-6 text-slate-200">
        <Row className="gy-4 mb-6">
          {/* Project Preview Image */}
          <Col lg={7}>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-900 relative aspect-[16/10]">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                <span>Production Architecture Topology</span>
                <span className="font-mono tabular-nums text-emerald-400">STATUS: VERIFIED IN PROD</span>
              </div>
            </div>
          </Col>

          {/* Quick Metrics & Links */}
          <Col lg={5} className="flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-2">
                Executive Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {project.summary}
              </p>

              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Key Performance Indicators
              </h4>
              <div className="grid grid-cols-3 gap-2.5 mb-6">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="bg-slate-900 border border-white/10 rounded-lg p-2.5 text-center">
                    <div className="text-base font-bold font-mono text-indigo-300 tabular-nums">
                      {metric.value}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct External Action Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-4 border-t border-white/10">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent text-xs py-2 px-3.5 flex items-center gap-1.5 rounded-lg flex-1 justify-center"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-glow"
                  className="btn-outline-glow text-xs py-2 px-3.5 flex items-center gap-1.5 rounded-lg flex-1 justify-center"
                >
                  <Github className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Source Repo</span>
                </Button>
              )}
            </div>
          </Col>
        </Row>

        {/* Deep Dive Tabs */}
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || 'overview')}
          className="nav-pills border-b border-white/10 pb-2 mb-4"
        >
          <Tab eventKey="overview" title="Architecture & Blueprint">
            <div className="bg-slate-900/60 border border-white/10 rounded-xl p-5 mt-3 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                  <span>Core Engineering Decisions</span>
                </h4>
                <ul className="space-y-2 text-sm text-slate-300 pl-2">
                  {project.architectureNotes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-500/20">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-1.5">
                    Engineering Challenge
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed mb-0">
                    {project.challenge}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                    Implemented Solution
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed mb-0">
                    {project.solution}
                  </p>
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="tech" title="Technology & Stack Breakdown">
            <div className="bg-slate-900/60 border border-white/10 rounded-xl p-5 mt-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Integrated Technologies & Frameworks</span>
              </h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-0">
                All components are engineered with strict TypeScript typing, comprehensive Jest/Playwright automated test suites, and decoupled state management.
              </p>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>

      <Modal.Footer className="bg-slate-900 border-t border-white/10 px-6 py-3 flex justify-between">
        <span className="text-xs text-slate-500">
          Arch ID: {project.id} · React-Bootstrap Component Architecture
        </span>
        <Button variant="outline-glow" size="sm" onClick={onHide} className="btn-outline-glow text-xs py-1.5 px-4 rounded-lg">
          Close Inspector
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
