import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, ChevronDown } from 'lucide-react';
import { WORK_EXPERIENCES } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('0');

  return (
    <section id="experience" className="py-20 lg:py-28 bg-slate-950/40 relative">
      <Container className="max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
              Career Trajectory & Impact
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Work Experience & Milestones
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mb-0">
            A track record of technical leadership, architectural stewardship, and cross-functional execution across hyper-growth teams.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-6">
          {WORK_EXPERIENCES.map((exp, index) => (
            <Card
              key={exp.id}
              className="bg-slate-900/80 border border-white/10 hover:border-indigo-500/30 transition-all rounded-2xl p-6 shadow-xl"
            >
              <Row className="gy-4 align-items-start">
                {/* Left Meta Column */}
                <Col lg={4}>
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400">{exp.type}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-1">
                    {exp.role}
                  </h3>

                  <div className="text-base font-semibold text-slate-200 mb-2">
                    {exp.company}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.location}</span>
                  </div>

                  {/* High-Intent Impact Metric Box */}
                  <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-3.5 inline-block w-full">
                    <div className="text-xs uppercase tracking-wider text-slate-400 mb-0.5">
                      {exp.impactMetric.label}
                    </div>
                    <div className="text-xl font-mono font-extrabold text-indigo-300 tabular-nums">
                      {exp.impactMetric.value}
                    </div>
                  </div>
                </Col>

                {/* Right Description & Achievements Column */}
                <Col lg={8}>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Key Architectural Deliverables
                  </h4>

                  <ul className="space-y-2.5 mb-6">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-white/5">
                    <span className="text-[11px] font-mono text-slate-500 mr-1">Stack:</span>
                    {exp.techUsed.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
