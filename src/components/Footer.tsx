import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Globe, Search } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenSearchConsole?: () => void;
  onOpenSearch?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSearchConsole, onOpenSearch }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' PST'
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 py-12 text-slate-400 text-xs">
      <Container className="max-w-7xl">
        <Row className="gy-4 align-items-center justify-between">
          <Col md={4}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="text-white font-bold font-display text-sm">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs mb-0">
              Principal Systems Architect & Full-Stack Engineer.
            </p>
          </Col>

          <Col md={4} className="text-md-center">
            <div className="font-mono text-slate-400">
              San Francisco, CA · <span className="text-indigo-400 font-medium tabular-nums">{timeStr}</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 mt-2">
              <button
                onClick={onOpenSearch}
                className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <Search className="w-3 h-3 text-indigo-400" />
                <span>Search (⌘K)</span>
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={onOpenSearchConsole}
                className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <Globe className="w-3 h-3 text-emerald-400" />
                <span>Google Search Console & SEO</span>
              </button>
            </div>
          </Col>

          <Col md={4} className="text-md-end flex flex-col md:items-end gap-3">
            <div className="flex items-center gap-4 justify-start md:justify-end">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-slate-400 hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </Col>
        </Row>

        <div className="pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            © {new Date().getFullYear()} Devin Vance. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span>Sitemap: /sitemap.xml</span>
            <span aria-hidden="true">·</span>
            <span>Robots: /robots.txt</span>
            <span aria-hidden="true">·</span>
            <span>JSON-LD Schema Verified</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
