import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Lock, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Send, 
  Mail, 
  MessageSquare,
  Sparkles,
  Layers,
  CheckCircle2,
  Trophy
} from 'lucide-react';

interface FooterProps {
  onOpenIdentityModal: () => void;
  onOpenPitchDeck?: () => void;
  onNavigateToTab: (tab: 'landing' | 'workspace' | 'ledger' | 'verifier' | 'certificate' | 'contract' | 'about') => void;
  recordCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenIdentityModal,
  onOpenPitchDeck,
  onNavigateToTab,
  recordCount
}) => {
  return (
    <footer id="main-app-footer" className="mt-16 border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-emerald-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">PROVENANCE AI</span>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                EVM Sepolia Live
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-light">
              A cryptographic memory layer and tamper-evident audit ledger engineered specifically for autonomous AI agents. AI can make a decision. PROVENANCE AI makes that decision verifiable.
            </p>

            {/* Verified Agent Identity Badge Trigger */}
            <div className="pt-2">
              <button
                id="footer-verified-agent-identity-btn"
                onClick={onOpenIdentityModal}
                className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 text-xs font-mono font-semibold transition-all shadow-sm shadow-cyan-500/10 active:scale-95"
              >
                <ShieldCheck className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Verified Agent Identity</span>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-[10px] text-cyan-400/70 font-normal underline decoration-cyan-400/40">View Root Hash</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-white tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateToTab('landing')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Overview & Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('workspace')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Agent Workspace
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('verifier')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Forensic Tamper Verifier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('contract')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Sepolia Solidity Contract
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateToTab('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About Researcher & Project
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Developer & Contact */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase font-bold text-white tracking-wider">
              Research & Developer
            </h4>
            <div className="text-xs text-slate-300">
              <span className="font-semibold text-white block">Akhmad Khudri</span>
              <span className="text-[11px] text-slate-400 font-mono block">Lecturer & PhD Candidate</span>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://github.com/mrbrightsides"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="GitHub"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/akhmad-khudri/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://t.me/khudriakhmad"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-400 hover:text-sky-300 border border-slate-800 transition-colors"
                title="Telegram"
              >
                <Send className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://discord.com/channels/@khudri_61362"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-400 hover:text-indigo-300 border border-slate-800 transition-colors"
                title="Discord"
              >
                <MessageSquare className="h-3.5 w-3.5" />
              </a>
              <a
                href="mailto:khudri@binadarma.ac.id"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border border-slate-800 transition-colors"
                title="Email"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
            </div>

            {onOpenPitchDeck && (
              <div className="pt-1">
                <button
                  onClick={onOpenPitchDeck}
                  className="text-[11px] font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                >
                  <Trophy className="h-3 w-3" />
                  <span>NTU InnovateX '26 Pitch Deck</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <div>
            © 2026 Provenance AI • Developed by Akhmad Khudri for NTU InnovateX '26 Web3 Track
          </div>
          <div className="flex items-center space-x-3">
            <span>Sepolia Contract: <code className="text-slate-400">0xC442...375e5</code></span>
            <span>•</span>
            <button
              onClick={onOpenIdentityModal}
              className="text-cyan-400 hover:underline"
            >
              Root Hash Attestation
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
