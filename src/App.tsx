/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FirebaseProvider } from './context/FirebaseContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { InteractivePlayground } from './components/InteractivePlayground';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { PublicationsAndSpeaking } from './components/PublicationsAndSpeaking';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GuestbookSection } from './components/GuestbookSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { GoogleSearchConsoleModal } from './components/GoogleSearchConsoleModal';
import { SearchPaletteModal } from './components/SearchPaletteModal';

export default function App() {
  const [showResume, setShowResume] = useState(false);
  const [showSearchConsole, setShowSearchConsole] = useState(false);
  const [showSearchPalette, setShowSearchPalette] = useState(false);

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowSearchPalette((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FirebaseProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Top Bar Navigation */}
        <Navigation
          onOpenResume={() => setShowResume(true)}
          onOpenContact={handleOpenContact}
          onOpenSearch={() => setShowSearchPalette(true)}
          onOpenSearchConsole={() => setShowSearchConsole(true)}
        />

        {/* Main Portfolio Content */}
        <main className="flex-1">
          <Hero
            onOpenResume={() => setShowResume(true)}
            onOpenContact={handleOpenContact}
          />

          <ProjectsShowcase />

          <InteractivePlayground />

          <SkillsMatrix />

          <ExperienceTimeline />

          <PublicationsAndSpeaking />

          <TestimonialsSection />

          <GuestbookSection />

          <ContactSection />
        </main>

        {/* Footer */}
        <Footer
          onOpenSearchConsole={() => setShowSearchConsole(true)}
          onOpenSearch={() => setShowSearchPalette(true)}
        />

        {/* Interactive Resume (CV) Modal */}
        <ResumeModal
          show={showResume}
          onHide={() => setShowResume(false)}
        />

        {/* Google Search Console & SEO Suite Modal */}
        <GoogleSearchConsoleModal
          show={showSearchConsole}
          onHide={() => setShowSearchConsole(false)}
        />

        {/* Global Instant Search Palette (Cmd+K) */}
        <SearchPaletteModal
          show={showSearchPalette}
          onHide={() => setShowSearchPalette(false)}
        />
      </div>
    </FirebaseProvider>
  );
}
