import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, Offcanvas } from 'react-bootstrap';
import { ArrowUpRight, FileText, Menu, X, Terminal, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavigationProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenResume, onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setShowOffcanvas(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className={`transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10 py-2.5 shadow-xl shadow-black/40'
          : 'bg-transparent py-4'
      }`}
    >
      <Container className="max-w-7xl">
        {/* Zone 1: Wordmark Brand Title (Strict 1-line text element) */}
        <Navbar.Brand
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse inline-block" />
          <span className="font-display">{PERSONAL_INFO.name}</span>
        </Navbar.Brand>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900/60 border border-white/10 rounded-lg"
          onClick={() => setShowOffcanvas(true)}
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Zone 2 & 3: Desktop Nav Links and Actions */}
        <Navbar.Collapse id="navbar-nav" className="hidden lg:flex justify-between items-center w-full ml-10">
          {/* Zone 2: 4-6 Clean Text Links */}
          <Nav className="mx-auto items-center gap-7 text-sm font-medium">
            <Nav.Link
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
              className="text-slate-300 hover:text-indigo-400 transition-colors py-1"
            >
              Projects
            </Nav.Link>
            <Nav.Link
              href="#playground"
              onClick={(e) => { e.preventDefault(); scrollToSection('playground'); }}
              className="text-slate-300 hover:text-indigo-400 transition-colors py-1 flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Playground</span>
            </Nav.Link>
            <Nav.Link
              href="#skills"
              onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}
              className="text-slate-300 hover:text-indigo-400 transition-colors py-1"
            >
              Skills
            </Nav.Link>
            <Nav.Link
              href="#experience"
              onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}
              className="text-slate-300 hover:text-indigo-400 transition-colors py-1"
            >
              Experience
            </Nav.Link>
            <Nav.Link
              href="#writings"
              onClick={(e) => { e.preventDefault(); scrollToSection('writings'); }}
              className="text-slate-300 hover:text-indigo-400 transition-colors py-1"
            >
              Articles
            </Nav.Link>
          </Nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline-glow"
              size="sm"
              onClick={onOpenResume}
              className="btn-outline-glow text-xs py-2 px-3.5 flex items-center gap-1.5 rounded-lg whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Resume (CV)</span>
            </Button>
            <Button
              size="sm"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) scrollToSection('contact');
                else onOpenContact();
              }}
              className="btn-accent text-xs py-2 px-4 flex items-center gap-1.5 rounded-lg whitespace-nowrap"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Navbar.Collapse>

        {/* Mobile Offcanvas Drawer */}
        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="end"
          className="bg-slate-950 text-white border-l border-white/10"
        >
          <Offcanvas.Header className="border-b border-white/10 p-4">
            <Offcanvas.Title className="text-base font-bold font-display text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span>{PERSONAL_INFO.name}</span>
            </Offcanvas.Title>
            <button
              onClick={() => setShowOffcanvas(false)}
              className="p-2 text-slate-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-6 flex flex-col justify-between">
            <div className="flex flex-col gap-4 text-base font-medium">
              <button
                onClick={() => scrollToSection('projects')}
                className="text-left py-2 text-slate-300 hover:text-white border-b border-white/5"
              >
                Selected Projects
              </button>
              <button
                onClick={() => scrollToSection('playground')}
                className="text-left py-2 text-slate-300 hover:text-white border-b border-white/5 flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Interactive Playground</span>
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className="text-left py-2 text-slate-300 hover:text-white border-b border-white/5"
              >
                Technical Stack & Matrix
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="text-left py-2 text-slate-300 hover:text-white border-b border-white/5"
              >
                Experience & Milestones
              </button>
              <button
                onClick={() => scrollToSection('writings')}
                className="text-left py-2 text-slate-300 hover:text-white border-b border-white/5"
              >
                Articles & Research
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left py-2 text-slate-300 hover:text-white"
              >
                Contact & Inquiries
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
              <Button
                variant="outline-glow"
                onClick={() => { setShowOffcanvas(false); onOpenResume(); }}
                className="w-full btn-outline-glow py-2.5 flex items-center justify-center gap-2 rounded-lg"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>View Full CV / Resume</span>
              </Button>
              <Button
                onClick={() => { setShowOffcanvas(false); scrollToSection('contact'); }}
                className="w-full btn-accent py-2.5 flex items-center justify-center gap-2 rounded-lg"
              >
                <span>Initiate Project Inquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </Navbar>
  );
};
