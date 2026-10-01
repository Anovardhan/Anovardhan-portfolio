import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BookOpen, Calendar, Clock, X, Bookmark, Share2 } from 'lucide-react';
import { Article } from '../types/portfolio';

interface ArticleReaderModalProps {
  article: Article | null;
  show: boolean;
  onHide: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({ article, show, onHide }) => {
  if (!article) return null;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      scrollable
    >
      <Modal.Header className="bg-slate-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-indigo-400 flex items-center gap-2 mb-1">
            <span>{article.publication}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>
          <Modal.Title className="text-lg font-bold font-display text-white">
            {article.title}
          </Modal.Title>
        </div>
        <button
          onClick={onHide}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </Modal.Header>

      <Modal.Body className="bg-slate-950 p-6 text-slate-300 space-y-5 leading-relaxed text-sm">
        <div className="bg-indigo-950/40 border border-indigo-500/20 rounded-xl p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-1 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Key Architectural Takeaway</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed mb-0 font-medium">
            {article.keyTakeaway}
          </p>
        </div>

        <div>
          <h4 className="text-base font-bold text-white mb-2">Abstract & Problem Definition</h4>
          <p>{article.summary}</p>
        </div>

        <div>
          <h4 className="text-base font-bold text-white mb-2">Systems Engineering Breakdown</h4>
          <p>
            When architecting mission-critical frontends that handle tens of thousands of continuous state transitions per second, conventional garbage collection becomes the primary bottleneck. Traditional React state setters enqueue fiber reconciler passes that allocate memory chunks inside V8 heap space. Under heavy streaming loads (e.g. crypto orderbooks or streaming generative tokens), memory churn causes micro-stutters and dropped 60fps frames.
          </p>
          <p>
            By establishing an offscreen WebWorker ring buffer and streaming binary data over WebSockets directly into shared ArrayBuffers, we isolate memory allocations from the main rendering thread. React only receives synchronized batch state triggers at designated requestAnimationFrame intervals, preserving zero-jitter 60fps UI fluidity.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {article.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-xs font-mono text-slate-400">
              #{tag}
            </span>
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-slate-900 border-t border-white/10 px-6 py-3 flex justify-between">
        <span className="text-xs text-slate-500">
          Authored by Anovardhan · Published in {article.publication}
        </span>
        <Button variant="outline-glow" size="sm" onClick={onHide} className="btn-outline-glow text-xs py-1.5 px-4 rounded-lg">
          Close Article
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
