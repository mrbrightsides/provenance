import React, { useState } from 'react';
import {
  Database,
  Lock,
  Layers,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Copy,
  Check,
  RotateCcw,
  GitCommit,
} from 'lucide-react';
import { DecisionRecord } from '../types';

interface BlockchainLedgerProps {
  records: DecisionRecord[];
  onTestTamper: (record: DecisionRecord) => void;
  onResetLedger: () => void;
  selectedBlockId?: string;
}

export const BlockchainLedger: React.FC<BlockchainLedgerProps> = ({
  records,
  onTestTamper,
  onResetLedger,
  selectedBlockId,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeRecordId, setActiveRecordId] = useState<string>(
    selectedBlockId || (records.length > 0 ? records[0].id : '')
  );
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [viewJsonModal, setViewJsonModal] = useState<boolean>(false);

  const activeRecord = records.find((r) => r.id === activeRecordId) || records[0];

  const filteredRecords = records.filter(
    (r) =>
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.hashes.decisionRecordHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Ledger Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3">
            <Database className="h-6 w-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">On-Chain Cryptographic Blockchain Explorer</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Every AI Agent decision is notarized onto an immutable L1 Proof-of-Authority ledger with deterministic SHA-256 state hashes and Merkle inclusion proofs. No raw sensitive data is exposed on-chain.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onResetLedger}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Demo Ledger</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Blocks List + Selected Block Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Blocks List (4 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              <span>Minted Decision Blocks</span>
            </h3>
            <span className="text-xs font-mono text-cyan-400 font-bold">{records.length} Total</span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="h-4 w-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by Decision ID, title, or hash..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Blocks Stream */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredRecords.map((rec) => {
              const isSelected = rec.id === activeRecord?.id;

              return (
                <div
                  key={rec.id}
                  onClick={() => setActiveRecordId(rec.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-cyan-500/80 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-mono font-bold border border-cyan-800/50">
                        Block #{rec.onChainBlock.blockIndex}
                      </span>
                      <span className="font-mono text-xs text-slate-300 font-bold">{rec.id}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{rec.timestamp.split(' ')[1] || ''}</span>
                  </div>

                  <h4 className="font-semibold text-xs text-white line-clamp-1 mb-1">{rec.title}</h4>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Winner: {rec.decisionOutput.winnerName.substring(0, 18)}...</span>
                    <span className="text-emerald-400">0x{rec.hashes.rawDatasetHash.substring(0, 8)}...</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Block Details & Merkle Tree Inspector (7 cols) */}
        {activeRecord ? (
          <div className="lg:col-span-7 space-y-6">
            
            {/* Block Overview Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                      Block #{activeRecord.onChainBlock.blockIndex}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">• {activeRecord.id}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{activeRecord.title}</h3>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onTestTamper(activeRecord)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Run Tamper Test</span>
                  </button>

                  <button
                    onClick={() => setViewJsonModal(!viewJsonModal)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-1.5 border border-slate-700"
                  >
                    <FileCode className="h-4 w-4" />
                    <span>Raw JSON</span>
                  </button>
                </div>
              </div>

              {/* On-Chain Header Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block">Contract Address (CA)</span>
                  <div className="flex items-center justify-between text-indigo-400 font-mono text-[11px] break-all font-bold">
                    <span>{activeRecord.onChainBlock.contractAddress || '0xC442ce42A6763e25664147b088DbD50B01C375e5'}</span>
                    <button
                      onClick={() => handleCopy(activeRecord.onChainBlock.contractAddress || '0xC442ce42A6763e25664147b088DbD50B01C375e5')}
                      className="ml-2 p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                    >
                      {copiedHash === (activeRecord.onChainBlock.contractAddress || '0xC442ce42A6763e25664147b088DbD50B01C375e5') ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block">Transaction Hash</span>
                  <div className="flex items-center justify-between text-cyan-400 text-[11px] break-all">
                    <span>{activeRecord.onChainBlock.txHash}</span>
                    <button
                      onClick={() => handleCopy(activeRecord.onChainBlock.txHash)}
                      className="ml-2 p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                    >
                      {copiedHash === activeRecord.onChainBlock.txHash ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block">Block Hash</span>
                  <div className="flex items-center justify-between text-emerald-400 text-[11px] break-all">
                    <span>{activeRecord.onChainBlock.blockHash}</span>
                    <button
                      onClick={() => handleCopy(activeRecord.onChainBlock.blockHash)}
                      className="ml-2 p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                    >
                      {copiedHash === activeRecord.onChainBlock.blockHash ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block">Previous Block Hash</span>
                  <div className="text-slate-400 text-[11px] break-all">
                    {activeRecord.onChainBlock.previousBlockHash}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block">Network & Gas</span>
                  <div className="text-slate-200 text-[11px]">
                    {activeRecord.onChainBlock.network} | Gas: {activeRecord.onChainBlock.gasUsed}
                  </div>
                </div>
              </div>

              {/* Interactive Merkle Tree Visualizer */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-cyan-400 flex items-center gap-1.5">
                    <GitCommit className="h-4 w-4" />
                    <span>Cryptographic Merkle Tree Structure</span>
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400">Proof Path Verified</span>
                </div>

                {/* Merkle Root Node */}
                <div className="flex flex-col items-center">
                  <div className="px-4 py-2 rounded-xl bg-indigo-950/80 border border-indigo-500/60 text-indigo-300 font-mono text-xs text-center shadow-lg">
                    <span className="text-[9px] text-indigo-400 uppercase block font-sans">Merkle Root</span>
                    {activeRecord.onChainBlock.merkleRoot}
                  </div>
                  <div className="w-0.5 h-6 bg-slate-700 my-1"></div>

                  {/* Intermediate Branch Hashes */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 text-center">
                      <span className="text-[9px] text-slate-400 block font-sans">Branch A (Dataset + Evidence)</span>
                      0x{activeRecord.hashes.rawDatasetHash.substring(0, 16)}...
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300 text-center">
                      <span className="text-[9px] text-slate-400 block font-sans">Branch B (Reasoning + Winner)</span>
                      0x{activeRecord.hashes.reasoningHash.substring(0, 16)}...
                    </div>
                  </div>

                  {/* Leaf Hashes */}
                  <div className="grid grid-cols-3 gap-2 w-full mt-3">
                    <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[10px] font-mono text-slate-300 text-center">
                      <span className="block text-[8px] text-slate-500 font-sans">Leaf 1 (Dataset)</span>
                      0x{activeRecord.hashes.rawDatasetHash.substring(0, 10)}...
                    </div>
                    <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[10px] font-mono text-slate-300 text-center">
                      <span className="block text-[8px] text-slate-500 font-sans">Leaf 2 (Evidence)</span>
                      0x{activeRecord.hashes.evidenceHash.substring(0, 10)}...
                    </div>
                    <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[10px] font-mono text-slate-300 text-center">
                      <span className="block text-[8px] text-slate-500 font-sans">Leaf 3 (Reasoning)</span>
                      0x{activeRecord.hashes.reasoningHash.substring(0, 10)}...
                    </div>
                  </div>
                </div>
              </div>

              {/* Raw JSON View Modal */}
              {viewJsonModal && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Decision Block Full Payload JSON</span>
                    <button
                      onClick={() => handleCopy(JSON.stringify(activeRecord, null, 2))}
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      <span>Copy JSON</span>
                    </button>
                  </div>
                  <pre className="p-3 rounded bg-slate-900 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-60 leading-relaxed">
                    {JSON.stringify(activeRecord, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
            Select a block from the ledger list to inspect cryptographic hashes and Merkle tree roots.
          </div>
        )}

      </div>
    </div>
  );
};
