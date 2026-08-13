import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Zap, 
  Layers, 
  Scale, 
  FileCheck, 
  ExternalLink,
  ChevronRight,
  Code2,
  Trophy,
  Github,
  AlertTriangle
} from 'lucide-react';
import { DecisionRecord } from '../types';

interface LandingPageProps {
  onLaunchWorkspace: () => void;
  onExploreLedger: () => void;
  onLaunchVerifier: () => void;
  onViewContract: () => void;
  onOpenPitchDeck: () => void;
  recentRecords: DecisionRecord[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchWorkspace,
  onExploreLedger,
  onLaunchVerifier,
  onViewContract,
  onOpenPitchDeck,
  recentRecords
}) => {
  return (
    <div className="space-y-16 pb-16 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Background Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* Top Pill Badges */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              NTU InnovateX '26 Web3 Track
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5 shadow-sm">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              Gemini 3.6 Multi-Agent Core
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5 shadow-sm">
              <Lock className="h-3.5 w-3.5 text-indigo-400" />
              Sepolia Smart Contract Live
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            The Cryptographic Memory & Audit Ledger for{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              Autonomous AI Agents
            </span>
          </h1>

          {/* Core Tagline */}
          <p className="text-base sm:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            AI can make a decision.{' '}
            <strong className="text-white font-semibold underline decoration-cyan-400/50 underline-offset-4">
              PROVENANCE AI
            </strong>{' '}
            makes that decision mathematically verifiable, private, and legally defensible on-chain.
          </p>

          {/* Primary Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onLaunchWorkspace}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Cpu className="h-4 w-4" />
              <span>Launch Agent Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={onLaunchVerifier}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 font-semibold text-sm flex items-center gap-2 shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Test Tamper Verifier Lab</span>
            </button>

            <button
              onClick={onOpenPitchDeck}
              className="px-5 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Trophy className="h-4 w-4 text-amber-400 animate-bounce" />
              <span>Pitch Deck</span>
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-left">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-xs text-slate-400 font-mono">Blockchain Integrity</div>
              <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                100% Immutable
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-xs text-slate-400 font-mono">Data Privacy</div>
              <div className="text-lg font-bold text-cyan-400 font-mono mt-0.5 flex items-center gap-1">
                <Lock className="h-4 w-4 text-cyan-400" />
                Zero-Leakage
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-xs text-slate-400 font-mono">Gas Fee Estimation</div>
              <div className="text-lg font-bold text-indigo-400 font-mono mt-0.5 flex items-center gap-1">
                <Zap className="h-4 w-4 text-indigo-400" />
                Real-Time Gwei
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <div className="text-xs text-slate-400 font-mono">On-Chain Contract</div>
              <div className="text-lg font-bold text-amber-300 font-mono mt-0.5 flex items-center gap-1">
                <Code2 className="h-4 w-4 text-amber-400" />
                EVM Sepolia
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE CRITICAL PROBLEM & WHY CENTRALIZED DB FAILS */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-xs font-bold font-mono text-rose-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>The Enterprise AI Governance Dilemma</span>
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Why Centralized Databases Fail for AI Audit Trails
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            As autonomous AI agents manage multi-million dollar procurement, credit scoring, and healthcare diagnostics, traditional audit logs present severe vulnerabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-rose-500/40 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">DBA & Root Admin Tampering</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              In PostgreSQL or AWS S3, anyone with root database access can alter vendor scores or decision logs retroactively with zero trace. Centralized databases offer <strong>zero non-repudiation</strong> in court.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">The GDPR / Privacy Trap</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Storing raw business documents or PII directly on public blockchains violates privacy regulations like GDPR, HIPAA, and banking secrecy laws. Raw data MUST remain off-chain.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-cyan-500/40 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">The Provenance Solution</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              PROVENANCE AI uses a <strong>dual-layer architecture</strong>: raw data stays private off-chain, while a 32-byte cryptographic Merkle Root is notarized on EVM smart contracts.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS / ARCHITECTURE PIPELINE */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-4 w-4" />
              <span>Core Architecture</span>
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">End-to-End Cryptographic Decision Pipeline</h3>
          </div>
          <button
            onClick={onViewContract}
            className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
          >
            <span>Inspect Solidity Smart Contract</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* 4 Steps Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="h-7 w-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                01
              </span>
              <Cpu className="h-4 w-4 text-slate-500" />
            </div>
            <h4 className="text-sm font-bold text-white">Multi-Agent Evaluation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gemini 3.6 Flash ingests complex multi-criteria tenders or applications and calculates weighted mathematical scores.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="h-7 w-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center">
                02
              </span>
              <Database className="h-4 w-4 text-slate-500" />
            </div>
            <h4 className="text-sm font-bold text-white">Merkle Tree Hashing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hashes datasets, origin evidence, and AI reasoning chains into SHA-256 digests and computes a 32-byte Merkle Root.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="h-7 w-7 rounded-lg bg-indigo-500/20 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">
                03
              </span>
              <Lock className="h-4 w-4 text-slate-500" />
            </div>
            <h4 className="text-sm font-bold text-white">EVM Notarization</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              MetaMask signs a transaction to <code className="text-indigo-300 font-mono text-[10px]">ProvenanceLedger.sol</code> on Sepolia Testnet, sealing an unalterable timestamp.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative">
            <div className="flex items-center justify-between">
              <span className="h-7 w-7 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                04
              </span>
              <CheckCircle2 className="h-4 w-4 text-slate-500" />
            </div>
            <h4 className="text-sm font-bold text-white">Forensic Audit & Certs</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Auditors verify records against on-chain block roots or run live tamper simulations to pinpoint modified fields.
            </p>
          </div>

        </div>
      </section>

      {/* 4. RECENT ON-CHAIN DECISIONS PREVIEW */}
      {recentRecords.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Database className="h-5 w-5 text-cyan-400" />
                <span>Live On-Chain Decision Feed</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time cryptographic decisions notarized on Sepolia Testnet
              </p>
            </div>
            <button
              onClick={onExploreLedger}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
            >
              <span>View All ({recentRecords.length} Blocks)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentRecords.slice(0, 2).map((rec) => {
              const merkleRootStr = rec.onChainBlock?.merkleRoot || rec.hashes?.decisionRecordHash || '';
              const displayMerkle = merkleRootStr.length > 18
                ? `${merkleRootStr.slice(0, 10)}...${merkleRootStr.slice(-8)}`
                : (merkleRootStr || '0x...');

              return (
                <div
                  key={rec.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] font-mono font-bold">
                      Block #{rec.onChainBlock?.blockIndex ?? 1}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono uppercase font-bold flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      Notarized
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{rec.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {rec.decisionOutput?.recommendationSummary || 'Decision evaluation compiled and notarized.'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Merkle Root:</span>
                    <span className="text-cyan-400 font-bold">
                      {displayMerkle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. FOOTER CALL-TO-ACTION */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-cyan-950/80 border border-slate-800 p-8 sm:p-12 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-white">
          Ready to Make Your AI Decisions Legally Defensible?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Test autonomous agent evaluations, generate cryptographic Merkle proofs, and notarize results live on Sepolia EVM Testnet.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onLaunchWorkspace}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg transition-all"
          >
            <Cpu className="h-4 w-4" />
            <span>Open Agent Workspace</span>
          </button>

          <button
            onClick={onOpenPitchDeck}
            className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-mono font-semibold text-xs flex items-center gap-2 transition-all"
          >
            <Trophy className="h-4 w-4 text-amber-400" />
            <span>NTU InnovateX Pitch Deck</span>
          </button>
        </div>
      </section>

    </div>
  );
};
