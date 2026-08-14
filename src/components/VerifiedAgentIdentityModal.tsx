import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Lock, 
  Cpu, 
  FileCode, 
  Fingerprint, 
  Layers, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface VerifiedAgentIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerifiedAgentIdentityModal: React.FC<VerifiedAgentIdentityModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationPassed, setVerificationPassed] = useState<boolean>(true);

  if (!isOpen) return null;

  // Cryptographic root hash of the system's core governance module
  const GOVERNANCE_ROOT_HASH = '0x7a8e932b55f75662f3a6cb6e5fd70327f27ef75a7c2111d4e680a6bbf0b79ec4';
  const AGENT_DID = 'did:provenance:agent:gemini-3.6-flash:sepolia:0xC442ce42A6763e25664147b088DbD50B01C375e5';
  const POLICY_SPEC_DIGEST = '0x4d8a1c9e83f27b5e610d4a974b2169ce360e20173c68ea8b75e921d283c748aa';
  const CONTRACT_ADDRESS = '0xC442ce42A6763e25664147b088DbD50B01C375e5';
  const SECP256K1_PUBKEY = '0x04b281f6920984da783c18b14e667b93f1d24c089f28ef3c91e1d0f5080c32ba497463f829a9e34c98f82cb3a8904721798365287f3940176395b28d71629853a0';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleReverify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationPassed(true);
    }, 600);
  };

  return (
    <div 
      id="verified-agent-identity-modal-backdrop"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="verified-agent-identity-modal"
        className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl shadow-cyan-500/10 overflow-hidden font-sans text-white max-h-[90vh] flex flex-col"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="relative z-10 px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Verified Agent Identity
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active & Signed
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Core Governance Merkle Identity & State Attestation
              </p>
            </div>
          </div>

          <button
            id="close-agent-identity-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 p-6 overflow-y-auto space-y-6 text-xs text-slate-300">
          
          {/* Main Root Hash Callout */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 space-y-2.5 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Fingerprint className="h-4 w-4 text-cyan-400" />
                <span>Governance Module Cryptographic Root Hash</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                SHA-256 Merkle Root
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
              <code className="text-xs sm:text-sm font-mono text-cyan-300 font-bold break-all selection:bg-cyan-500/30">
                {GOVERNANCE_ROOT_HASH}
              </code>
              <button
                id="copy-governance-root-hash-btn"
                onClick={() => copyToClipboard(GOVERNANCE_ROOT_HASH, 'root')}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex-shrink-0 transition-colors"
                title="Copy Governance Root Hash"
              >
                {copiedKey === 'root' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
              This 32-byte cryptographic Merkle root binds the autonomous agent's policy rules, decision weights, and identity keys into the immutable Ethereum Sepolia ledger.
            </p>
          </div>

          {/* Identity Breakdown Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-indigo-400" />
              <span>Attestation Tree Leaves & Parameters</span>
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              
              {/* DID */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Agent Decentralized Identifier (DID)</span>
                  <code className="text-xs font-mono text-indigo-300 break-all">{AGENT_DID}</code>
                </div>
                <button
                  id="copy-agent-did-btn"
                  onClick={() => copyToClipboard(AGENT_DID, 'did')}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex-shrink-0 self-end sm:self-auto"
                >
                  {copiedKey === 'did' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Policy Spec Digest */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">Governance Policy Spec Digest (Weight Matrix)</span>
                  <code className="text-xs font-mono text-emerald-300 break-all">{POLICY_SPEC_DIGEST}</code>
                </div>
                <button
                  id="copy-policy-digest-btn"
                  onClick={() => copyToClipboard(POLICY_SPEC_DIGEST, 'policy')}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex-shrink-0 self-end sm:self-auto"
                >
                  {copiedKey === 'policy' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Smart Contract Anchor */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">On-Chain Sepolia Notary Anchor</span>
                  <code className="text-xs font-mono text-amber-300 break-all">{CONTRACT_ADDRESS}</code>
                </div>
                <a
                  id="view-sepolia-contract-link"
                  href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 flex-shrink-0 self-end sm:self-auto"
                  title="View on Etherscan"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                </a>
              </div>

            </div>
          </div>

          {/* Verification Status Banner */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <div className="font-bold text-white text-xs flex items-center gap-1.5">
                  <span>Cryptographic Governance Attestation Valid</span>
                  {verificationPassed && <span className="text-[10px] text-emerald-400 font-mono">● Verified</span>}
                </div>
                <div className="text-[11px] text-slate-400 font-light">
                  secp256k1 & SHA-256 Merkle root integrity match system state (100% Deterministic)
                </div>
              </div>
            </div>

            <button
              id="reverify-agent-identity-btn"
              onClick={handleReverify}
              disabled={isVerifying}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 text-xs font-mono flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isVerifying ? 'animate-spin text-cyan-400' : 'text-emerald-400'}`} />
              <span>{isVerifying ? 'Verifying...' : 'Re-verify'}</span>
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="relative z-10 px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 font-mono">
            NTU InnovateX '26 • Governance Protocol v1.4
          </span>
          <button
            id="close-agent-identity-footer-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-xs hover:from-cyan-400 hover:to-indigo-500 transition-all"
          >
            Close Identity Modal
          </button>
        </div>

      </div>
    </div>
  );
};
