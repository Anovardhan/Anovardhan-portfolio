import React, { useState, useEffect } from 'react';
import { Modal, Form, InputGroup } from 'react-bootstrap';
import { Search, ArrowRight, FolderKanban, Cpu, BookOpen, Briefcase, Terminal, X } from 'lucide-react';
import { PROJECTS, SKILL_CATEGORIES, ARTICLES, WORK_EXPERIENCES } from '../data/portfolioData';

interface SearchPaletteModalProps {
  show: boolean;
  onHide: () => void;
  onSelectProject?: (projectId: string) => void;
}

export const SearchPaletteModal: React.FC<SearchPaletteModalProps> = ({ show, onHide }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle trigger handled externally
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cleanQuery = query.toLowerCase().trim();

  const matchingProjects = PROJECTS.filter(
    (p) =>
      p.title.toLowerCase().includes(cleanQuery) ||
      p.subtitle.toLowerCase().includes(cleanQuery) ||
      p.techStack.some((t) => t.toLowerCase().includes(cleanQuery))
  );

  const matchingSkills = SKILL_CATEGORIES.flatMap((c) => c.skills).filter((s) =>
    s.name.toLowerCase().includes(cleanQuery)
  );

  const matchingArticles = ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(cleanQuery) ||
      a.summary.toLowerCase().includes(cleanQuery) ||
      a.tags.some((t) => t.toLowerCase().includes(cleanQuery))
  );

  const matchingExperiences = WORK_EXPERIENCES.filter(
    (e) =>
      e.role.toLowerCase().includes(cleanQuery) ||
      e.company.toLowerCase().includes(cleanQuery) ||
      e.techUsed.some((t) => t.toLowerCase().includes(cleanQuery))
  );

  const totalMatches =
    matchingProjects.length + matchingSkills.length + matchingArticles.length + matchingExperiences.length;

  const navigateTo = (sectionId: string) => {
    onHide();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="search-palette-modal"
    >
      <div className="bg-slate-900 border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
        {/* Search Input Bar */}
        <div className="p-4 bg-slate-950 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, skills, articles, stack (e.g., WebGL, React 19, Latency, Go)..."
            className="w-full bg-transparent border-none outline-none text-white text-sm font-sans placeholder:text-slate-500 focus:ring-0"
          />
          <button
            onClick={onHide}
            className="p-1 text-slate-400 hover:text-white rounded-lg bg-white/5"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-4">
          {!cleanQuery ? (
            <div className="py-8 text-center text-xs text-slate-500 space-y-2">
              <div className="font-medium text-slate-400">Quick Navigation Suggestions:</div>
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {['Projects', 'Playground', 'Skills', 'Experience', 'Articles', 'Contact'].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => navigateTo(sec.toLowerCase())}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors border border-white/5"
                  >
                    Go to #{sec}
                  </button>
                ))}
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No results found matching "{query}". Try searching for <span className="text-indigo-300">"React"</span>, <span className="text-indigo-300">"Latency"</span>, or <span className="text-indigo-300">"Token"</span>.
            </div>
          ) : (
            <>
              {/* Projects Section */}
              {matchingProjects.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <FolderKanban className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Projects ({matchingProjects.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => navigateTo('projects')}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-white/5 hover:border-indigo-500/30 transition-all flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                            {p.title}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">
                            {p.subtitle}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Section */}
              {matchingSkills.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Skills & Technologies ({matchingSkills.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {matchingSkills.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => navigateTo('skills')}
                        className="px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-indigo-600 text-xs font-mono text-slate-300 hover:text-white border border-white/5 transition-colors"
                      >
                        {s.name} · <span className="text-indigo-400 font-bold">{s.level}%</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Section */}
              {matchingArticles.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Technical Articles ({matchingArticles.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingArticles.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => navigateTo('writings')}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-white/5 flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                            {a.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {a.publication} · {a.readTime}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {matchingExperiences.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Career Roles ({matchingExperiences.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingExperiences.map((e) => (
                      <button
                        key={e.id}
                        onClick={() => navigateTo('experience')}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-white/5 flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                            {e.role} @ {e.company}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {e.period} · {e.impactMetric.value}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10 text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10 text-[10px]">⌘K</kbd>
            <span>/</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10 text-[10px]">Ctrl+K</kbd>
          </div>
        </div>
      </div>
    </Modal>
  );
};
