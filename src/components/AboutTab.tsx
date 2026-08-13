import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Sparkles, 
  Send, 
  Mail, 
  Linkedin, 
  Github, 
  Code2, 
  BookOpen, 
  ShieldCheck, 
  Layers, 
  AlertTriangle, 
  Trophy, 
  Zap, 
  CheckCircle2, 
  MessageSquare,
  Globe,
  ExternalLink,
  Cpu,
  Database,
  Lock,
  ArrowUpRight,
  Lightbulb,
  Milestone
} from 'lucide-react';

export const AboutTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'developer' | 'project'>('developer');

  return (
    <div className="space-y-8 pb-16 font-sans">
      
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>NTU InnovateX '26 Submission & Creator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              About <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">Provenance AI</span> & Developer
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Discover the story behind Provenance AI, the hackathon submission details, and the background of the lead researcher and developer.
            </p>
          </div>

          {/* Section Selector Buttons */}
          <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto font-mono text-xs">
            <button
              onClick={() => setActiveSection('developer')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeSection === 'developer'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Developer Profile</span>
            </button>
            <button
              onClick={() => setActiveSection('project')}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeSection === 'project'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>Project Submission</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: DEVELOPER PROFILE */}
      {activeSection === 'developer' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Main Profile Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col md:flex-row gap-6 md:items-start">
              
              {/* Avatar Icon / Initial */}
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-indigo-600 p-1 flex-shrink-0 shadow-lg shadow-cyan-500/20">
                <div className="h-full w-full rounded-[14px] bg-slate-950 flex items-center justify-center text-3xl font-extrabold text-cyan-400 font-mono">
                  AK
                </div>
              </div>

              {/* Bio Header Info */}
              <div className="space-y-3 flex-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-2xl font-extrabold text-white">Akhmad Khudri</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Lecturer & PhD Candidate
                    </span>
                  </div>
                  <p className="text-xs font-mono text-cyan-400 mt-1">
                    AI & Blockchain Researcher | System Architect | Educator
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  I am an AI and Blockchain researcher, system architect, and educator dedicated to advancing trustworthy and human-centered digital transformation. As a Lecturer in Informatics Engineering and a PhD Candidate, my research explores the convergence of Artificial Intelligence, Blockchain Systems, and Knowledge-Driven Digital Ecosystems, with applications in smart tourism, decentralized identity, and sustainable digital innovation.
                </p>

                {/* Direct Contact Links Bar */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <a
                    href="https://github.com/mrbrightsides"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono flex items-center gap-1.5 transition-all group"
                  >
                    <Github className="h-3.5 w-3.5 text-slate-400 group-hover:text-white" />
                    <span>GitHub</span>
                    <ArrowUpRight className="h-3 w-3 text-slate-500" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/akhmad-khudri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-all group"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-cyan-400" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="h-3 w-3 text-cyan-500/70" />
                  </a>

                  <a
                    href="https://t.me/khudriakhmad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-xs font-mono flex items-center gap-1.5 transition-all group"
                  >
                    <Send className="h-3.5 w-3.5 text-sky-400" />
                    <span>Telegram</span>
                    <ArrowUpRight className="h-3 w-3 text-sky-500/70" />
                  </a>

                  <a
                    href="https://discord.com/channels/@khudri_61362"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 text-xs font-mono flex items-center gap-1.5 transition-all group"
                  >
                    <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
                    <span>Discord</span>
                    <ArrowUpRight className="h-3 w-3 text-indigo-500/70" />
                  </a>

                  <a
                    href="mailto:khudri@binadarma.ac.id"
                    className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-500/30 text-xs font-mono flex items-center gap-1.5 transition-all group"
                  >
                    <Mail className="h-3.5 w-3.5 text-amber-400" />
                    <span>Email</span>
                    <ArrowUpRight className="h-3 w-3 text-indigo-500/70" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Deep-Dive Biography Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Bridging Academia & Implementation</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                My work bridges academia and real-world implementation. Rather than limiting research to theoretical contributions, I design and develop operational systems that demonstrate how emerging technologies can create transparency, accountability, and measurable societal impact. This includes AI-powered platforms, blockchain-auditable infrastructures, and intelligent decision-support systems deployed in education, tourism, and organizational environments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Globe className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white">Innovation Leadership & Community</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                I actively contribute to innovation ecosystems through industry collaboration, international hackathons, technology leadership roles, and community development initiatives. Currently, I lead regional initiatives within the Artificial Intelligence community while supporting digital transformation programs across academic and industry sectors.
              </p>
            </div>

          </div>

          {/* Research & Professional Interests */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Research & Professional Interests</h3>
            </div>

            <p className="text-xs text-slate-400 font-light">
              Certified in Generative AI, Cloud Computing, Data Analytics, and Blockchain Development, I am particularly interested in building trust architectures — the systems where intelligence, governance, and technology evolve together.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs font-mono text-cyan-300">
                <Cpu className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span>AI & Intelligent Systems</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs font-mono text-emerald-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Blockchain & Smart Governance</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs font-mono text-indigo-300">
                <Lock className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <span>Decentralized Identity (DID)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs font-mono text-amber-300">
                <Database className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <span>Knowledge Management</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs font-mono text-purple-300">
                <Zap className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <span>ESG Digital Innovation</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs font-mono text-rose-300">
                <Globe className="h-4 w-4 text-rose-400 flex-shrink-0" />
                <span>Smart Tourism Ecosystems</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/50 to-indigo-950/50 border border-cyan-500/30 text-xs italic text-cyan-200 mt-4 leading-relaxed">
              "I believe the future of technology lies not only in automation, but in enabling knowledge, strengthening institutions, and empowering communities through ethical and responsible innovation."
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: PROJECT SUBMISSION OVERVIEW */}
      {activeSection === 'project' && (
        <div className="space-y-8 animate-fade-in font-sans">
          
          {/* Inspiration Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Lightbulb className="h-5 w-5" />
              <h3 className="text-xl font-bold text-white">Inspiration</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              As autonomous AI agents are entrusted with high-stakes enterprise decisions — from multi-million dollar vendor procurement tenders to credit underwriting and medical diagnostics — a critical trust crisis has emerged: <strong>AI operates as an unverified black box</strong>.
            </p>
            <div className="space-y-2 pt-1 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong className="text-rose-400">1. The Admin Tamper Threat:</strong> Traditional audit logs stored in centralized SQL databases or AWS S3 buckets can be silently edited, deleted, or falsified by root administrators or hackers. Centralized logs offer zero legal non-repudiation in court.
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <strong className="text-amber-400">2. The Privacy Dilemma:</strong> Writing raw enterprise datasets or personal sensitive data (PII, HIPAA records) directly onto public blockchains violates global privacy laws like GDPR and banking secrecy regulations.
              </div>
            </div>
            <p className="text-xs text-cyan-300 font-mono italic pt-2">
              We built Provenance AI to solve this exact dilemma: "AI can make a decision. Provenance AI makes that decision verifiable."
            </p>
          </div>

          {/* What It Does Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="text-xl font-bold text-white">What It Does</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Provenance AI is a cryptographic memory layer and tamper-evident audit ledger engineered specifically for autonomous AI agents.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-white">
                  <Cpu className="h-4 w-4 text-cyan-400" />
                  <span>Multi-Agent AI Engine</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Utilizes Google Gemini 3.6 Flash to analyze multi-vendor tenders or credit applications, generating weighted mathematical scores and decision rationales.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-white">
                  <Database className="h-4 w-4 text-emerald-400" />
                  <span>Merkle Tree Hashing</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Hashes raw datasets, evidence, and AI reasoning chains into SHA-256 digests, packaging them into a zero-knowledge Merkle Tree.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-white">
                  <Lock className="h-4 w-4 text-indigo-400" />
                  <span>EVM Smart Contract Notarization</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Seals the 32-byte Merkle Root onto Sepolia Testnet via deployed <code className="text-indigo-300">ProvenanceLedger.sol</code>. Raw data stays 100% private off-chain.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs text-white">
                  <CheckCircle2 className="h-4 w-4 text-amber-400" />
                  <span>Forensic Audit & Tamper Verifier</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Simulates database tampering and live re-computes Merkle proofs, pinpointing corrupted fields instantly.
                </p>
              </div>
            </div>
          </div>

          {/* How We Built It */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Layers className="h-5 w-5" />
              <h3 className="text-xl font-bold text-white">How We Built It</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-300 font-mono">Gemini 3.6 Flash</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Integrated Google Gemini 3.6 Flash via Express server endpoints to perform multi-criteria analytical decision processing.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-300 font-mono">Solidity & Sepolia EVM</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Written in Solidity (v0.8.20), deployed on Ethereum Sepolia Testnet (<code className="text-emerald-400">0xC442...375e5</code>), connected via <code className="text-emerald-400">ethers.js v6</code>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-300 font-mono">React 18 & Tailwind</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Built with React 18, Vite, TypeScript, and Tailwind CSS with interactive Merkle visualizers and real-time gas fee estimation.
                </p>
              </div>
            </div>
          </div>

          {/* Challenges & Accomplishments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="text-lg font-bold text-white">Challenges We Ran Into</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <strong className="text-rose-300">Balancing Immutability with Privacy:</strong> Solved by building a dual-layer architecture where raw data stays off-chain and only 32-byte Merkle Roots go on-chain.
                </li>
                <li className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <strong className="text-rose-300">EVM Bytes32 Type Formatting:</strong> Handled conversion of 64-character SHA-256 hex digests into native Solidity <code className="text-rose-300">bytes32</code> payloads.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Trophy className="h-5 w-5" />
                <h3 className="text-lg font-bold text-white">Accomplishments We're Proud Of</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <strong className="text-emerald-300">Live Smart Contract Notarization:</strong> Deployed and verified on Sepolia with real MetaMask wallet signing.
                </li>
                <li className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <strong className="text-emerald-300">Instant Tamper Detection:</strong> Pinpoints modified fields within milliseconds across multi-gigabyte datasets.
                </li>
              </ul>
            </div>

          </div>

          {/* What We Learned & What's Next */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Milestone className="h-5 w-5" />
              <h3 className="text-xl font-bold text-white">What's Next for Provenance AI</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-cyan-300 font-mono">Multi-Chain Deployment</strong>
                <p className="text-[11px] text-slate-400">Expanding to Arbitrum, Polygon zkEVM, and Base for sub-cent batch notarization.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-indigo-300 font-mono">Zero-Knowledge (zk-SNARKs)</strong>
                <p className="text-[11px] text-slate-400">Proving AI rule compliance without revealing scoring weights or private prompts.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-emerald-300 font-mono">Open-Source Middleware SDK</strong>
                <p className="text-[11px] text-slate-400">Releasing <code className="text-emerald-400">provenance-ai-sdk</code> for LangChain and CrewAI agents.</p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
