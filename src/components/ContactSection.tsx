import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup, Alert, Toast, ToastContainer, Badge } from 'react-bootstrap';
import { Mail, MapPin, Send, CheckCircle2, Clock, Copy, Check, Sparkles, LogIn, LogOut, Inbox, Eye } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types/portfolio';
import { submitInquiry, db, auth } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { useFirebase } from '../context/FirebaseContext';
import { OperationType, handleFirestoreError } from '../lib/firestoreErrors';

interface StoredInquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: string;
  createdAt?: any;
}

export const ContactSection: React.FC = () => {
  const { currentUser, loginWithGoogle, logout } = useFirebase();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: 'System Architecture & Review',
    budget: '$25,000 - $50,000',
    timeline: 'Within 1-2 months',
    message: ''
  });

  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Admin Inquiries Inbox State
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [showInbox, setShowInbox] = useState(false);

  // Listen to inquiries if signed in
  useEffect(() => {
    if (!currentUser) {
      setInquiries([]);
      return;
    }

    const q = query(collection(db, 'inquiries'), limit(20));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: StoredInquiry[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as StoredInquiry);
        });
        setInquiries(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'inquiries', auth.currentUser);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsSubmitting(true);
    setValidated(true);
    setErrorMessage(null);

    try {
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
      });

      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setToastMessage('Inquiry persisted securely in Firebase Firestore. Anovardhan will respond within 24 hours!');
      setShowToast(true);
    } catch (err: any) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMessage('Could not save inquiry to Firestore database. Please try again.');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setToastMessage('Email address copied to clipboard!');
    setShowToast(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <Container className="max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2 flex items-center gap-2">
              <span>Initiate Collaboration</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-mono text-[11px]">FIRESTORE CONNECTED</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Get in Touch & Advisory Inquiries
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-white/10 rounded-xl p-1.5 px-3">
                <span className="text-xs text-indigo-300 font-medium">{currentUser.displayName || currentUser.email}</span>
                <Button
                  variant="outline-glow"
                  size="sm"
                  onClick={() => setShowInbox(!showInbox)}
                  className="btn-outline-glow text-xs py-1 px-2.5 rounded flex items-center gap-1.5"
                >
                  <Inbox className="w-3 h-3 text-indigo-400" />
                  <span>{showInbox ? 'Hide Inquiries' : `Inquiries (${inquiries.length})`}</span>
                </Button>
                <button
                  onClick={logout}
                  className="text-xs text-slate-400 hover:text-white p-1"
                  title="Sign out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Button
                variant="outline-glow"
                size="sm"
                onClick={loginWithGoogle}
                className="btn-outline-glow text-xs py-2 px-3 rounded-lg flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-indigo-400" />
                <span>Admin Sign In (Google)</span>
              </Button>
            )}
          </div>
        </div>

        {/* If Admin Inbox View is Toggled */}
        {currentUser && showInbox && (
          <Card className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 mb-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-indigo-400" />
                <h3 className="text-base font-bold text-white mb-0">
                  Firebase Inbound Inquiries Dashboard
                </h3>
              </div>
              <span className="text-xs font-mono text-indigo-300">
                {inquiries.length} live records in Firestore
              </span>
            </div>

            {inquiries.length === 0 ? (
              <p className="text-slate-400 text-xs italic mb-0">No received inquiries in the database yet.</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div>
                        <strong className="text-white text-sm">{inq.name}</strong>
                        <span className="text-slate-400 ml-2">({inq.email})</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono text-[10px] border border-indigo-500/20">
                        {inq.projectType} · {inq.budget}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-1 leading-relaxed bg-slate-900/60 p-2.5 rounded border border-white/5">
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        <Row className="gy-5">
          {/* Left Coordinates Column */}
          <Col lg={5} className="space-y-6">
            <Card className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-xl space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white font-display mb-1">
                  Direct Coordinates
                </h3>
                <p className="text-xs text-slate-400">
                  Feel free to send a direct message or schedule a structured technical consultation.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <div>
                      <div className="text-[11px] text-slate-400 font-mono">PRIMARY EMAIL</div>
                      <div className="text-xs font-mono font-medium text-white">{PERSONAL_INFO.email}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline-glow"
                    size="sm"
                    onClick={handleCopyEmail}
                    className="btn-outline-glow text-xs py-1 px-2.5 rounded"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-white/5">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">LOCATION & TIMEZONE</div>
                    <div className="text-xs font-medium text-white">{PERSONAL_INFO.location} (UTC-7 / PST)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-white/5">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="text-[11px] text-slate-400 font-mono">RESPONSE TIME SLA</div>
                    <div className="text-xs font-medium text-emerald-400">Within 24 business hours</div>
                  </div>
                </div>
              </div>

              {/* Consultation Scope Box */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Advisory & Advisory Retainer Focus</span>
                </div>
                <ul className="space-y-1 list-disc pl-4 text-slate-400">
                  <li>Distributed systems & WebGL architecture reviews</li>
                  <li>React 19 & React-Bootstrap design system migrations</li>
                  <li>High-frequency WebSocket & streaming pipeline design</li>
                  <li>Technical due diligence for tech investors & founders</li>
                </ul>
              </div>
            </Card>
          </Col>

          {/* Right Form Column */}
          <Col lg={7}>
            <Card className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
              {errorMessage && (
                <Alert variant="danger" className="text-xs py-2 px-3 mb-4">
                  {errorMessage}
                </Alert>
              )}

              {submittedSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Inquiry Dispatched & Saved to Firebase
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto mt-2">
                      Thank you for reaching out, <strong className="text-white">{formData.name}</strong>. Your project brief has been persisted directly to Firestore.
                    </p>
                  </div>
                  <Button
                    variant="outline-glow"
                    size="sm"
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: 'System Architecture & Review',
                        budget: '$25,000 - $50,000',
                        timeline: 'Within 1-2 months',
                        message: ''
                      });
                      setValidated(false);
                    }}
                    className="btn-outline-glow text-xs py-2 px-4 rounded-lg"
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <Form noValidate validated={validated} onSubmit={handleSubmit} className="space-y-4">
                  <Row className="g-3">
                    <Col sm={6}>
                      <Form.Group controlId="contactName">
                        <Form.Label className="text-xs font-mono text-slate-300">YOUR NAME *</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="e.g. Alex Chen"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Form.Control.Feedback type="invalid" className="text-xs">
                          Please enter your name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group controlId="contactEmail">
                        <Form.Label className="text-xs font-mono text-slate-300">WORK EMAIL *</Form.Label>
                        <Form.Control
                          required
                          type="email"
                          placeholder="e.g. alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Form.Control.Feedback type="invalid" className="text-xs">
                          Please enter a valid work email.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="g-3">
                    <Col sm={6}>
                      <Form.Group controlId="projectType">
                        <Form.Label className="text-xs font-mono text-slate-300">ENGAGEMENT TYPE</Form.Label>
                        <Form.Select
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        >
                          <option value="System Architecture & Review">System Architecture & Review</option>
                          <option value="Full-Stack Production Platform">Full-Stack Production Platform</option>
                          <option value="React & Design System Rollout">React & Design System Rollout</option>
                          <option value="Advisory / Fractional Principal Role">Advisory / Fractional Principal Role</option>
                          <option value="Speaking or Technical Workshop">Speaking or Technical Workshop</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col sm={6}>
                      <Form.Group controlId="budgetRange">
                        <Form.Label className="text-xs font-mono text-slate-300">ESTIMATED BUDGET</Form.Label>
                        <Form.Select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        >
                          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                          <option value="$50,000 - $100,000+">$50,000 - $100,000+</option>
                          <option value="Hourly / Advisory Retainer">Hourly / Advisory Retainer</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="contactMessage">
                    <Form.Label className="text-xs font-mono text-slate-300">PROJECT OVERVIEW & REQUIREMENTS *</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={4}
                      placeholder="Describe your current system challenges, architectural objectives, and target timeframe..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <Form.Control.Feedback type="invalid" className="text-xs">
                      Please provide a brief description of your inquiry.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-accent py-2.5 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm shadow-lg shadow-indigo-600/30"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Persisting to Firestore...' : 'Submit Project Inquiry'}</span>
                  </Button>
                </Form>
              )}
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Toast Notification Container */}
      <ToastContainer position="bottom-end" className="p-4" style={{ zIndex: 9999 }}>
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={4000}
          autohide
          className="bg-slate-900 border border-white/20 text-white rounded-xl shadow-2xl"
        >
          <Toast.Header className="bg-slate-950 text-white border-b border-white/10 px-3 py-2 flex justify-between items-center">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <strong className="me-auto text-xs font-mono text-indigo-300 ml-2">PORTFOLIO NOTIFICATION</strong>
          </Toast.Header>
          <Toast.Body className="text-xs text-slate-200 p-3">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </section>
  );
};
