import React from 'react';
import { ShieldCheck, Cpu, Database, CheckCircle2, FileText, Activity, Code2, Trophy, Github } from 'lucide-react';

interface HeaderProps {
  activeTab: 'workspace' | 'ledger' | 'verifier' | 'certificate' | 'contract';
  setActiveTab: (tab: 'workspace' | 'ledger' | 'verifier' | 'certificate' | 'contract') => void;
  recordCount: number;
  onOpenPitchDeck?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, recordCount, onOpenPitchDeck }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-95 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-4">
          
          {/* Brand & Tagline */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  PROVENANCE AI
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  L1 VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal mt-0.5">
                AI can make a decision. PROVENANCE AI makes that decision verifiable.
              </p>
            </div>
          </div>

          {/* Ledger Status Pill, Hackathon Badge & AI Model Info */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            {onOpenPitchDeck && (
              <button
                onClick={onOpenPitchDeck}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-cyan-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-mono font-bold transition-all shadow-md shadow-amber-500/10 active:scale-95"
              >
                <Trophy className="h-3.5 w-3.5 text-amber-400 animate-bounce" />
                <span>NTU InnovateX '26 Pitch Deck</span>
              </button>
            )}

            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-300">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              <span>Engine: <strong className="text-white font-mono">Gemini 3.6 Flash</strong></span>
            </div>

            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-300">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>On-Chain Ledger: <strong className="text-white font-mono">{recordCount} Blocks</strong></span>
            </div>

            <a
              href="https://github.com/mrbrightsides/provenance"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition-colors"
              title="View GitHub Repository"
            >
              <Github className="h-3.5 w-3.5" />
              <span className="hidden lg:inline font-mono">GitHub</span>
            </a>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 border-t border-slate-800 pt-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'workspace'
                ? 'bg-slate-800/80 text-cyan-400 border-cyan-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-transparent'
            }`}
          >
            <Cpu className="h-4 w-4" />
            <span>Agent Workspace</span>
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'ledger'
                ? 'bg-slate-800/80 text-cyan-400 border-cyan-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-transparent'
            }`}
          >
            <Database className="h-4 w-4" />
            <span>Blockchain Explorer</span>
            <span className="px-1.5 py-0.2 bg-slate-700 text-slate-200 text-[10px] rounded-full">
              {recordCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('verifier')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'verifier'
                ? 'bg-slate-800/80 text-emerald-400 border-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-transparent'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Audit & Tamper Verifier</span>
            <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] rounded-full font-semibold">
              Lab
            </span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'certificate'
                ? 'bg-slate-800/80 text-amber-400 border-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-transparent'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Audit Certificate</span>
          </button>

          <button
            onClick={() => setActiveTab('contract')}
            className={`flex items-center space-x-2 px-4 py-2.5 text-xs font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === 'contract'
                ? 'bg-slate-800/80 text-indigo-400 border-indigo-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-transparent'
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>Solidity Contract</span>
            <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 text-[10px] rounded-full font-semibold">
              Remix
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
