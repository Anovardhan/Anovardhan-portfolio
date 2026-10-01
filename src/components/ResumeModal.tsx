import React from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import { Printer, Download, Mail, MapPin, Globe, ExternalLink, Award, BookOpen, Briefcase, Code2, X } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCES, SKILL_CATEGORIES, PROJECTS } from '../data/portfolioData';

interface ResumeModalProps {
  show: boolean;
  onHide: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ show, onHide }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const resumePayload = {
      name: PERSONAL_INFO.name,
      title: PERSONAL_INFO.title,
      email: PERSONAL_INFO.email,
      location: PERSONAL_INFO.location,
      summary: PERSONAL_INFO.shortBio,
      experience: WORK_EXPERIENCES,
      skills: SKILL_CATEGORIES,
      patents: [
        'US Patent 11,842,109: Distributed Zero-Copy Binary Deserialization for Web Engines',
        'US Patent 11,498,302: Optimistic Graph State Reconciliation in Multi-Agent Execution Topologies'
      ],
      education: [
        {
          degree: 'B.S. in Computer Science (Magna Cum Laude)',
          institution: 'University of California, Berkeley',
          year: '2016'
        }
      ]
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumePayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Anovardhan_CV_${new Date().getFullYear()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      scrollable
      className="resume-cv-modal"
    >
      <Modal.Header className="bg-slate-900 border-b border-white/10 px-6 py-4 flex items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-indigo-500" />
          <Modal.Title className="text-lg font-bold font-display text-white">
            Curriculum Vitae — {PERSONAL_INFO.name}
          </Modal.Title>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline-glow"
            size="sm"
            onClick={handleDownloadJSON}
            className="btn-outline-glow text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5"
            title="Download JSON Payload"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Export JSON</span>
          </Button>

          <Button
            size="sm"
            onClick={handlePrint}
            className="btn-accent text-xs py-1.5 px-3.5 rounded-lg flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </Button>

          <button
            onClick={onHide}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 ml-2"
            aria-label="Close CV modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </Modal.Header>

      <Modal.Body className="bg-slate-950 p-8 sm:p-12 text-slate-200 printable-resume space-y-8 font-sans">
        {/* CV Header */}
        <div className="border-b border-white/10 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-1">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-base text-indigo-400 font-semibold mb-0">
                {PERSONAL_INFO.title}
              </p>
            </div>
            <div className="text-xs text-slate-400 space-y-1 font-mono sm:text-right">
              <div className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <div className="flex items-center sm:justify-end gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>devinvance.io</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 font-mono">
            01. Executive Summary
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Systems architect and engineering lead with 10+ years specializing in low-latency WebGL/React platforms, distributed messaging fabrics, and fault-tolerant cloud pipelines. Proven track record migrating monoliths to high-throughput Envoy meshes, architecting multi-tenant design systems with React-Bootstrap, and leading high-velocity engineering squads through scale.
          </p>
        </div>

        {/* Work Experience */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 font-mono">
            02. Professional Experience
          </h2>
          <div className="space-y-6">
            {WORK_EXPERIENCES.map((exp) => (
              <div key={exp.id} className="border-l-2 border-indigo-500/40 pl-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-base font-bold text-white mb-0">
                    {exp.role} <span className="text-indigo-400 font-normal">@ {exp.company}</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{exp.period} · {exp.location}</span>
                </div>
                <p className="text-xs text-slate-300 italic mb-2">{exp.description}</p>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="list-disc ml-4">
                      {ach}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1 pt-1">
                  {exp.techUsed.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 text-[10px] font-mono border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Patents */}
        <Row className="gy-6">
          <Col md={6}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3 font-mono">
              03. Education
            </h2>
            <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 space-y-1">
              <div className="text-sm font-bold text-white">B.S. in Computer Science (Magna Cum Laude)</div>
              <div className="text-xs text-indigo-300">University of California, Berkeley</div>
              <div className="text-[11px] text-slate-400 font-mono">2012 — 2016 · Focus in Distributed Systems & Compilers</div>
            </div>
          </Col>

          <Col md={6}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3 font-mono">
              04. Granted Patents
            </h2>
            <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 space-y-2 text-xs text-slate-300">
              <div>
                <strong className="text-white">US Patent 11,842,109:</strong> Zero-Copy Binary Deserialization for Streaming Browser Engines (Granted 2025).
              </div>
              <div>
                <strong className="text-white">US Patent 11,498,302:</strong> Optimistic Graph State Reconciliation in Multi-Agent Execution Topologies (Granted 2024).
              </div>
            </div>
          </Col>
        </Row>

        {/* Certifications & Industry Recognition */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-3 font-mono">
            05. Certifications & Industry Credentials
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-900 border border-white/10 rounded-lg flex items-center gap-2.5">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">AWS Certified Solutions Architect — Professional</div>
                <div className="text-[11px] text-slate-400 font-mono">ID: AWS-PSA-948210 · Active</div>
              </div>
            </div>
            <div className="p-3 bg-slate-900 border border-white/10 rounded-lg flex items-center gap-2.5">
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">Certified Kubernetes Administrator (CKA)</div>
                <div className="text-[11px] text-slate-400 font-mono">ID: CKA-28941-CNCF · Active</div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-slate-900 border-t border-white/10 px-6 py-3 flex justify-between no-print">
        <span className="text-xs text-slate-500">
          Last Updated: Q4 2026 · Verified Production Portfolio
        </span>
        <Button variant="outline-glow" size="sm" onClick={onHide} className="btn-outline-glow text-xs py-1.5 px-4 rounded-lg">
          Close CV Viewer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
