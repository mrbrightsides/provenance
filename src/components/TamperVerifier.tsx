import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Database,
  Cpu,
  ArrowRight,
  Sliders,
  Sparkles,
  Info,
} from 'lucide-react';
import { DecisionRecord, Dataset, VerificationResult, FieldDiff } from '../types';
import { verifyClientDataset } from '../utils/clientAgentEngine';

interface TamperVerifierProps {
  records: DecisionRecord[];
  initialRecordId?: string;
}

export const TamperVerifier: React.FC<TamperVerifierProps> = ({ records, initialRecordId }) => {
  const [selectedRecordId, setSelectedRecordId] = useState<string>(
    initialRecordId || (records.length > 0 ? records[0].id : '')
  );

  const selectedRecord = records.find((r) => r.id === selectedRecordId) || records[0];

  // Working editable copy of dataset for testing tampering
  const [workingDataset, setWorkingDataset] = useState<Dataset>(
    selectedRecord ? JSON.parse(JSON.stringify(selectedRecord.datasetSnapshot)) : null
  );

  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Update selected record
  const handleSelectRecord = (id: string) => {
    setSelectedRecordId(id);
    const rec = records.find((r) => r.id === id);
    if (rec) {
      setWorkingDataset(JSON.parse(JSON.stringify(rec.datasetSnapshot)));
      setVerificationResult(null);
      setErrorMsg(null);
    }
  };

  // Restore working dataset to original snapshot
  const handleRestoreOriginal = () => {
    if (selectedRecord) {
      setWorkingDataset(JSON.parse(JSON.stringify(selectedRecord.datasetSnapshot)));
      setVerificationResult(null);
      setErrorMsg(null);
    }
  };

  // Preset tamper shortcuts for instant user testing!
  const handleTamperPreset = (presetType: 'price_increase' | 'quality_drop' | 'add_dispute') => {
    if (!workingDataset || workingDataset.records.length === 0) return;
    const updated = JSON.parse(JSON.stringify(workingDataset)) as Dataset;

    if (presetType === 'price_increase') {
      // Modify unit cost or primary metric of candidate 0 or 1
      const rec = updated.records[1] || updated.records[0];
      if (rec.attributes['unitCost'] !== undefined) {
        rec.attributes['unitCost'] = Number(rec.attributes['unitCost']) + 85;
      } else if (rec.attributes['troponinLevel'] !== undefined) {
        rec.attributes['troponinLevel'] = Number(rec.attributes['troponinLevel']) - 40;
      } else if (rec.attributes['debtServiceCoverage'] !== undefined) {
        rec.attributes['debtServiceCoverage'] = 1.12;
      }
    } else if (presetType === 'quality_drop') {
      const rec = updated.records[0];
      if (rec.attributes['qualityScore'] !== undefined) {
        rec.attributes['qualityScore'] = 45;
      } else if (rec.attributes['spo2Percent'] !== undefined) {
        rec.attributes['spo2Percent'] = 82;
      }
    } else if (presetType === 'add_dispute') {
      const rec = updated.records[1] || updated.records[0];
      if (rec.attributes['historicalDisputeRate'] !== undefined) {
        rec.attributes['historicalDisputeRate'] = 18.5;
      }
    }

    setWorkingDataset(updated);
    setVerificationResult(null);
  };

  // Edit attribute in table
  const handleAttributeChange = (rIdx: number, attrKey: string, newValue: string | number) => {
    if (!workingDataset) return;
    const updated = JSON.parse(JSON.stringify(workingDataset)) as Dataset;
    const parsedValue = typeof newValue === 'string' && !isNaN(Number(newValue)) ? Number(newValue) : newValue;
    updated.records[rIdx].attributes[attrKey] = parsedValue;
    setWorkingDataset(updated);
    setVerificationResult(null);
  };

  // Execute Cryptographic Verification
  const handleRunVerification = async () => {
    if (!selectedRecord || !workingDataset) return;

    setIsVerifying(true);
    setErrorMsg(null);

    try {
      let data: any = null;
      try {
        const res = await fetch('/api/agent/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            decisionId: selectedRecord.id,
            currentDataset: workingDataset,
          }),
        });

        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('application/json')) {
          data = await res.json();
        }
      } catch (fetchErr) {
        console.warn('API route unreachable, executing client-side verification engine...');
      }

      if (data && data.success && data.result) {
        setVerificationResult(data.result);
      } else {
        const clientResult = await verifyClientDataset(selectedRecord, workingDataset);
        setVerificationResult(clientResult);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error executing verification agent');
    } finally {
      setIsVerifying(false);
    }
  };

  if (!selectedRecord || !workingDataset) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        No decision records found. Please run a decision in the Agent Workspace first!
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3">
            <ShieldAlert className="h-6 w-6 text-emerald-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Cryptographic Audit & Tamper-Evident Laboratory
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Test the core PROVENANCE AI guarantee. Pick any decision record, modify values in the dataset below, and click <strong className="text-white">Run Cryptographic Audit Verification</strong>. The Verifier AI re-computes raw SHA-256 hashes and compares against the On-Chain Block proof.
          </p>
        </div>

        {/* Record Switcher Dropdown */}
        <div className="flex items-center space-x-3">
          <label className="text-xs text-slate-400 font-semibold whitespace-nowrap">Target Record:</label>
          <select
            value={selectedRecordId}
            onChange={(e) => handleSelectRecord(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 font-mono focus:border-cyan-500 outline-none"
          >
            {records.map((r) => (
              <option key={r.id} value={r.id}>
                {r.id} - {r.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dataset State & Tamper Simulation Tools */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">{workingDataset.title}</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              On-Chain Record ID: <span className="font-mono text-cyan-300">{selectedRecord.id}</span> | Notarized at:{' '}
              <span className="font-mono text-slate-300">{selectedRecord.timestamp}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleTamperPreset('price_increase')}
              className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800/80 hover:bg-amber-900/80 text-amber-300 text-xs font-medium flex items-center gap-1"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Tamper Option Values</span>
            </button>

            <button
              onClick={() => handleTamperPreset('quality_drop')}
              className="px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800/80 hover:bg-rose-900/80 text-rose-300 text-xs font-medium flex items-center gap-1"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Simulate Quality Drop</span>
            </button>

            <button
              onClick={handleRestoreOriginal}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 border border-slate-700"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restore Untampered State</span>
            </button>
          </div>
        </div>

        {/* Dataset Table with Direct Editing */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/90 text-slate-200 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 font-semibold">Option / Candidate</th>
                {workingDataset.metrics.map((m) => (
                  <th key={m.id} className="py-3 px-4 font-semibold whitespace-nowrap">
                    {m.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {workingDataset.records.map((rec, rIdx) => {
                const origRec = selectedRecord.datasetSnapshot.records.find((r: any) => r.id === rec.id);

                return (
                  <tr key={rec.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{rec.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{rec.code}</div>
                    </td>

                    {workingDataset.metrics.map((m) => {
                      const curVal = rec.attributes[m.id];
                      const origVal = origRec?.attributes[m.id];
                      const isAltered = curVal !== origVal;

                      return (
                        <td key={m.id} className="py-3 px-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <input
                              type="number"
                              value={curVal !== undefined ? curVal : ''}
                              onChange={(e) => handleAttributeChange(rIdx, m.id, e.target.value)}
                              className={`w-24 px-2.5 py-1.5 rounded font-mono text-xs outline-none transition-all ${
                                isAltered
                                  ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200 font-bold animate-pulse'
                                  : 'bg-slate-900 border border-slate-700 text-slate-100 focus:border-cyan-500'
                              }`}
                            />
                            {isAltered && (
                              <div className="text-[9px] font-mono text-rose-400">
                                Original: {origVal}
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Verification Trigger Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <Info className="h-4 w-4 text-cyan-400" />
            <span>
              On-Chain Expected Hash: <strong className="text-emerald-400 font-bold">0x{selectedRecord.hashes.rawDatasetHash.substring(0, 16)}...</strong>
            </span>
          </div>

          <button
            onClick={handleRunVerification}
            disabled={isVerifying}
            className={`px-6 py-3 rounded-xl font-semibold text-xs flex items-center gap-2 shadow-lg transition-all ${
              isVerifying
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:opacity-95 text-white shadow-emerald-500/25 active:scale-95'
            }`}
          >
            {isVerifying ? (
              <>
                <div className="h-4 w-4 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                <span>Verifier Agent Checking Hash & On-Chain State...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                <span>Run Cryptographic Audit Verification</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Verification Output Results */}
      {verificationResult && (
        <div
          className={`bg-slate-900 border rounded-2xl p-6 space-y-6 shadow-2xl transition-all ${
            verificationResult.status === 'VERIFIED_GENUINE'
              ? 'border-emerald-500/80 bg-emerald-950/10'
              : 'border-rose-500/80 bg-rose-950/10'
          }`}
        >
          {/* Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              {verificationResult.status === 'VERIFIED_GENUINE' ? (
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-2xl bg-rose-500/20 border border-rose-500 flex items-center justify-center text-rose-400 animate-pulse">
                  <XCircle className="h-7 w-7" />
                </div>
              )}

              <div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider ${
                      verificationResult.status === 'VERIFIED_GENUINE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}
                  >
                    {verificationResult.status === 'VERIFIED_GENUINE'
                      ? '100% VERIFIED GENUINE'
                      : 'TAMPERING DETECTED / HASH MISMATCH'}
                  </span>
                  <span className="text-xs text-slate-400">• {verificationResult.comparedAt}</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  {verificationResult.status === 'VERIFIED_GENUINE'
                    ? 'Dataset Integrity Intact & Audited'
                    : 'Dataset Tampering Alert & Decision Invalidation'}
                </h2>
              </div>
            </div>

            <div className="text-right font-mono text-xs">
              <div className="text-slate-400">Decision Block ID</div>
              <div className="font-bold text-white text-sm">{verificationResult.decisionId}</div>
            </div>
          </div>

          {/* AI Verifier Audit Finding */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Verifier Agent Forensic Finding</span>
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">{verificationResult.aiAuditSummary}</p>
            {verificationResult.impactAnalysis && (
              <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1 border-t border-slate-800/60 mt-2">
                <strong className="text-amber-400">Operational Risk Impact:</strong> {verificationResult.impactAnalysis}
              </p>
            )}
          </div>

          {/* Hash Comparison Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 uppercase block">Original On-Chain Notarized Hash</span>
                <a
                  href={`https://sepolia.etherscan.io/tx/${selectedRecord.onChainBlock.txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1 font-sans"
                >
                  <span>Sepolia Etherscan ↗</span>
                </a>
              </div>
              <div className="text-emerald-400 text-[11px] break-all font-bold">
                0x{verificationResult.originalDatasetHash}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Current Recalculated Dataset Hash</span>
              <div
                className={`text-[11px] break-all font-bold ${
                  verificationResult.status === 'VERIFIED_GENUINE' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                0x{verificationResult.currentDatasetHash}
              </div>
            </div>
          </div>

          {/* Altered Fields Breakdown Table */}
          {verificationResult.diffs.filter((d) => d.status === 'altered').length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase text-rose-400">
                Altered Field Forensic Breakdown
              </h4>
              <div className="overflow-x-auto rounded-xl border border-rose-900/50">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-rose-950/60 text-rose-200 font-mono text-[10px] uppercase">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Candidate Option</th>
                      <th className="py-2.5 px-4 font-semibold">Modified Field</th>
                      <th className="py-2.5 px-4 font-semibold">Original On-Chain Value</th>
                      <th className="py-2.5 px-4 font-semibold">Current Tampered Value</th>
                      <th className="py-2.5 px-4 font-semibold">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-900/40 bg-slate-950">
                    {verificationResult.diffs
                      .filter((d) => d.status === 'altered')
                      .map((diff, dIdx) => (
                        <tr key={dIdx} className="hover:bg-rose-950/20">
                          <td className="py-2.5 px-4 font-semibold text-white">{diff.entityName}</td>
                          <td className="py-2.5 px-4 font-mono text-cyan-300">{diff.field}</td>
                          <td className="py-2.5 px-4 font-mono text-emerald-400">{String(diff.originalValue)}</td>
                          <td className="py-2.5 px-4 font-mono text-rose-400 font-bold">
                            {String(diff.currentValue)}
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-[10px]">
                              {diff.severity || 'HIGH'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
