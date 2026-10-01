import React, { useState } from 'react';
import { Container, Row, Col, Card, ProgressBar, Form, InputGroup } from 'react-bootstrap';
import { Layers, Search, Cpu, Cloud, Shield, CheckCircle, Code, Star } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [skillSearch, setSkillSearch] = useState<string>('');

  const filteredCategories = SKILL_CATEGORIES.map((cat) => {
    const matchingSkills = cat.skills.filter((skill) =>
      skill.name.toLowerCase().includes(skillSearch.toLowerCase())
    );
    return {
      ...cat,
      skills: matchingSkills
    };
  }).filter((cat) => {
    const matchesTab = activeCategory === 'all' || cat.id === activeCategory;
    const hasMatchingSkills = cat.skills.length > 0;
    return matchesTab && hasMatchingSkills;
  });

  return (
    <section id="skills" className="py-20 lg:py-28 relative">
      <Container className="max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
              Capabilities & Proficiencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Technical Stack & Architecture Matrix
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mb-0">
            A comprehensive overview of production competencies honed over 10+ years architecting enterprise distributed backends and high-performance React frontends.
          </p>
        </div>

        {/* Filter Navigation & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              All Domains
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {cat.title.split('&')[0]}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <InputGroup size="sm">
              <InputGroup.Text className="bg-slate-900 border-white/10 text-slate-400">
                <Search className="w-3.5 h-3.5" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search specific skill..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="bg-slate-900 border-white/10 text-slate-200 text-xs placeholder:text-slate-500"
              />
            </InputGroup>
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <Row className="g-4">
          {filteredCategories.map((category) => (
            <Col key={category.id} lg={6}>
              <Card className="h-full bg-slate-900/80 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span>{category.title}</span>
                    </h3>
                    <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/20">
                      {category.skills.length} competencies
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-6">
                    {category.subtitle}
                  </p>

                  {/* Skills List with Progress Bars & Experience */}
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-200 font-medium flex items-center gap-1.5">
                            {skill.name}
                            {skill.featured && (
                              <span title="Core Specialization" className="inline-flex">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400/80" />
                              </span>
                            )}
                          </span>
                          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                            <span>{skill.experienceYears}y exp</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-indigo-400 font-bold tabular-nums">{skill.level}%</span>
                          </div>
                        </div>
                        <ProgressBar
                          now={skill.level}
                          variant="info"
                          className="h-1.5 bg-slate-800 rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>ENTERPRISE PRODUCTION VERIFIED</span>
                  <span className="text-emerald-400">CI/CD TEST PASSING</span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
