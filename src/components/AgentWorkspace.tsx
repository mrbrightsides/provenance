import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Database,
  Cpu,
  ShieldCheck,
  Search,
  ArrowRight,
  Plus,
  Trash2,
  Lock,
  Layers,
  FileCode,
  SlidersHorizontal,
  ExternalLink,
  PlusCircle,
  Sliders,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Edit3,
} from 'lucide-react';
import { Dataset, UseCaseType, DecisionRecord, AgentStep, DataMetric, EntityRecord } from '../types';
import { PROCUREMENT_PRESET, MEDICAL_PRESET, LOAN_PRESET } from '../data/presets';
import { MathScoringExplainer } from './MathScoringExplainer';

const CUSTOM_CLOUD_PRESET: Dataset = {
  id: 'ds-custom-cloud-01',
  useCase: 'custom',
  title: 'Cloud Infrastructure Vendor Benchmarking',
  version: '2026-v01',
  timestamp: '2026-08-11 08:00:00 UTC',
  recordCount: 3,
  sourceOrigin: 'Internal Cloud Architecture & Benchmark API',
  authorEmail: 'cloud-agent@enterprise.org',
  metrics: [
    { id: 'monthlyCost', name: 'Monthly Cost ($)', unit: 'USD', higherIsBetter: false, weight: 0.35 },
    { id: 'uptimeSla', name: 'Uptime SLA (%)', unit: '%', higherIsBetter: true, weight: 0.25 },
    { id: 'latencyMs', name: 'Global Latency (ms)', unit: 'ms', higherIsBetter: false, weight: 0.20 },
    { id: 'securityIndex', name: 'SOC2 Security Index', unit: 'pts', higherIsBetter: true, weight: 0.20 },
  ],
  records: [
    {
      id: 'cloud-a',
      name: 'CloudScale Global Inc',
      code: 'CLOUD-A',
      attributes: { monthlyCost: 1200, uptimeSla: 99.95, latencyMs: 24, securityIndex: 92 },
      notes: 'Tier-4 Datacenter with multi-region redundancy.',
    },
    {
      id: 'cloud-b',
      name: 'AlphaNodes Tech',
      code: 'CLOUD-B',
      attributes: { monthlyCost: 850, uptimeSla: 99.80, latencyMs: 48, securityIndex: 84 },
      notes: 'Cost-optimized provider for non-critical workloads.',
    },
    {
      id: 'cloud-c',
      name: 'Enterprise Vault Services',
      code: 'CLOUD-C',
      attributes: { monthlyCost: 1650, uptimeSla: 99.99, latencyMs: 18, securityIndex: 98 },
      notes: 'High security compliance rating with dedicated hardware.',
    },
  ],
};

const CUSTOM_TALENT_PRESET: Dataset = {
  id: 'ds-custom-talent-02',
  useCase: 'custom',
  title: 'Senior Web3 Engineer Hiring Candidate Matrix',
  version: '2026-v02',
  timestamp: '2026-08-11 08:15:00 UTC',
  recordCount: 3,
  sourceOrigin: 'Talent Acquisition & Coding Challenge Scoring API',
  authorEmail: 'hr-agent@techcorp.io',
  metrics: [
    { id: 'systemArchScore', name: 'System Arch Test (1-100)', unit: 'pts', higherIsBetter: true, weight: 0.35 },
    { id: 'algoCodeScore', name: 'Solidity & Algo Test', unit: 'pts', higherIsBetter: true, weight: 0.30 },
    { id: 'expectedSalary', name: 'Expected Salary ($/yr)', unit: 'USD', higherIsBetter: false, weight: 0.20 },
    { id: 'yearsExperience', name: 'Years Web3 Experience', unit: 'yrs', higherIsBetter: true, weight: 0.15 },
  ],
  records: [
    {
      id: 'cand-1',
      name: 'Alex Rivera (Staff Web3 Dev)',
      code: 'CAND-ALEX',
      attributes: { systemArchScore: 95, algoCodeScore: 92, expectedSalary: 160000, yearsExperience: 6 },
    },
    {
      id: 'cand-2',
      name: 'Brenda Chen (Senior Smart Contract Eng)',
      code: 'CAND-BRENDA',
      attributes: { systemArchScore: 88, algoCodeScore: 96, expectedSalary: 145000, yearsExperience: 4 },
    },
    {
      id: 'cand-3',
      name: 'Carlos Gomez (Full Stack Dev)',
      code: 'CAND-CARLOS',
      attributes: { systemArchScore: 80, algoCodeScore: 84, expectedSalary: 120000, yearsExperience: 3 },
    },
  ],
};

interface AgentWorkspaceProps {
  onDecisionCreated: (record: DecisionRecord) => void;
  onViewBlock: (recordId: string) => void;
  onTestTamper: (record: DecisionRecord) => void;
}

export const AgentWorkspace: React.FC<AgentWorkspaceProps> = ({
  onDecisionCreated,
  onViewBlock,
  onTestTamper,
}) => {
  const [selectedUseCase, setSelectedUseCase] = useState<UseCaseType>('procurement');
  const [dataset, setDataset] = useState<Dataset>(PROCUREMENT_PRESET);
  const [customInstructions, setCustomInstructions] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [currentDecision, setCurrentDecision] = useState<DecisionRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Switch domain preset or custom mode
  const handleUseCaseChange = (useCase: UseCaseType) => {
    setSelectedUseCase(useCase);
    setCurrentDecision(null);
    setSteps([]);
    setErrorMsg(null);

    if (useCase === 'procurement') {
      setDataset(JSON.parse(JSON.stringify(PROCUREMENT_PRESET)));
    } else if (useCase === 'medical') {
      setDataset(JSON.parse(JSON.stringify(MEDICAL_PRESET)));
    } else if (useCase === 'loan') {
      setDataset(JSON.parse(JSON.stringify(LOAN_PRESET)));
    } else if (useCase === 'custom') {
      setDataset(JSON.parse(JSON.stringify(CUSTOM_CLOUD_PRESET)));
    }
  };

  // Update record attribute in dataset editor
  const handleAttributeChange = (recordIndex: number, attrKey: string, newValue: string | number) => {
    const updated = JSON.parse(JSON.stringify(dataset)) as Dataset;
    const parsedValue = typeof newValue === 'string' && !isNaN(Number(newValue)) ? Number(newValue) : newValue;
    updated.records[recordIndex].attributes[attrKey] = parsedValue;
    setDataset(updated);
  };

  // Update Candidate Name or Code
  const handleCandidateInfoChange = (recordIndex: number, field: 'name' | 'code', val: string) => {
    const updated = JSON.parse(JSON.stringify(dataset)) as Dataset;
    updated.records[recordIndex][field] = val;
    setDataset(updated);
  };

  // Add a new candidate row
  const handleAddCandidate = () => {
    const updated = JSON.parse(JSON.stringify(dataset)) as Dataset;
    const newIdx = updated.records.length + 1;
    const newId = `custom-cand-${Date.now()}`;
    
    // Initialize default attribute values matching existing metrics
    const initialAttrs: Record<string, number> = {};
    updated.metrics.forEach((m) => {
      initialAttrs[m.id] = m.higherIsBetter ? 80 : 100;
    });

    updated.records.push({
      id: newId,
      name: `New Candidate Option #${newIdx}`,
      code: `OPT-${newIdx}`,
      attributes: initialAttrs,
    });
    updated.recordCount = updated.records.length;
    setDataset(updated);
  };

  // Remove a candidate row
  const handleRemoveCandidate = (recordIdx: number) => {
    if (dataset.records.length <= 2) {
      alert('Must maintain at least 2 candidate options for comparative decision analysis.');
      return;
    }
    const updated = JSON.parse(JSON.stringify(dataset)) as Dataset;
    updated.records.splice(recordIdx, 1);
    updated.recordCount = updated.records.length;
    setDataset(updated);
  };

  // Add a new metric column
  const handleAddMetric = () => {
    const updated = JSON.parse(JSON.stringify(dataset)) as Dataset;
    const newId = `metric_${Date.now().toString().slice(-4)}`;
    const newMetric: DataMetric = {
      id: newId,
      name: `Custom Metric ${updated.metrics.length + 1}`,
      unit: 'pts',
      higherIsBetter: true,
      weight: 0.15,
    };

    updated.metrics.push(newMetric);

    // Populate new metric attribute in all records
    updated.records.forEach((r) => {
      r.attributes[newId] = 50;
    });

    setDataset(updated);
  };

  // Remove a metric column
  const handleRemoveMetric = (metricId: string) => {
    if (dataset.metrics.length <= 1) {
      alert('Must maintain at least 1 decision metric for multi-attribute scoring.');
      return;
    }
    const updated = JSON.parse(JSON.stringify(dataset)) as Dataset;
    updated.metrics = updated.metrics.filter((m) => m.id !== metricId);
    updated.records.forEach((r) => {
      delete r.attributes[metricId];
    });
    setDataset(updated);
  };

  // Update Metric property (name, weight, unit, higherIsBetter)
  const handleMetricChange = (metricId: string, field: keyof DataMetric, value: any) => {
    const updated = JSON.parse(JSON.stringify(dataset)) as Dataset;
    const m = updated.metrics.find((item) => item.id === metricId);
    if (m) {
      (m as any)[field] = value;
      setDataset(updated);
    }
  };

  // Run the Agent pipeline
  const handleRunAgent = async () => {
    setIsRunning(true);
    setErrorMsg(null);
    setCurrentDecision(null);

    // Initial placeholder steps
    const initialSteps: AgentStep[] = [
      {
        id: 's1',
        tool: 'DataInspector',
        status: 'running',
        title: 'DataInspector',
        summary: 'Ingesting raw dataset & calculating SHA-256 fingerprint...',
        timestamp: new Date().toISOString(),
      },
      {
        id: 's2',
        tool: 'EvidenceAnalyzer',
        status: 'pending',
        title: 'EvidenceAnalyzer',
        summary: 'Evaluating data completeness, source authenticity, and quality index...',
        timestamp: new Date().toISOString(),
      },
      {
        id: 's3',
        tool: 'DecisionEngine',
        status: 'pending',
        title: 'DecisionEngine',
        summary: 'Synthesizing multi-criteria utility matrix with Gemini 3.6 Flash...',
        timestamp: new Date().toISOString(),
      },
      {
        id: 's4',
        tool: 'RiskChecker',
        status: 'pending',
        title: 'RiskChecker',
        summary: 'Auditing conflicts of interest, operational risks, and compliance flags...',
        timestamp: new Date().toISOString(),
      },
      {
        id: 's5',
        tool: 'BlockchainNotary',
        status: 'pending',
        title: 'BlockchainNotary',
        summary: 'Minting Merkle Root & on-chain proof block to L1 ledger...',
        timestamp: new Date().toISOString(),
      },
    ];

    setSteps(initialSteps);

    try {
      const res = await fetch('/api/agent/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          useCase: selectedUseCase,
          dataset,
          customInstructions,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to execute agent workflow');
      }

      setSteps(data.steps);
      setCurrentDecision(data.record);
      onDecisionCreated(data.record);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error running agent');
      setSteps((prev) =>
        prev.map((s) => (s.status === 'running' ? { ...s, status: 'failed', summary: err.message } : s))
      );
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner / Concept Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              <Layers className="h-3.5 w-3.5" />
              Observe → Reason → Verify → Act → Prove
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              AI Decision Agent with Tamper-Evident Verification
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              In mission-critical applications, AI recommendations must be auditable. PROVENANCE AI evaluates raw dataset metrics, reasons transparently, and writes a cryptographic hash proof of evaluating parameters onto an immutable on-chain ledger.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRunAgent}
              disabled={isRunning}
              className={`px-5 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg transition-all ${
                isRunning
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-600 hover:opacity-95 text-white shadow-cyan-500/25 active:scale-95'
              }`}
            >
              {isRunning ? (
                <>
                  <div className="h-4 w-4 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                  <span>Agent Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-current" />
                  <span>Execute Decision Agent</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Domain / Case Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => handleUseCaseChange('procurement')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedUseCase === 'procurement'
              ? 'bg-slate-800 border-cyan-500 shadow-md shadow-cyan-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold uppercase text-cyan-400">Flagship Case</span>
            {selectedUseCase === 'procurement' && <CheckCircle className="h-4 w-4 text-cyan-400" />}
          </div>
          <h3 className="font-semibold text-white text-sm">AI Procurement & Supplier Selection</h3>
          <p className="text-xs text-slate-400 mt-1">Evaluates Unit Cost, On-Time Delivery %, ESG Score, & Dispute History.</p>
        </button>

        <button
          onClick={() => handleUseCaseChange('medical')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedUseCase === 'medical'
              ? 'bg-slate-800 border-cyan-500 shadow-md shadow-cyan-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold uppercase text-rose-400">Clinical Triage</span>
            {selectedUseCase === 'medical' && <CheckCircle className="h-4 w-4 text-cyan-400" />}
          </div>
          <h3 className="font-semibold text-white text-sm">Medical Triage & Care Pathway</h3>
          <p className="text-xs text-slate-400 mt-1">Evaluates Cardiac Troponin, SpO2, Blood Pressure, & Comorbidities.</p>
        </button>

        <button
          onClick={() => handleUseCaseChange('loan')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedUseCase === 'loan'
              ? 'bg-slate-800 border-cyan-500 shadow-md shadow-cyan-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold uppercase text-emerald-400">Financial Risk</span>
            {selectedUseCase === 'loan' && <CheckCircle className="h-4 w-4 text-cyan-400" />}
          </div>
          <h3 className="font-semibold text-white text-sm">Commercial Credit Facility Underwriting</h3>
          <p className="text-xs text-slate-400 mt-1">Evaluates DSCR Ratio, Debt-to-Equity, Bureau Score, & Collateral.</p>
        </button>

        <button
          onClick={() => handleUseCaseChange('custom')}
          className={`p-4 rounded-xl border text-left transition-all ${
            selectedUseCase === 'custom'
              ? 'bg-slate-800 border-amber-500 shadow-md shadow-amber-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold uppercase text-amber-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Custom Builder
            </span>
            {selectedUseCase === 'custom' && <CheckCircle className="h-4 w-4 text-amber-400" />}
          </div>
          <h3 className="font-semibold text-white text-sm">Custom Evaluation & Manual Entry</h3>
          <p className="text-xs text-slate-400 mt-1">Define custom candidates, add custom metrics, & configure weight formulas.</p>
        </button>
      </div>

      {/* Dataset Inspector & Editor Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex-1 space-y-1">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-cyan-400" />
              {selectedUseCase === 'custom' ? (
                <input
                  type="text"
                  value={dataset.title}
                  onChange={(e) => {
                    const updated = { ...dataset, title: e.target.value };
                    setDataset(updated);
                  }}
                  className="bg-slate-950 border border-slate-700 text-white font-bold text-lg px-3 py-1 rounded-lg focus:border-cyan-500 outline-none w-full max-w-md"
                  placeholder="Dataset Evaluation Title..."
                />
              ) : (
                <h3 className="text-lg font-bold text-white">{dataset.title}</h3>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Source:{' '}
              {selectedUseCase === 'custom' ? (
                <input
                  type="text"
                  value={dataset.sourceOrigin}
                  onChange={(e) => {
                    const updated = { ...dataset, sourceOrigin: e.target.value };
                    setDataset(updated);
                  }}
                  className="bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs px-2 py-0.5 rounded outline-none"
                />
              ) : (
                <span className="font-mono text-slate-300">{dataset.sourceOrigin}</span>
              )}{' '}
              | Version: <span className="font-mono text-cyan-300">{dataset.version}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {selectedUseCase === 'custom' && (
              <>
                <button
                  onClick={() => setDataset(JSON.parse(JSON.stringify(CUSTOM_CLOUD_PRESET)))}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 font-mono"
                >
                  Template 1: Cloud Providers
                </button>
                <button
                  onClick={() => setDataset(JSON.parse(JSON.stringify(CUSTOM_TALENT_PRESET)))}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 font-mono"
                >
                  Template 2: Candidate Hiring
                </button>
              </>
            )}
            <button
              onClick={() => handleUseCaseChange(selectedUseCase)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 border border-slate-700"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Values</span>
            </button>
          </div>
        </div>

        {/* Action Toolbar for Custom Datasets */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div className="text-xs font-mono text-slate-300 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-cyan-400" />
            <span>Dataset Controls ({dataset.records.length} Candidates, {dataset.metrics.length} Metrics)</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAddCandidate}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-700/60 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>+ Add Candidate Option</span>
            </button>

            <button
              onClick={handleAddMetric}
              className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>+ Add Metric Column</span>
            </button>
          </div>
        </div>

        {/* Dataset Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/90 text-slate-200 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold min-w-[200px]">Candidate Option</th>
                {dataset.metrics.map((m) => (
                  <th key={m.id} className="py-3.5 px-4 font-semibold min-w-[180px] bg-slate-900/40">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-1">
                        <input
                          type="text"
                          value={m.name}
                          onChange={(e) => handleMetricChange(m.id, 'name', e.target.value)}
                          className="bg-slate-950 border border-slate-700 px-2 py-0.5 rounded text-xs font-bold text-white w-full outline-none focus:border-cyan-500"
                        />
                        <button
                          onClick={() => handleRemoveMetric(m.id)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                          title="Delete Metric Column"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2 text-[10px] normal-case font-sans">
                        <div className="flex items-center space-x-1">
                          <span className="text-slate-400">Weight:</span>
                          <input
                            type="number"
                            step="0.05"
                            min="0.01"
                            max="1.0"
                            value={m.weight}
                            onChange={(e) =>
                              handleMetricChange(m.id, 'weight', parseFloat(e.target.value) || 0)
                            }
                            className="w-14 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-[11px] outline-none"
                          />
                        </div>

                        <button
                          onClick={() => handleMetricChange(m.id, 'higherIsBetter', !m.higherIsBetter)}
                          className={`px-1.5 py-0.5 rounded border text-[10px] font-mono flex items-center gap-1 ${
                            m.higherIsBetter
                              ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-400'
                              : 'bg-rose-950/60 border-rose-700/60 text-rose-400'
                          }`}
                          title="Click to toggle Higher-is-better vs Lower-is-better"
                        >
                          {m.higherIsBetter ? (
                            <>
                              <TrendingUp className="h-3 w-3" /> Higher ↑
                            </>
                          ) : (
                            <>
                              <TrendingDown className="h-3 w-3" /> Lower ↓
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
                <th className="py-3.5 px-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {dataset.records.map((rec, rIdx) => (
                <tr key={rec.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={rec.name}
                        onChange={(e) => handleCandidateInfoChange(rIdx, 'name', e.target.value)}
                        className="font-semibold text-white bg-slate-900 border border-slate-700/80 rounded px-2 py-1 text-xs w-full focus:border-cyan-500 outline-none"
                        placeholder="Entity Name..."
                      />
                      <input
                        type="text"
                        value={rec.code}
                        onChange={(e) => handleCandidateInfoChange(rIdx, 'code', e.target.value)}
                        className="text-[10px] text-slate-400 font-mono bg-slate-950 border border-slate-800 rounded px-2 py-0.5 w-full outline-none"
                        placeholder="CODE..."
                      />
                    </div>
                  </td>

                  {dataset.metrics.map((m) => {
                    const val = rec.attributes[m.id];
                    return (
                      <td key={m.id} className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            value={val !== undefined ? val : ''}
                            onChange={(e) => handleAttributeChange(rIdx, m.id, e.target.value)}
                            className="w-24 px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-slate-100 font-mono text-xs focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                          />
                          <span className="text-[10px] text-slate-400 font-mono">{m.unit || ''}</span>
                        </div>
                      </td>
                    );
                  })}

                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleRemoveCandidate(rIdx)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800 transition-colors"
                      title="Delete Candidate Row"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Custom AI Agent Instructions */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
            <span>Optional Decision Strategy & Custom Constraints</span>
          </label>
          <input
            type="text"
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="e.g. Prioritize options with lowest cost or emphasize uptime SLA above 99.9%..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 outline-none"
          />
        </div>
      </div>

      {/* Transparent Math Scoring Explainer Component */}
      <MathScoringExplainer dataset={dataset} />

      {/* Execution Progress & Steps Section */}
      {steps.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Live Agent Tool Execution Pipeline</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              5 Modular Tools (Observe → Reason → Verify → Act → Prove)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {steps.map((step, idx) => {
              const isDone = step.status === 'completed';
              const isExec = step.status === 'running';

              return (
                <div
                  key={step.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isDone
                      ? 'bg-slate-800/80 border-emerald-500/40 text-emerald-300'
                      : isExec
                      ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-300 animate-pulse'
                      : 'bg-slate-950/40 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      Step 0{idx + 1}
                    </span>
                    {isDone ? (
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                    ) : isExec ? (
                      <div className="h-3.5 w-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-full border border-slate-700"></div>
                    )}
                  </div>
                  <h4 className="font-semibold text-xs text-white mb-1">{step.tool}</h4>
                  <p className="text-[11px] leading-tight text-slate-400 line-clamp-3">{step.summary}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Generated Decision Output Card */}
      {currentDecision && (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  {currentDecision.id}
                </span>
                <span className="text-xs text-slate-400">• {currentDecision.timestamp}</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Recommendation: {currentDecision.decisionOutput.winnerName}
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => onTestTamper(currentDecision)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Test Audit & Tamper Verifier</span>
              </button>

              <button
                onClick={() => onViewBlock(currentDecision.id)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 border border-slate-700"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>View On-Chain Block</span>
              </button>
            </div>
          </div>

          {/* Rationale & Facts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-cyan-400">Decision Rationale & Evidence</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {currentDecision.decisionOutput.recommendationSummary}
                </p>
                <ul className="space-y-1.5 pt-2">
                  {currentDecision.decisionOutput.rationalePoints.map((point, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Comparative Rankings */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400">Candidate Evaluation Rankings</h4>
                <div className="space-y-2">
                  {currentDecision.decisionOutput.comparativeRankings.map((cand) => (
                    <div
                      key={cand.entityId}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                        cand.entityId === currentDecision.decisionOutput.winnerId
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                          : 'bg-slate-950/40 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`h-6 w-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                            cand.rank === 1
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          #{cand.rank}
                        </span>
                        <div>
                          <div className="font-semibold text-white">{cand.entityName}</div>
                          <div className="text-[10px] text-slate-400">
                            Pros: {cand.pros.join(', ') || 'N/A'}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-bold text-sm text-cyan-400">{cand.overallScore}/100</div>
                        <div className="text-[10px] text-slate-400">Utility Index</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cryptographic Hashes & Block Proof Box */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="flex items-center space-x-2 text-cyan-400 pb-2 border-b border-slate-800 font-sans font-bold text-xs">
                  <Lock className="h-4 w-4" />
                  <span>On-Chain Cryptographic Proof</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Raw Dataset Hash (SHA-256)</span>
                  <span className="text-[11px] text-emerald-400 break-all">
                    0x{currentDecision.hashes.rawDatasetHash}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">AI Reasoning Hash</span>
                  <span className="text-[11px] text-cyan-400 break-all">
                    0x{currentDecision.hashes.reasoningHash}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">On-Chain Merkle Root</span>
                  <span className="text-[11px] text-indigo-400 break-all">
                    {currentDecision.onChainBlock.merkleRoot}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <div className="text-[10px] text-slate-400">Transaction Hash</div>
                  <div className="text-[10px] text-slate-200 break-all">
                    {currentDecision.onChainBlock.txHash}
                  </div>
                </div>
              </div>

              {/* Risk Assessment Summary */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Risk Assessment</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      currentDecision.riskAssessment.overallRiskLevel === 'LOW'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {currentDecision.riskAssessment.overallRiskLevel} RISK
                  </span>
                </div>
                <ul className="text-xs text-slate-400 space-y-1 pt-1">
                  {currentDecision.riskAssessment.identifiedRisks.map((r, rIdx) => (
                    <li key={rIdx} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 bg-amber-400 rounded-full"></span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
