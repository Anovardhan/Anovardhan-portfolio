import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BookOpen, Calendar, Clock, ArrowRight, Bookmark } from 'lucide-react';
import { ARTICLES } from '../data/portfolioData';
import { Article } from '../types/portfolio';
import { ArticleReaderModal } from './ArticleReaderModal';

export const PublicationsAndSpeaking: React.FC = () => {
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  return (
    <section id="writings" className="py-20 lg:py-28 relative">
      <Container className="max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
              Thought Leadership & Research
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Technical Articles & Whitepapers
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mb-0">
            Selected essays on web performance, zero-allocation serialization, multi-agent AI topologies, and scalable React design systems.
          </p>
        </div>

        {/* Articles Grid */}
        <Row className="g-4">
          {ARTICLES.map((article) => (
            <Col key={article.id} lg={4}>
              <Card className="h-full bg-slate-900/80 border border-white/10 hover:border-indigo-500/30 transition-all rounded-2xl p-6 flex flex-col justify-between group shadow-xl">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
                    <span className="text-indigo-400 font-semibold">{article.publication}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display group-hover:text-indigo-300 transition-colors mb-3">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {article.summary}
                  </p>

                  <div className="bg-slate-950 border border-white/5 rounded-xl p-3.5 mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
                      <Bookmark className="w-3 h-3 text-indigo-400" />
                      <span>Takeaway</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-normal mb-0 italic">
                      "{article.keyTakeaway}"
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="outline-glow"
                    size="sm"
                    onClick={() => setReadingArticle(article)}
                    className="w-full btn-outline-glow text-xs py-2 rounded-lg flex items-center justify-center gap-2 group-hover:border-indigo-500/40"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Quick Article Reader Modal */}
      <ArticleReaderModal
        article={readingArticle}
        show={!!readingArticle}
        onHide={() => setReadingArticle(null)}
      />
    </section>
  );
};
