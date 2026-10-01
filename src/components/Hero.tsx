import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { ArrowDown, Terminal, CheckCircle2, Sparkles, Github, Linkedin, Twitter, Copy, Check, Play } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenContact }) => {
  const [terminalInput, setTerminalInput] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<Array<{ cmd?: string; text: string; type?: 'info' | 'success' | 'warn' | 'dim' }>>([
    { text: 'Devin Vance System Shell v4.2 [Kernel: React 19.x & Bootstrap 5]', type: 'dim' },
    { text: 'Status: Principal Systems Architect · Available for Advisory/Staff Roles', type: 'info' },
    { text: 'Type a command or click quick actions below:', type: 'dim' }
  ]);

  const handleCommand = (commandText: string) => {
    const cmd = commandText.trim().toLowerCase();
    if (!cmd) return;

    let response: Array<{ text: string; type?: 'info' | 'success' | 'warn' | 'dim' }> = [];

    switch (cmd) {
      case 'whoami':
        response = [
          { text: 'DEVIN VANCE — Principal Systems Architect & Full-Stack Engineer', type: 'success' },
          { text: 'Specializing in high-throughput distributed architectures, React performance, and production LLM orchestration.', type: 'info' },
          { text: 'Location: San Francisco, CA (Open to global remote)', type: 'dim' }
        ];
        break;
      case 'stack':
      case 'tech':
        response = [
          { text: 'CORE STACK INVENTORY:', type: 'info' },
          { text: '• Frontend: React 19, TypeScript, React-Bootstrap, Tailwind CSS, WebGL', type: 'success' },
          { text: '• Distributed & Backend: Node.js, Go, Python FastAPI, PostgreSQL, Redis, Kafka', type: 'success' },
          { text: '• Cloud & Ops: Kubernetes, GCP, AWS, Docker, Terraform, CI/CD', type: 'success' }
        ];
        break;
      case 'benchmarks':
      case 'perf':
        response = [
          { text: 'PRODUCTION BENCHMARKS & RELIABILITY METRICS:', type: 'info' },
          { text: '• Krypton Terminal: 50,000 msg/sec with 4.2ms P99 latency in WebGL', type: 'success' },
          { text: '• Apex Cloud Ingress: -64% P99 latency across 18 distributed regions', type: 'success' },
          { text: '• System SLA Uptime: 99.995% over consecutive rolling 36 months', type: 'success' }
        ];
        break;
      case 'contact':
        response = [
          { text: `Direct Email: ${PERSONAL_INFO.email}`, type: 'success' },
          { text: 'LinkedIn: linkedin.com/in/devin-vance-arch', type: 'info' },
          { text: 'GitHub: github.com/devin-vance', type: 'info' }
        ];
        break;
      case 'clear':
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      case 'help':
      default:
        if (cmd === 'help') {
          response = [
            { text: 'Available commands: whoami, stack, benchmarks, contact, clear', type: 'info' }
          ];
        } else {
          response = [
            { text: `Command not recognized: "${cmd}". Type "help" or click quick commands below.`, type: 'warn' }
          ];
        }
    }

    setTerminalLogs((prev) => [
      ...prev,
      { cmd, text: `> ${commandText}`, type: 'dim' },
      ...response
    ]);
    setTerminalInput('');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-10 w-[400px] h-[400px] bg-sky-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <Container className="max-w-7xl">
        <Row className="gy-5 align-items-center">
          {/* Left Column: Editorial Headline & Bio */}
          <Col lg={7} className="text-left">
            {/* Availability status line (Clean unboxed text with separator) */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/20 text-xs font-medium text-indigo-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{PERSONAL_INFO.availability}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 font-display" style={{ textWrap: 'balance' }}>
              Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-indigo-400">High-Throughput</span> Distributed Systems & React Frontends.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mb-8 font-light">
              Hi, I’m <strong className="font-semibold text-white">{PERSONAL_INFO.name}</strong>. A Principal Engineer and Systems Architect building zero-friction Web applications, WebGL visualizers, and resilient cloud backends scaling to tens of millions of users.
            </p>

            {/* Quick Interactive Actions */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <Button
                onClick={scrollToProjects}
                className="btn-accent px-5 py-2.5 text-sm rounded-lg flex items-center gap-2"
              >
                <span>Explore Selected Works</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </Button>

              <Button
                variant="outline-glow"
                onClick={onOpenResume}
                className="btn-outline-glow px-4 py-2.5 text-sm rounded-lg flex items-center gap-2"
              >
                <span>View Full CV / Resume</span>
              </Button>

              <Button
                variant="outline-glow"
                onClick={handleCopyEmail}
                className="btn-outline-glow px-3.5 py-2.5 text-sm rounded-lg flex items-center gap-2"
                title="Copy Direct Email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied Email</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Email</span>
                  </>
                )}
              </Button>
            </div>

            {/* Quantitative Rigor Proof Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  10+ <span className="text-indigo-400 text-lg">Yrs</span>
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Engineering Exp</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  {PERSONAL_INFO.systemsBuilt}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Production Systems</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums text-emerald-400">
                  {PERSONAL_INFO.uptimeRecord}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Historical SLA Uptime</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  {PERSONAL_INFO.patentsCount}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-0.5">Granted Patents</div>
              </div>
            </div>
          </Col>

          {/* Right Column: Avatar & Interactive Live Terminal */}
          <Col lg={5}>
            <div className="relative">
              {/* Profile Card Lockup */}
              <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-xl mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-indigo-500/40 shrink-0">
                    <img
                      src={PERSONAL_INFO.avatarUrl}
                      alt={PERSONAL_INFO.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-bold text-white font-display truncate mb-0.5">
                      {PERSONAL_INFO.name}
                    </h2>
                    <p className="text-xs text-indigo-300 font-medium truncate mb-1">
                      {PERSONAL_INFO.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>San Francisco</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-400">Available for advisory</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Shell Terminal */}
              <div className="bg-slate-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="bg-slate-900/90 px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-xs font-mono text-slate-400 ml-2">devin@arch-node:~</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCommand('clear')}
                      className="text-[11px] font-mono text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10"
                    >
                      clear
                    </button>
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-4 font-mono text-xs max-h-56 overflow-y-auto space-y-1.5 scrollbar-thin">
                  {terminalLogs.map((log, index) => (
                    <div
                      key={index}
                      className={`leading-relaxed break-words ${
                        log.type === 'success'
                          ? 'text-emerald-400 font-medium'
                          : log.type === 'warn'
                          ? 'text-amber-300'
                          : log.type === 'info'
                          ? 'text-indigo-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {log.text}
                    </div>
                  ))}

                  {/* Prompt line */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCommand(terminalInput);
                    }}
                    className="flex items-center gap-2 pt-1"
                  >
                    <span className="text-indigo-400 font-bold">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="try: whoami, stack, benchmarks, contact"
                      className="w-full bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-slate-600 focus:ring-0"
                    />
                  </form>
                </div>

                {/* Quick Action Button Bar */}
                <div className="p-2.5 bg-slate-900/60 border-t border-white/5 flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-slate-500 font-mono self-center mr-1">Quick:</span>
                  {['whoami', 'stack', 'benchmarks', 'contact'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => handleCommand(cmd)}
                      className="px-2 py-1 text-[11px] font-mono rounded bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors border border-white/5 flex items-center gap-1"
                    >
                      <Play className="w-2.5 h-2.5 text-indigo-400" />
                      <span>{cmd}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
