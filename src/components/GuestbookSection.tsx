import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { MessageSquare, Send, Heart, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db, submitGuestbookEntry, auth } from '../lib/firebase';
import { OperationType, handleFirestoreError } from '../lib/firestoreErrors';
import { useFirebase } from '../context/FirebaseContext';

interface GuestbookNote {
  id: string;
  authorName: string;
  authorEmail?: string;
  companyOrRole?: string;
  message: string;
  createdAt?: any;
}

export const GuestbookSection: React.FC = () => {
  const { currentUser, isConnected } = useFirebase();
  const [entries, setEntries] = useState<GuestbookNote[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [companyOrRole, setCompanyOrRole] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusAlert, setStatusAlert] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), limit(12));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: GuestbookNote[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as GuestbookNote);
        });
        setEntries(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'guestbook', auth.currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    setSubmitting(true);
    setStatusAlert(null);
    try {
      await submitGuestbookEntry({
        authorName,
        companyOrRole,
        message,
        authorEmail: currentUser?.email || '',
      });
      setMessage('');
      if (!currentUser) {
        setAuthorName('');
        setCompanyOrRole('');
      }
      setStatusAlert({ type: 'success', text: 'Thank you! Your note has been posted to Firestore in real-time.' });
      setTimeout(() => setStatusAlert(null), 4000);
    } catch (err) {
      console.error(err);
      setStatusAlert({ type: 'danger', text: 'Could not post note. Please check Firestore connection.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-950/80 border-t border-white/5 relative">
      <Container className="max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>Realtime Cloud Community Board</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Visitor Guestbook & Endorsements
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mb-0">
            Leave a note, peer review, or technical greeting. Synced live with Firebase Firestore.
          </p>
        </div>

        <Row className="gy-4">
          {/* Submission Form Column */}
          <Col lg={5}>
            <Card className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Leave a Note on the Board</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Your message is stored securely in Firebase Firestore and visible to visitors.
              </p>

              {statusAlert && (
                <Alert variant={statusAlert.type === 'success' ? 'success' : 'danger'} className="text-xs py-2 px-3 mb-3">
                  {statusAlert.text}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} className="space-y-3">
                <Form.Group controlId="gbName">
                  <Form.Label className="text-xs font-mono text-slate-300">YOUR NAME *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    size="sm"
                    placeholder="e.g. Maya Lin"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="gbRole">
                  <Form.Label className="text-xs font-mono text-slate-300">TITLE / COMPANY (OPTIONAL)</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    placeholder="e.g. Senior Staff Engineer @ TechCorp"
                    value={companyOrRole}
                    onChange={(e) => setCompanyOrRole(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="gbMessage">
                  <Form.Label className="text-xs font-mono text-slate-300">MESSAGE *</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    size="sm"
                    placeholder="Drop a note, feedback on the architecture, or say hi..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  disabled={submitting || !authorName.trim() || !message.trim()}
                  className="w-full btn-accent text-xs py-2.5 rounded-lg flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Posting Note...' : 'Post to Live Guestbook'}</span>
                </Button>
              </Form>
            </Card>
          </Col>

          {/* Live Stream of Notes */}
          <Col lg={7}>
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 min-h-[380px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                  <span className="text-xs font-mono text-slate-400">FIRESTORE LIVE ENTRIES ({entries.length})</span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SYNCHRONIZED</span>
                  </div>
                </div>

                {entries.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No guestbook notes yet. Be the first visitor to sign the board!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
                    {entries.map((note) => (
                      <div
                        key={note.id}
                        className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-colors"
                      >
                        <p className="text-xs text-slate-200 leading-relaxed italic mb-3">
                          "{note.message}"
                        </p>
                        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                          <div>
                            <span className="font-semibold text-white block">{note.authorName}</span>
                            <span className="text-slate-400 text-[10px]">{note.companyOrRole || 'Visitor'}</span>
                          </div>
                          <Heart className="w-3.5 h-3.5 text-indigo-400/60" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>PROJECT ID: evident-atom-b8gvj</span>
                <span>RULES: ZERO-TRUST ABAC</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
