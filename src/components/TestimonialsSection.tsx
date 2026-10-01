import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Quote, Star, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-950/40 relative">
      <Container className="max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
              Endorsements & Recommendations
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Leadership & Peer Proof
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mb-0">
            Direct feedback from engineering executives, product heads, and infrastructure architects who have scaled alongside Devin.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <Row className="g-4">
          {TESTIMONIALS.map((t) => (
            <Col key={t.id} lg={4}>
              <Card className="h-full bg-slate-900/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  {/* Stars and Year */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">{t.year}</span>
                  </div>

                  <Quote className="w-8 h-8 text-indigo-500/20 mb-3" />

                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="font-bold text-white text-sm font-display mb-0.5">
                    {t.name}
                  </div>
                  <div className="text-xs text-indigo-300 font-medium mb-1">
                    {t.role} · {t.company}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {t.relationship}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
