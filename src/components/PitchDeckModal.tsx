import React, { useState } from 'react';
import {
  Trophy,
  X,
  ShieldCheck,
  Cpu,
  Database,
  CheckCircle2,
  Lock,
  Zap,
  Award,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Sparkles,
  FileText,
  Code2,
} from 'lucide-react';
import { DEPLOYED_CONTRACT_ADDRESS } from '../contracts/contractConfig';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: 'workspace' | 'ledger' | 'verifier' | 'certificate' | 'contract') => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  if (!isOpen) return null;

  const slides = [
    {
      id: 'overview',
      title: 'Project Overview & Track Fit',
      subtitle: 'NTU InnovateX Hackathon 2026 • Track 2: AI Agents & Real-World Use Cases',
    },
    {
      id: 'problem',
      title: 'The Problem: "Black Box" AI Risk',
      subtitle: 'Why autonomous AI decisions lack trust in high-stakes industries',
    },
    {
      id: 'solution',
      title: 'The Solution: PROVENANCE AI',
      subtitle: 'Cryptographic memory layer & tamper-evident audit ledger for AI Agents',
    },
    {
      id: 'architecture',
      title: 'System Architecture & Web3 Stack',
      subtitle: 'Gemini 3.6 Multi-Agent Engine + EVM Solidity Ledger + Cryptographic Hashing',
    },
    {
      id: 'contract',
      title: 'Live Deployed Smart Contract',
      subtitle: 'ProvenanceLedger.sol notarizing real-time Merkle proofs on EVM',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl my-8 text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-lg text-white font-bold text-xs">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold tracking-tight text-white">
                  NTU InnovateX Hackathon 2026
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Track 2 Candidate
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Official Pitch Deck & Executive Architecture Summary
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Slide Selector Tabs */}
        <div className="flex space-x-1 px-6 pt-3 bg-slate-950/50 border-b border-slate-800/80 overflow-x-auto scrollbar-none shrink-0">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(idx)}
              className={`px-3.5 py-2 text-xs font-mono rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                activeSlide === idx
                  ? 'bg-slate-900 text-cyan-400 border-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              0{idx + 1}. {slide.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Modal Slide Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* SLIDE 1: OVERVIEW */}
          {activeSlide === 0 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold">
                  <Award className="h-4 w-4" />
                  <span>NTU InnovateX Hackathon 2026 Submission</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  PROVENANCE AI
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                  Decentralized, Tamper-Evident Memory and Audit Layer for Autonomous AI Agents. Turning black-box agentic decisions into mathematically verifiable, on-chain notarized truth.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                  <a
                    href="https://provenance-ai.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Live App: provenance-ai.vercel.app</span>
                  </a>
                  <a
                    href="https://github.com/mrbrightsides/provenance"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>GitHub: mrbrightsides/provenance</span>
                  </a>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    EVM Smart Contract Deployed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <Cpu className="h-6 w-6 text-cyan-400" />
                  <h4 className="text-xs font-bold text-white">Autonomous Agentic Engine</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Powered by Gemini 3.6 Flash. Executes multi-criteria evaluations across supply procurement, triage, and loans.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" />
                  <h4 className="text-xs font-bold text-white">SHA-256 & Merkle Tree Proofs</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Computes raw dataset hashes and Merkle root trees off-chain to maintain high performance with strict data privacy.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <Database className="h-6 w-6 text-indigo-400" />
                  <h4 className="text-xs font-bold text-white">On-Chain Immutable Ledger</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Notarizes immutable proofs to EVM Smart Contract <code className="text-indigo-300">0xC442...375e5</code> for auditability.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: PROBLEM */}
          {activeSlide === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-white">The Problem: Black Box AI Risk in Real-World Operations</h2>
                <p className="text-xs text-slate-400 mt-1">
                  As AI agents gain autonomy in enterprise operations, non-verifiable decision making creates massive regulatory, financial, and legal risks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-900/60 space-y-2">
                  <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <X className="h-4 w-4 text-rose-400" />
                    <span>Retroactive Data Tampering</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Unscrupulous suppliers, bad actors, or internal admins can modify prices, quality metrics, or medical readings after a decision is made to avoid liability.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-900/60 space-y-2">
                  <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <X className="h-4 w-4 text-rose-400" />
                    <span>Hallucination & Lack of Audit Trail</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Regulators and auditors cannot verify what exact dataset snapshot or evidence prompt was evaluated when an AI agent authorized a million-dollar contract.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-900/60 space-y-2">
                  <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <X className="h-4 w-4 text-rose-400" />
                    <span>Inconsistent Dispute Resolution</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Without cryptographic proof, disputes between buyers and vendors result in costly litigation with no objective, unalterable source of truth.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-900/60 space-y-2">
                  <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <X className="h-4 w-4 text-rose-400" />
                    <span>Data Sovereignty Violations</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Storing raw confidential data directly on public blockchains violates enterprise privacy rules (GDPR / HIPAA / Banking secrecy).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 3: SOLUTION */}
          {activeSlide === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-white">The PROVENANCE AI Paradigm: Observe → Reason → Verify → Act → Prove</h2>
                <p className="text-xs text-slate-400 mt-1">
                  A dual-layer solution combining off-chain confidential dataset privacy with on-chain EVM cryptographic immutability.
                </p>
              </div>

              {/* 5 Steps Pipeline */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-cyan-400">1. OBSERVE (Telemetry Ingestion)</span>
                  <span className="text-slate-400">Ingests multi-criteria candidate attributes & telemetry streams</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-indigo-400">2. REASON (Gemini 3.6 Multi-Agent)</span>
                  <span className="text-slate-400">EvidenceAnalyzer + DecisionEngine + RiskChecker execute analysis</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-emerald-400">3. VERIFY (Off-Chain Cryptography)</span>
                  <span className="text-slate-400">Calculates raw dataset SHA-256 hash & 4-leaf Merkle root tree</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-amber-400">4. ACT & PROVE (EVM Notarization)</span>
                  <span className="text-slate-400">Calls `notarizeDecision()` on `ProvenanceLedger.sol` on-chain</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-rose-400">5. AUDIT (Tamper-Evident Lab)</span>
                  <span className="text-slate-400">Re-computes hashes in real-time to detect single-byte data tampering</span>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 4: ARCHITECTURE */}
          {activeSlide === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-white">Full-Stack Technical Architecture</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Designed for performance, privacy, and full EVM interoperability.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-cyan-400 font-mono font-bold flex items-center gap-1.5">
                    <Cpu className="h-4 w-4" />
                    <span>AI Engine & Backend</span>
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong>Express.js</strong> custom server running behind port 3000 proxy</li>
                    <li>• <strong>Gemini 3.6 Flash</strong> SDK for structured decision outputs</li>
                    <li>• Multi-agent orchestration (Evidence, Scoring, Risk)</li>
                    <li>• Fail-safe mathematical calculation engines for 100% uptime</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-indigo-400 font-mono font-bold flex items-center gap-1.5">
                    <Database className="h-4 w-4" />
                    <span>Web3 & Smart Contract</span>
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong>Solidity 0.8.20</strong> (`ProvenanceLedger.sol`)</li>
                    <li>• Notarizes SHA-256 raw dataset hashes & Merkle roots</li>
                    <li>• Implements `verifyDatasetIntegrity()` on-chain method</li>
                    <li>• Deployed on EVM: <code className="text-indigo-300">0xC442...375e5</code></li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Cryptographic Verification</span>
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Node.js native SHA-256 hash generation</li>
                    <li>• Merkle Tree root construction & proof generation</li>
                    <li>• Forensic field-level diff analyzer for tamper detection</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-amber-400 font-mono font-bold flex items-center gap-1.5">
                    <FileText className="h-4 w-4" />
                    <span>User Interface & Audit</span>
                  </div>
                  <ul className="space-y-1 text-slate-300">
                    <li>• <strong>React 18 + Vite + Tailwind CSS</strong></li>
                    <li>• Interactive Tamper Simulation Laboratory</li>
                    <li>• Printable Verifiable Audit Certificates with QR Seals</li>
                    <li>• Blockchain Block Explorer view with search & filter</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 5: CONTRACT */}
          {activeSlide === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-white">Live Smart Contract Artifacts</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Inspect the live deployed contract address and ABI ready for judging and evaluation.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Deployed Contract Address (CA)
                  </span>
                  <div className="text-emerald-400 font-mono font-bold text-sm md:text-base break-all mt-1">
                    {DEPLOYED_CONTRACT_ADDRESS}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToTab('contract');
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2"
                  >
                    <Code2 className="h-4 w-4" />
                    <span>View Full Contract Code & ABI</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToTab('verifier');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Test Tamper Verifier Lab</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
            disabled={activeSlide === 0}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSlide === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
          >
            Previous
          </button>

          <div className="flex items-center space-x-1.5">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === i ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          {activeSlide < slides.length - 1 ? (
            <button
              onClick={() => setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <span>Next</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <span>Done / Explore App</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
