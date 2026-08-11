import React, { useState } from 'react';
import {
  ShieldCheck,
  Printer,
  FileCheck,
  CheckCircle2,
  Lock,
  Layers,
  Download,
  Share2,
  ExternalLink,
} from 'lucide-react';
import { DecisionRecord } from '../types';

interface AuditCertificateProps {
  records: DecisionRecord[];
  initialRecordId?: string;
}

export const AuditCertificate: React.FC<AuditCertificateProps> = ({ records, initialRecordId }) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string>(
    initialRecordId || (records.length > 0 ? records[0].id : '')
  );

  const record = records.find((r) => r.id === selectedRecordId) || records[0];

  const handlePrint = () => {
    window.print();
  };

  if (!record) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        No decision record available to generate certificate.
      </div>
    );
  }

  const etherscanTxUrl = `https://sepolia.etherscan.io/tx/${record.onChainBlock.txHash}`;
  const etherscanContractUrl = `https://sepolia.etherscan.io/address/${record.onChainBlock.contractAddress || '0xC442ce42A6763e25664147b088DbD50B01C375e5'}`;
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(etherscanTxUrl)}`;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 print:hidden">
        <div>
          <div className="flex items-center space-x-3">
            <FileCheck className="h-6 w-6 text-amber-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Verifiable Decision Audit Certificate</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Official cryptographic attestation certificate for regulatory compliance, enterprise procurement audits, or legal proof of reasoning notarized on Sepolia Testnet.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedRecordId}
            onChange={(e) => setSelectedRecordId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 font-mono outline-none"
          >
            {records.map((r) => (
              <option key={r.id} value={r.id}>
                {r.id} - {r.title}
              </option>
            ))}
          </select>

          <a
            href={etherscanTxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Verify on Sepolia Etherscan</span>
          </a>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Certificate Canvas */}
      <div className="bg-slate-950 border-2 border-amber-500/40 rounded-2xl p-8 md:p-12 space-y-8 text-slate-100 max-w-4xl mx-auto shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:p-0 print:text-black print:bg-white">
        
        {/* Decorative Certificate Watermark / Header */}
        <div className="border-b-2 border-amber-500/30 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 print:bg-amber-100 print:text-amber-800">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase print:text-amber-700">
                PROVENANCE AI • OFFICIAL VERIFICATION RECORD
              </div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight print:text-black">
                Decision Audit Certificate
              </h1>
              <p className="text-xs text-slate-400 font-mono mt-0.5 print:text-gray-600">
                Attestation ID: {record.id} | Notarized Block #{record.onChainBlock.blockIndex}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-right font-mono text-xs">
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 print:bg-gray-100 print:text-black">
              <div className="text-[10px] text-slate-500 uppercase">On-Chain State</div>
              <div className="text-emerald-400 font-bold print:text-emerald-700">100% IMMUTABLE</div>
            </div>
          </div>
        </div>

        {/* Certificate Body Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="md:col-span-2 space-y-6">
            
            {/* Title & Winner */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 print:bg-gray-50 print:border-gray-200">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 print:text-amber-800">
                Decision Subject & Award
              </span>
              <h3 className="text-lg font-bold text-white print:text-black">{record.title}</h3>
              <div className="pt-2 border-t border-slate-800 print:border-gray-200 flex items-center justify-between">
                <span className="text-slate-400 print:text-gray-600">Selected Recommendation:</span>
                <span className="font-bold text-emerald-400 text-sm print:text-emerald-800">
                  {record.decisionOutput.winnerName}
                </span>
              </div>
            </div>

            {/* Rationale & Evidence */}
            <div className="space-y-2">
              <h4 className="font-mono font-bold uppercase text-slate-400 text-[10px] print:text-gray-700">
                Audited Reasoning Summary
              </h4>
              <p className="text-slate-300 leading-relaxed font-sans print:text-gray-800">
                {record.decisionOutput.recommendationSummary}
              </p>
              <ul className="space-y-1.5 pt-2">
                {record.decisionOutput.rationalePoints.map((pt, pIdx) => (
                  <li key={pIdx} className="text-slate-300 flex items-start gap-2 print:text-gray-800">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5 print:text-amber-700" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Candidate Scores */}
            <div className="space-y-2">
              <h4 className="font-mono font-bold uppercase text-slate-400 text-[10px] print:text-gray-700">
                Evaluated Candidates & Scores
              </h4>
              <div className="space-y-1.5">
                {record.decisionOutput.comparativeRankings.map((c) => (
                  <div
                    key={c.entityId}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between font-mono text-xs print:bg-gray-100 print:border-gray-200 print:text-black"
                  >
                    <span>
                      #{c.rank} {c.entityName}
                    </span>
                    <span className="font-bold text-cyan-400 print:text-cyan-800">{c.overallScore} / 100</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hashes & Cryptographic Seals */}
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 font-mono text-[11px] print:bg-gray-50 print:border-gray-200">
              <div className="flex items-center space-x-2 text-amber-400 font-sans font-bold pb-2 border-b border-slate-800 print:text-amber-800">
                <Lock className="h-4 w-4" />
                <span>On-Chain Cryptographic Proof</span>
              </div>

              <div>
                <span className="text-[9px] text-slate-400 uppercase block print:text-gray-600">Raw Dataset SHA-256</span>
                <span className="text-emerald-400 break-all text-[10px] print:text-emerald-800">
                  0x{record.hashes.rawDatasetHash}
                </span>
              </div>

              <div>
                <span className="text-[9px] text-slate-400 uppercase block print:text-gray-600">Merkle Root</span>
                <span className="text-indigo-400 break-all text-[10px] print:text-indigo-800">
                  {record.onChainBlock.merkleRoot}
                </span>
              </div>

              <div>
                <span className="text-[9px] text-slate-400 uppercase block print:text-gray-600">Sepolia Contract</span>
                <a
                  href={etherscanContractUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200 hover:underline break-all text-[10px] flex items-center gap-1 mt-0.5 print:text-indigo-800"
                >
                  <span>{record.onChainBlock.contractAddress || '0xC442ce42A6763e25664147b088DbD50B01C375e5'}</span>
                  <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                </a>
              </div>

              <div>
                <span className="text-[9px] text-slate-400 uppercase block print:text-gray-600">Sepolia Tx Hash</span>
                <a
                  href={etherscanTxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline break-all text-[10px] flex items-center gap-1 mt-0.5 font-bold print:text-blue-800"
                >
                  <span>{record.onChainBlock.txHash}</span>
                  <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                </a>
              </div>
            </div>

            {/* Dynamic QR Code Seal pointing to Sepolia Etherscan */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center space-y-3 text-center print:bg-gray-50 print:border-gray-200">
              <div className="h-28 w-28 bg-white p-2 rounded-xl flex items-center justify-center shadow-md">
                <img
                  src={qrCodeImageUrl}
                  alt="Sepolia Etherscan QR Code"
                  className="h-24 w-24 object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block print:text-amber-800">
                  Scan QR to Verify on Sepolia
                </span>
                <a
                  href={etherscanTxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:underline font-mono mt-1 print:text-blue-800"
                >
                  <span>sepolia.etherscan.io</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Certificate Footer Stamp */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500 print:text-gray-600">
          <div>
            PROVENANCE AI • Decentralized Decision Ledger Layer 1 <br />
            Attestation Notarized on Sepolia Testnet at {record.timestamp}
          </div>
          <div className="text-right">
            Verification Protocol: SHA-256 / Merkle Tree L1 <br />
            Status: <span className="text-emerald-400 font-bold print:text-emerald-800">VALIDATED & AUDITED ON-CHAIN</span>
          </div>
        </div>

      </div>
    </div>
  );
};
