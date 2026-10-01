import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, ProgressBar, Alert, Table, Badge } from 'react-bootstrap';
import { Play, Pause, RotateCcw, Activity, Palette, Database, Zap, Check, Copy, Sliders } from 'lucide-react';

export const InteractivePlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ratelimiter' | 'themetokens' | 'astquery'>('ratelimiter');

  // --- Rate Limiter Simulator State ---
  const [bucketCapacity, setBucketCapacity] = useState<number>(20);
  const [refillRate, setRefillRate] = useState<number>(5); // tokens per second
  const [currentTokens, setCurrentTokens] = useState<number>(20);
  const [burstTraffic, setBurstTraffic] = useState<boolean>(false);
  const [requestsTotal, setRequestsTotal] = useState<number>(0);
  const [requestsAccepted, setRequestsAccepted] = useState<number>(0);
  const [requestsDropped, setRequestsDropped] = useState<number>(0);
  const [requestLogs, setRequestLogs] = useState<Array<{ id: number; timestamp: string; status: 200 | 429; latency: number }>>([]);

  // Refill tokens interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTokens((prev) => Math.min(bucketCapacity, prev + refillRate / 10));
    }, 100);
    return () => clearInterval(interval);
  }, [bucketCapacity, refillRate]);

  // Burst traffic simulator
  useEffect(() => {
    if (!burstTraffic) return;
    const burstInterval = setInterval(() => {
      sendRequest();
    }, 120);
    return () => clearInterval(burstInterval);
  }, [burstTraffic, currentTokens]);

  const sendRequest = () => {
    const now = new Date().toLocaleTimeString();
    const id = Date.now() + Math.random();
    const latency = Math.floor(Math.random() * 8 + 2); // 2-10ms

    setRequestsTotal((prev) => prev + 1);
    if (currentTokens >= 1) {
      setCurrentTokens((prev) => Math.max(0, prev - 1));
      setRequestsAccepted((prev) => prev + 1);
      setRequestLogs((prev) => [{ id, timestamp: now, status: 200, latency }, ...prev.slice(0, 9)]);
    } else {
      setRequestsDropped((prev) => prev + 1);
      setRequestLogs((prev) => [{ id, timestamp: now, status: 429, latency }, ...prev.slice(0, 9)]);
    }
  };

  const resetRateLimiter = () => {
    setCurrentTokens(bucketCapacity);
    setRequestsTotal(0);
    setRequestsAccepted(0);
    setRequestsDropped(0);
    setRequestLogs([]);
    setBurstTraffic(false);
  };

  // --- Theme Token Studio State ---
  const [primaryHue, setPrimaryHue] = useState<number>(245); // Indigo default
  const [borderRadius, setBorderRadius] = useState<number>(12); // px
  const [contrastMode, setContrastMode] = useState<'standard' | 'high'>('standard');
  const [copiedCSS, setCopiedCSS] = useState(false);

  const customAccentColor = `hsl(${primaryHue}, 85%, 60%)`;
  const customAccentHover = `hsl(${primaryHue}, 85%, 50%)`;

  const copyCustomCSS = () => {
    const cssCode = `:root {\n  --brand-primary: hsl(${primaryHue}, 85%, 60%);\n  --brand-radius: ${borderRadius}px;\n  --brand-contrast: ${contrastMode};\n}`;
    navigator.clipboard.writeText(cssCode);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  // --- AST / In-Memory Filter State ---
  const [queryFilter, setQueryFilter] = useState('latency < 20');
  const [queryExecutionTime, setQueryExecutionTime] = useState<number>(0.14);

  const sampleNodes = [
    { id: 'node-us-east-1', region: 'US East (N. Virginia)', status: 'ACTIVE', load: '42%', latency: 12, memory: '1.2GB' },
    { id: 'node-us-west-2', region: 'US West (Oregon)', status: 'ACTIVE', load: '68%', latency: 18, memory: '2.4GB' },
    { id: 'node-eu-west-1', region: 'EU (Ireland)', status: 'ACTIVE', load: '89%', latency: 44, memory: '3.8GB' },
    { id: 'node-ap-southeast', region: 'AP (Singapore)', status: 'ACTIVE', load: '31%', latency: 15, memory: '0.9GB' },
    { id: 'node-sa-east-1', region: 'SA (São Paulo)', status: 'DEGRADED', load: '94%', latency: 85, memory: '4.1GB' },
  ];

  const filteredNodes = sampleNodes.filter((node) => {
    if (queryFilter.includes('latency < 20')) return node.latency < 20;
    if (queryFilter.includes('ACTIVE')) return node.status === 'ACTIVE';
    if (queryFilter.includes('DEGRADED')) return node.status === 'DEGRADED';
    return true;
  });

  return (
    <section id="playground" className="py-20 lg:py-28 bg-slate-950/60 border-y border-white/5 relative">
      <Container className="max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Interactive Engineering Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
              Live Architecture & Token Simulators
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mb-0">
            Real-time interactive modules testing algorithmic throughput, token compilation, and cluster topology directly inside your browser.
          </p>
        </div>

        {/* Sandbox Switcher Tabs */}
        <div className="flex items-center gap-2 mb-8 p-1.5 bg-slate-900/90 border border-white/10 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('ratelimiter')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'ratelimiter'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Token-Bucket Rate Limiter</span>
          </button>
          <button
            onClick={() => setActiveTab('themetokens')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'themetokens'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Live Design Token Engine</span>
          </button>
          <button
            onClick={() => setActiveTab('astquery')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'astquery'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Cluster Topology Query</span>
          </button>
        </div>

        {/* Tab 1: Rate Limiter Simulator */}
        {activeTab === 'ratelimiter' && (
          <Card className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <Row className="gy-4">
              {/* Controls Column */}
              <Col lg={5} className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Token Bucket Algorithm Config
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Simulates distributed API gateway request throttling under burst conditions.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                    <span>Bucket Capacity (Max Burst):</span>
                    <span className="text-indigo-400 font-bold">{bucketCapacity} tokens</span>
                  </div>
                  <Form.Range
                    min={5}
                    max={50}
                    value={bucketCapacity}
                    onChange={(e) => setBucketCapacity(Number(e.target.value))}
                    className="accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                    <span>Refill Rate:</span>
                    <span className="text-indigo-400 font-bold">{refillRate} tokens/sec</span>
                  </div>
                  <Form.Range
                    min={1}
                    max={20}
                    value={refillRate}
                    onChange={(e) => setRefillRate(Number(e.target.value))}
                    className="accent-indigo-500"
                  />
                </div>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <Button
                    size="sm"
                    onClick={sendRequest}
                    className="btn-accent text-xs py-2 px-4 rounded-lg flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Send Single Request</span>
                  </Button>

                  <Button
                    size="sm"
                    variant={burstTraffic ? 'danger' : 'outline-glow'}
                    onClick={() => setBurstTraffic(!burstTraffic)}
                    className={`text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 ${
                      burstTraffic ? 'bg-rose-600 border-rose-500 text-white' : 'btn-outline-glow'
                    }`}
                  >
                    {burstTraffic ? <Pause className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{burstTraffic ? 'Halt Burst Traffic' : 'Simulate 100 Req Burst'}</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline-glow"
                    onClick={resetRateLimiter}
                    className="btn-outline-glow text-xs py-2 px-3 rounded-lg"
                    title="Reset Simulator"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  </Button>
                </div>
              </Col>

              {/* Realtime Visualization & Telemetry */}
              <Col lg={7}>
                <div className="bg-slate-950 border border-white/10 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-mono text-slate-400">CURRENT BUCKET FILL</span>
                    <span className="text-xs font-mono font-bold text-indigo-400 tabular-nums">
                      {Math.floor(currentTokens)} / {bucketCapacity} TOKENS
                    </span>
                  </div>

                  {/* Token Level Bar */}
                  <div>
                    <ProgressBar
                      now={(currentTokens / bucketCapacity) * 100}
                      variant={currentTokens < 3 ? 'danger' : currentTokens < 10 ? 'warning' : 'primary'}
                      className="h-3 bg-slate-800 rounded-full"
                    />
                  </div>

                  {/* Realtime Stats */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="bg-slate-900 border border-white/5 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold font-mono text-white tabular-nums">
                        {requestsTotal}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Total Ingress</div>
                    </div>
                    <div className="bg-slate-900 border border-emerald-500/20 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                        {requestsAccepted}
                      </div>
                      <div className="text-[11px] text-emerald-300 mt-0.5">HTTP 200 OK</div>
                    </div>
                    <div className="bg-slate-900 border border-rose-500/20 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold font-mono text-rose-400 tabular-nums">
                        {requestsDropped}
                      </div>
                      <div className="text-[11px] text-rose-300 mt-0.5">HTTP 429 Throttled</div>
                    </div>
                  </div>

                  {/* Live Request Log Stream */}
                  <div>
                    <div className="text-[11px] font-mono text-slate-500 mb-2">TELEMETRY STREAM (LAST 5 EVENTS):</div>
                    <div className="space-y-1 font-mono text-xs max-h-28 overflow-y-auto">
                      {requestLogs.length === 0 ? (
                        <div className="text-slate-600 text-xs italic">No requests dispatched yet. Click "Send Single Request" or "Simulate Burst".</div>
                      ) : (
                        requestLogs.slice(0, 5).map((log) => (
                          <div
                            key={log.id}
                            className={`flex items-center justify-between px-2.5 py-1 rounded ${
                              log.status === 200
                                ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-500/20'
                                : 'bg-rose-950/30 text-rose-300 border border-rose-500/20'
                            }`}
                          >
                            <span>[{log.timestamp}] INGRESS_ROUTE /api/v1/stream</span>
                            <span className="font-bold">{log.status === 200 ? '200 OK' : '429 THROTTLED'} ({log.latency}ms)</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        )}

        {/* Tab 2: Live Design Token Engine */}
        {activeTab === 'themetokens' && (
          <Card className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <Row className="gy-4">
              <Col lg={5} className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Design Token Interpolator
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Adjust semantic tokens and watch atomic React-Bootstrap primitives adapt in real time.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                    <span>Primary Hue:</span>
                    <span style={{ color: customAccentColor }} className="font-bold">{primaryHue}°</span>
                  </div>
                  <Form.Range
                    min={0}
                    max={360}
                    value={primaryHue}
                    onChange={(e) => setPrimaryHue(Number(e.target.value))}
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                    <span>Border Radius:</span>
                    <span className="text-indigo-400 font-bold">{borderRadius}px</span>
                  </div>
                  <Form.Range
                    min={0}
                    max={28}
                    value={borderRadius}
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                  />
                </div>

                <div className="pt-2">
                  <Button
                    size="sm"
                    variant="outline-glow"
                    onClick={copyCustomCSS}
                    className="btn-outline-glow text-xs py-2 px-4 rounded-lg flex items-center gap-2"
                  >
                    {copiedCSS ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCSS ? 'Copied CSS Variables!' : 'Copy Token CSS Rules'}</span>
                  </Button>
                </div>
              </Col>

              {/* Live Render Preview */}
              <Col lg={7}>
                <div className="bg-slate-950 border border-white/10 rounded-xl p-5 space-y-4">
                  <div className="text-xs font-mono text-slate-400 pb-2 border-b border-white/10 flex justify-between">
                    <span>LIVE PRIMITIVE PREVIEW</span>
                    <span className="text-emerald-400">SYNCHRONIZED (0ms)</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-3">
                      <button
                        style={{
                          backgroundColor: customAccentColor,
                          borderRadius: `${borderRadius}px`,
                        }}
                        className="px-4 py-2 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                      >
                        Primary Action Button
                      </button>

                      <button
                        style={{
                          borderRadius: `${borderRadius}px`,
                          borderColor: customAccentColor,
                          color: customAccentColor,
                        }}
                        className="px-4 py-2 text-xs font-medium bg-transparent border transition-colors hover:bg-white/5"
                      >
                        Outline Variant
                      </button>
                    </div>

                    <div
                      style={{
                        borderRadius: `${borderRadius}px`,
                        borderColor: `hsl(${primaryHue}, 60%, 25%)`,
                        backgroundColor: `hsl(${primaryHue}, 30%, 10%)`,
                      }}
                      className="p-4 border text-slate-200 text-xs leading-relaxed"
                    >
                      <strong className="block font-semibold mb-1" style={{ color: customAccentColor }}>
                        Dynamic Token Theme Container
                      </strong>
                      This component automatically computes harmonic complementary backgrounds, high-contrast borders, and adaptive inner radius math ($r_{'{'}inner{'}'} = r_{'{'}outer{'}'} - \text{'{'}pad{'}'}$).
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        )}

        {/* Tab 3: AST / Topology Query Simulator */}
        {activeTab === 'astquery' && (
          <Card className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-2xl">
            <Row className="gy-4">
              <Col lg={5} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Distributed Cluster Mesh Query
                  </h3>
                  <p className="text-xs text-slate-400 mb-3">
                    In-memory predicate evaluator filtering multi-region node health state.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">Preset Query Filter:</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'latency < 20', label: 'Fast Ingress (<20ms)' },
                      { id: 'ACTIVE', label: 'Active Clusters' },
                      { id: 'DEGRADED', label: 'Degraded Nodes' },
                    ].map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setQueryFilter(preset.id);
                          setQueryExecutionTime(Number((Math.random() * 0.15 + 0.05).toFixed(2)));
                        }}
                        className={`px-3 py-1.5 text-xs font-mono rounded-lg border ${
                          queryFilter === preset.id
                            ? 'bg-indigo-600 border-indigo-500 text-white'
                            : 'bg-slate-800/80 border-white/10 text-slate-300 hover:text-white'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 border border-white/10 rounded-lg text-xs font-mono text-slate-400">
                  <div>PREDICATE: <span className="text-indigo-300">WHERE {queryFilter}</span></div>
                  <div>EXECUTION TIME: <span className="text-emerald-400 tabular-nums">{queryExecutionTime} ms</span></div>
                  <div>MATCHED RECORDS: <span className="text-white tabular-nums">{filteredNodes.length}</span></div>
                </div>
              </Col>

              <Col lg={7}>
                <div className="bg-slate-950 border border-white/10 rounded-xl overflow-hidden">
                  <Table responsive className="table-dark mb-0 text-xs font-mono">
                    <thead className="bg-slate-900 border-b border-white/10 text-slate-400">
                      <tr>
                        <th className="py-2.5 px-3">NODE ID</th>
                        <th className="py-2.5 px-3">REGION</th>
                        <th className="py-2.5 px-3">STATUS</th>
                        <th className="py-2.5 px-3">LATENCY</th>
                        <th className="py-2.5 px-3">LOAD</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNodes.map((node) => (
                        <tr key={node.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-2 px-3 text-indigo-300 font-bold">{node.id}</td>
                          <td className="py-2 px-3 text-slate-300">{node.region}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              node.status === 'ACTIVE'
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                            }`}>
                              {node.status}
                            </span>
                          </td>
                          <td className={`py-2 px-3 tabular-nums ${node.latency < 20 ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {node.latency}ms
                          </td>
                          <td className="py-2 px-3 text-slate-400 tabular-nums">{node.load}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Card>
        )}
      </Container>
    </section>
  );
};
