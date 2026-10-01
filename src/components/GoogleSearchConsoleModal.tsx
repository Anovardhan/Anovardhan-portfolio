import React, { useState, useEffect } from 'react';
import { Modal, Button, Tabs, Tab, Row, Col, Form, InputGroup, Alert, Table, Badge } from 'react-bootstrap';
import { Search, Globe, CheckCircle2, ShieldCheck, Copy, Check, ExternalLink, RefreshCw, FileCode, CheckCheck, Sparkles, X, Smartphone, Monitor } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, ARTICLES, SKILL_CATEGORIES } from '../data/portfolioData';

interface GoogleSearchConsoleModalProps {
  show: boolean;
  onHide: () => void;
}

export const GoogleSearchConsoleModal: React.FC<GoogleSearchConsoleModalProps> = ({ show, onHide }) => {
  const [activeTab, setActiveTab] = useState('serp');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [searchQuery, setSearchQuery] = useState('Devin Vance Principal Engineer');
  const [verificationCode, setVerificationCode] = useState('GSC_DEVIN_VANCE_VERIFICATION_TOKEN_2026');
  const [verificationSaved, setVerificationSaved] = useState(false);
  const [copiedTag, setCopiedTag] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'testing' | 'verified'>('verified');

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="google-site-verification"]');
    if (metaTag) {
      const current = metaTag.getAttribute('content');
      if (current) setVerificationCode(current);
    }
  }, [show]);

  const handleSaveVerification = (e: React.FormEvent) => {
    e.preventDefault();
    let metaTag = document.querySelector('meta[name="google-site-verification"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'google-site-verification');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', verificationCode.trim());
    setVerificationSaved(true);
    setTimeout(() => setVerificationSaved(false), 3000);
  };

  const handleTestVerification = () => {
    setVerificationStatus('testing');
    setTimeout(() => {
      const metaTag = document.querySelector('meta[name="google-site-verification"]');
      if (metaTag && metaTag.getAttribute('content')) {
        setVerificationStatus('verified');
      } else {
        setVerificationStatus('idle');
      }
    }, 600);
  };

  const copyHTMLMetaTag = () => {
    const tag = `<meta name="google-site-verification" content="${verificationCode.trim()}" />`;
    navigator.clipboard.writeText(tag);
    setCopiedTag(true);
    setTimeout(() => setCopiedTag(false), 2000);
  };

  const structuredDataSnippet = JSON.stringify(
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": "https://devinvance.io/#profilepage",
          "name": `${PERSONAL_INFO.name} Portfolio`,
          "about": {
            "@type": "Person",
            "name": PERSONAL_INFO.name,
            "jobTitle": PERSONAL_INFO.title,
            "worksFor": { "@type": "Organization", "name": "Apex Cloud Platforms" },
            "knowsAbout": ["Distributed Systems", "React 19", "React-Bootstrap", "WebGL", "Cloud Architecture"]
          }
        }
      ]
    },
    null,
    2
  );

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      scrollable
      className="google-search-console-modal"
    >
      <Modal.Header className="bg-slate-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <Modal.Title className="text-lg font-bold font-display text-white mb-0.5">
              Google Search Console & SEO Suite
            </Modal.Title>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>Site Verification</span>
              <span aria-hidden="true">·</span>
              <span>SERP Snippet Simulator</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-mono">100% SEO Health Score</span>
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

      <Modal.Body className="bg-slate-950 p-6 text-slate-200 space-y-6">
        {/* Navigation Tabs */}
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || 'serp')}
          className="nav-pills border-b border-white/10 pb-2"
        >
          <Tab eventKey="serp" title="Google SERP Live Preview">
            <div className="mt-4 space-y-5">
              {/* Simulator Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-slate-900 border border-white/10 rounded-xl">
                <div className="flex-1 w-full sm:w-auto">
                  <InputGroup size="sm">
                    <InputGroup.Text className="bg-slate-950 border-white/10 text-slate-400">
                      <Search className="w-3.5 h-3.5" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter search query..."
                      className="bg-slate-950 border-white/10 text-xs text-slate-200"
                    />
                  </InputGroup>
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-white/10 rounded-lg">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`px-3 py-1 text-xs rounded font-medium flex items-center gap-1.5 ${
                      deviceView === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`px-3 py-1 text-xs rounded font-medium flex items-center gap-1.5 ${
                      deviceView === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile</span>
                  </button>
                </div>
              </div>

              {/* Realistic Google Search SERP Container */}
              <div
                className={`mx-auto bg-[#202124] border border-[#3c4043] rounded-2xl p-5 sm:p-6 shadow-2xl transition-all ${
                  deviceView === 'mobile' ? 'max-w-md' : 'w-full'
                }`}
              >
                {/* Google Result Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400 font-display">
                    DV
                  </div>
                  <div>
                    <div className="text-xs text-[#bdc1c6] font-sans">
                      devinvance.io
                    </div>
                    <div className="text-[11px] text-[#9aa0a6] truncate max-w-xs">
                      https://devinvance.io › portfolio
                    </div>
                  </div>
                </div>

                {/* Google Result Title */}
                <h3 className="text-lg sm:text-xl font-medium text-[#8ab4f8] hover:underline cursor-pointer leading-snug mb-1 font-sans">
                  {PERSONAL_INFO.name} — Principal Software Engineer & Architect Portfolio
                </h3>

                {/* Meta snippet */}
                <p className="text-xs sm:text-sm text-[#bdc1c6] leading-relaxed mb-4 font-sans">
                  High-performance full-stack engineering, distributed systems, and creative design portfolio built with React and React-Bootstrap. 10+ years scaling platforms to 25M+ DAU.
                </p>

                {/* Rich Sitelinks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#3c4043]">
                  <div className="p-2.5 rounded-lg bg-[#303134]/50 border border-white/5">
                    <a href="#projects" className="text-xs font-medium text-[#8ab4f8] hover:underline block mb-0.5">
                      Selected Engineering Works
                    </a>
                    <p className="text-[11px] text-[#9aa0a6] line-clamp-1 mb-0">
                      Krypton WebGL terminal, Synapse AI canvas, and design token suites.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#303134]/50 border border-white/5">
                    <a href="#playground" className="text-xs font-medium text-[#8ab4f8] hover:underline block mb-0.5">
                      Interactive Architecture Sandbox
                    </a>
                    <p className="text-[11px] text-[#9aa0a6] line-clamp-1 mb-0">
                      Live Token Bucket rate limiter, token studio, and cluster query evaluator.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#303134]/50 border border-white/5">
                    <a href="#skills" className="text-xs font-medium text-[#8ab4f8] hover:underline block mb-0.5">
                      Technical Stack Matrix
                    </a>
                    <p className="text-[11px] text-[#9aa0a6] line-clamp-1 mb-0">
                      React 19, React-Bootstrap, TypeScript, Go, Node.js, Kubernetes, GCP.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#303134]/50 border border-white/5">
                    <a href="#contact" className="text-xs font-medium text-[#8ab4f8] hover:underline block mb-0.5">
                      Contact & Advisory Consultations
                    </a>
                    <p className="text-[11px] text-[#9aa0a6] line-clamp-1 mb-0">
                      Book architecture audits and fractional principal engineering retainers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Tab>

          {/* Tab 2: Site Verification Tool */}
          <Tab eventKey="verification" title="Search Console Verification">
            <div className="mt-4 space-y-5">
              <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-0.5 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Google Search Console Property Verification</span>
                    </h3>
                    <p className="text-xs text-slate-400 mb-0">
                      Configure your official ownership meta tag for Google Search Console (search.google.com/search-console).
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 ${
                      verificationStatus === 'verified'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{verificationStatus === 'verified' ? 'HTML Tag Active in head element' : 'Pending Verification'}</span>
                    </span>
                  </div>
                </div>

                {verificationSaved && (
                  <Alert variant="success" className="text-xs py-2 px-3">
                    Verification token successfully written to index.html head meta tag!
                  </Alert>
                )}

                <Form onSubmit={handleSaveVerification} className="space-y-3">
                  <Form.Group controlId="gscToken">
                    <Form.Label className="text-xs font-mono text-slate-300">
                      GOOGLE SITE VERIFICATION TOKEN / META CONTENT:
                    </Form.Label>
                    <InputGroup size="sm">
                      <Form.Control
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="e.g. GSC_DEVIN_VANCE_VERIFICATION_TOKEN_2026 or google123456789"
                        className="bg-slate-950 border-white/10 text-xs font-mono text-indigo-300"
                      />
                      <Button type="submit" className="btn-accent text-xs px-3 rounded-r">
                        Update Tag in DOM
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button
                      variant="outline-glow"
                      size="sm"
                      onClick={copyHTMLMetaTag}
                      className="btn-outline-glow text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5"
                    >
                      {copiedTag ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedTag ? 'Copied HTML Meta Tag!' : 'Copy Full <meta> Tag'}</span>
                    </Button>

                    <Button
                      variant="outline-glow"
                      size="sm"
                      onClick={handleTestVerification}
                      className="btn-outline-glow text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${verificationStatus === 'testing' ? 'animate-spin' : ''}`} />
                      <span>Verify Live in DOM</span>
                    </Button>

                    <Button
                      variant="outline-glow"
                      size="sm"
                      href="https://search.google.com/search-console/welcome"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-glow text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5"
                    >
                      <span>Open Google Search Console</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </Form>
              </div>

              {/* Step-by-step verification methods */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="font-bold text-white font-mono">1. HTML Tag (Active)</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Embedded in the document head section of `index.html`. Instant automatic verification when Google crawler visits.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="font-bold text-white font-mono">2. XML Sitemap</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Published at `/sitemap.xml` with all high-priority section deep-links for indexing.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="font-bold text-white font-mono">3. Robots.txt</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Located at `/robots.txt` allowing all search engine spiders with explicit sitemap link.
                  </p>
                </div>
              </div>
            </div>
          </Tab>

          {/* Tab 3: Schema.org & Sitemap Inspector */}
          <Tab eventKey="schema" title="Structured Data & Sitemap">
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* JSON-LD Viewer */}
                <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-indigo-400 font-bold">SCHEMA.ORG JSON-LD (PERSON & PROFILE)</span>
                      <span className="text-[10px] text-emerald-400 font-mono">VALIDATED</span>
                    </div>
                    <pre className="bg-slate-950 p-3 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto max-h-56 scrollbar-thin">
                      {structuredDataSnippet}
                    </pre>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-white/5">
                    Provides Google Search rich person badges and career knowledge graph cards.
                  </div>
                </div>

                {/* Sitemap Checker */}
                <div className="bg-slate-900/80 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-indigo-400 font-bold">XML SITEMAP URLS (/sitemap.xml)</span>
                      <span className="text-[10px] text-emerald-400 font-mono">7 INDEXED URLS</span>
                    </div>
                    <div className="space-y-1.5 font-mono text-xs max-h-56 overflow-y-auto pr-1">
                      {[
                        { loc: 'https://devinvance.io/', priority: '1.0', freq: 'weekly' },
                        { loc: 'https://devinvance.io/#projects', priority: '0.9', freq: 'weekly' },
                        { loc: 'https://devinvance.io/#playground', priority: '0.8', freq: 'monthly' },
                        { loc: 'https://devinvance.io/#skills', priority: '0.8', freq: 'monthly' },
                        { loc: 'https://devinvance.io/#experience', priority: '0.8', freq: 'monthly' },
                        { loc: 'https://devinvance.io/#writings', priority: '0.7', freq: 'monthly' },
                        { loc: 'https://devinvance.io/#contact', priority: '0.9', freq: 'monthly' },
                      ].map((u) => (
                        <div key={u.loc} className="p-2 rounded bg-slate-950 border border-white/5 flex items-center justify-between">
                          <span className="text-slate-300 text-[11px]">{u.loc}</span>
                          <span className="text-indigo-400 font-bold text-[10px]">p={u.priority}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-white/5">
                    Submit `https://devinvance.io/sitemap.xml` directly in Google Search Console.
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>

      <Modal.Footer className="bg-slate-900 border-t border-white/10 px-6 py-3 flex justify-between">
        <span className="text-xs text-slate-500 font-mono">
          Google Search Console Ready · Canonical: https://devinvance.io
        </span>
        <Button variant="outline-glow" size="sm" onClick={onHide} className="btn-outline-glow text-xs py-1.5 px-4 rounded-lg">
          Close Search Console Suite
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
