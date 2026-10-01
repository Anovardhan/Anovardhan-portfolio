/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

export default function App() {
  const [showResume, setShowResume] = useState(false);

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
        <Footer />

        {/* Interactive Resume (CV) Modal */}
        <ResumeModal
          show={showResume}
          onHide={() => setShowResume(false)}
        />
      </div>
    </FirebaseProvider>
  );
}
