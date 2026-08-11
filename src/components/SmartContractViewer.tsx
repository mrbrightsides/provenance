import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Terminal,
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles,
  FileCode,
  Globe,
} from 'lucide-react';
import { DEPLOYED_CONTRACT_ADDRESS, CONTRACT_ABI } from '../contracts/contractConfig';

const SOLIDITY_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ProvenanceLedger
 * @dev On-Chain Tamper-Evident Memory and Verification Layer for PROVENANCE AI.
 * Stores decision cryptographic hashes, Merkle roots, and evidence snapshots.
 *
 * Architecture: Observe -> Reason -> Verify -> Act -> Prove
 */
contract ProvenanceLedger {
    
    struct DecisionRecord {
        string decisionId;          // e.g. "DEC-000128"
        string useCase;             // e.g. "procurement", "medical", "loan"
        string title;               // e.g. "Global Supply Chain Supplier Matrix Q3-2026"
        bytes32 rawDatasetHash;     // SHA-256 hash of raw evaluation dataset
        bytes32 evidenceHash;       // SHA-256 hash of data quality & origin evidence
        bytes32 reasoningHash;      // SHA-256 hash of AI reasoning output & rationale
        bytes32 merkleRoot;         // Merkle Root summarizing decision tree
        string winnerName;          // Name of selected winner entity
        uint256 timestamp;          // Unix timestamp when block was notarized
        address notary;             // EVM address of the notarizing AI Agent
    }

    mapping(string => DecisionRecord) private _records;
    string[] private _decisionIds;
    address public owner;

    event DecisionNotarized(
        string indexed decisionId,
        string useCase,
        bytes32 indexed rawDatasetHash,
        bytes32 merkleRoot,
        string winnerName,
        uint256 timestamp,
        address indexed notary
    );

    event DecisionVerified(
        string indexed decisionId,
        bool isGenuine,
        bytes32 computedHash,
        bytes32 onChainHash,
        uint256 verifiedAt
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "ProvenanceLedger: Caller is not authorized owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function notarizeDecision(
        string calldata decisionId,
        string calldata useCase,
        string calldata title,
        bytes32 rawDatasetHash,
        bytes32 evidenceHash,
        bytes32 reasoningHash,
        bytes32 merkleRoot,
        string calldata winnerName
    ) external onlyOwner {
        require(_records[decisionId].timestamp == 0, "ProvenanceLedger: Record already exists");
        require(bytes(decisionId).length > 0, "ProvenanceLedger: Invalid decisionId");

        DecisionRecord memory newRecord = DecisionRecord({
            decisionId: decisionId,
            useCase: useCase,
            title: title,
            rawDatasetHash: rawDatasetHash,
            evidenceHash: evidenceHash,
            reasoningHash: reasoningHash,
            merkleRoot: merkleRoot,
            winnerName: winnerName,
            timestamp: block.timestamp,
            notary: msg.sender
        });

        _records[decisionId] = newRecord;
        _decisionIds.push(decisionId);

        emit DecisionNotarized(
            decisionId,
            useCase,
            rawDatasetHash,
            merkleRoot,
            winnerName,
            block.timestamp,
            msg.sender
        );
    }

    function verifyDatasetIntegrity(
        string calldata decisionId,
        bytes32 computedDatasetHash
    ) external returns (bool isGenuine, bytes32 storedHash) {
        DecisionRecord memory rec = _records[decisionId];
        require(rec.timestamp > 0, "ProvenanceLedger: Decision record does not exist");

        storedHash = rec.rawDatasetHash;
        isGenuine = (computedDatasetHash == storedHash);

        emit DecisionVerified(
            decisionId,
            isGenuine,
            computedDatasetHash,
            storedHash,
            block.timestamp
        );

        return (isGenuine, storedHash);
    }

    function getDecisionRecord(string calldata decisionId) external view returns (DecisionRecord memory) {
        require(_records[decisionId].timestamp > 0, "ProvenanceLedger: Record does not exist");
        return _records[decisionId];
    }

    function getTotalDecisions() external view returns (uint256) {
        return _decisionIds.length;
    }

    function getDecisionIdByIndex(uint256 index) external view returns (string memory) {
        require(index < _decisionIds.length, "ProvenanceLedger: Index out of bounds");
        return _decisionIds[index];
    }
}`;

export const SmartContractViewer: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedAbi, setCopiedAbi] = useState(false);
  const [viewTab, setViewTab] = useState<'solidity' | 'abi'>('solidity');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SOLIDITY_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(DEPLOYED_CONTRACT_ADDRESS);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  const handleCopyAbi = () => {
    navigator.clipboard.writeText(JSON.stringify(CONTRACT_ABI, null, 2));
    setCopiedAbi(true);
    setTimeout(() => setCopiedAbi(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Contract Address & Active Deployed Status Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-500/20">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE DEPLOYED CONTRACT
                </span>
                <span className="text-xs text-slate-400">• Remix / EVM Network</span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                `ProvenanceLedger` Smart Contract
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyAddress}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-indigo-500/40 hover:border-indigo-400 text-slate-200 font-mono text-xs flex items-center gap-2 transition-all"
            >
              {copiedAddress ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Copy CA</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyAbi}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              {copiedAbi ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-300" />
                  <span>ABI Copied!</span>
                </>
              ) : (
                <>
                  <FileCode className="h-3.5 w-3.5" />
                  <span>Copy Contract ABI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Display CA Box */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Contract Address (CA)
            </span>
            <div className="text-emerald-400 font-mono font-bold text-sm break-all">
              {DEPLOYED_CONTRACT_ADDRESS}
            </div>
          </div>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 shrink-0">
            <Globe className="h-3.5 w-3.5 text-cyan-400" />
            <span>Ready for Web3.js / Ethers.js Ingestion</span>
          </div>
        </div>
      </div>

      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3">
            <Code2 className="h-6 w-6 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Production Smart Contract Source Code
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Solidity smart contract resmi untuk PROVENANCE AI Layer 1. Kontrak ini menyimpan hash SHA-256 data, bukti origin, alasan keputusan AI, dan Merkle Root secara permanen di blockchain EVM.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyCode}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            {copiedCode ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span>Copied Solidity!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Solidity Code</span>
              </>
            )}
          </button>

          <a
            href="https://remix.ethereum.org"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-2 transition-all"
          >
            <span>Open Remix IDE</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Deployment Guide Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step-by-Step Remix Instructions */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Panduan Deploy di Remix IDE</span>
          </h3>

          <ol className="space-y-4 text-xs text-slate-300">
            <li className="flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                1
              </span>
              <div>
                <strong className="text-white block">Salin Kode Solidity</strong>
                Klik tombol <span className="text-indigo-400 font-mono">Copy Solidity Code</span> di atas.
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                2
              </span>
              <div>
                <strong className="text-white block">Buka Remix IDE</strong>
                Buka <a href="https://remix.ethereum.org" target="_blank" rel="noreferrer" className="text-cyan-400 underline">remix.ethereum.org</a> di tab browser baru.
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                3
              </span>
              <div>
                <strong className="text-white block">Buat File `ProvenanceLedger.sol`</strong>
                Di Remix File Explorer, buat file baru di folder <code className="text-amber-300 font-mono">contracts/</code> dengan nama <code className="text-amber-300 font-mono">ProvenanceLedger.sol</code> lalu paste kodenya.
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                4
              </span>
              <div>
                <strong className="text-white block">Compile Smart Contract</strong>
                Pindah ke tab <strong className="text-white">Solidity Compiler</strong> (ikon ke-3 di kiri), pilih compiler version <code className="text-emerald-300 font-mono">0.8.20</code> atau lebih baru, lalu klik <strong className="text-emerald-400">Compile ProvenanceLedger.sol</strong>.
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="h-6 w-6 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                5
              </span>
              <div>
                <strong className="text-white block">Deploy ke Network</strong>
                Pindah ke tab <strong className="text-white">Deploy & Run Transactions</strong>.
                <ul className="list-disc list-inside mt-1 text-slate-400 space-y-1">
                  <li>Gunakan <code className="text-cyan-300">Remix VM (Cancun)</code> untuk pengujian lokal instan.</li>
                  <li>Atau pilih <code className="text-cyan-300">Injected Provider - MetaMask</code> untuk deploy ke Sepolia / Polygon testnet.</li>
                </ul>
              </div>
            </li>
          </ol>

          <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-xs text-indigo-200 space-y-1">
            <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              <span>Mengapa Harus On-Chain?</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              Dengan smart contract ini, tidak ada satu orang pun (bahkan admin server sekalipun) yang dapat mengubah histori keputusan AI setelah dinotariskan.
            </p>
          </div>
        </div>

        {/* Source Code / ABI Editor Box */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3 font-mono text-xs">
              <button
                onClick={() => setViewTab('solidity')}
                className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                  viewTab === 'solidity'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>ProvenanceLedger.sol</span>
              </button>

              <button
                onClick={() => setViewTab('abi')}
                className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                  viewTab === 'abi'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <FileCode className="h-3.5 w-3.5" />
                <span>Contract ABI (JSON)</span>
              </button>
            </div>

            <button
              onClick={viewTab === 'solidity' ? handleCopyCode : handleCopyAbi}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono bg-slate-900 px-2.5 py-1 rounded border border-slate-800"
            >
              {(viewTab === 'solidity' ? copiedCode : copiedAbi) ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              <span>{(viewTab === 'solidity' ? copiedCode : copiedAbi) ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed max-h-[600px] overflow-y-auto selection:bg-indigo-500">
            <pre>
              <code>
                {viewTab === 'solidity'
                  ? SOLIDITY_CODE
                  : JSON.stringify(CONTRACT_ABI, null, 2)}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
