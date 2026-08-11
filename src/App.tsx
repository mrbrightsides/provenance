import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AgentWorkspace } from './components/AgentWorkspace';
import { BlockchainLedger } from './components/BlockchainLedger';
import { TamperVerifier } from './components/TamperVerifier';
import { AuditCertificate } from './components/AuditCertificate';
import { SmartContractViewer } from './components/SmartContractViewer';
import { PitchDeckModal } from './components/PitchDeckModal';
import { DecisionRecord } from './types';
import { getClientSeedLedger } from './utils/clientAgentEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState<'workspace' | 'ledger' | 'verifier' | 'certificate' | 'contract'>('workspace');
  const [records, setRecords] = useState<DecisionRecord[]>([]);
  const [selectedRecordId, setSelectedRecordId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState<boolean>(false);

  // Fetch initial on-chain records from server with browser client fallback
  const fetchLedger = async () => {
    try {
      const res = await fetch('/api/blockchain/ledger');
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success && data.records && data.records.length > 0) {
          setRecords(data.records);
          return;
        }
      }
      throw new Error('Server API unavailable or returned non-JSON response');
    } catch (err) {
      console.warn('Backend server unavailable, loading client-side seed ledger fallback...');
      const seedRecords = await getClientSeedLedger();
      setRecords(seedRecords);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLedger();
  }, []);

  // When a new decision is executed in AgentWorkspace
  const handleDecisionCreated = (newRecord: DecisionRecord) => {
    setRecords((prev) => [newRecord, ...prev.filter((r) => r.id !== newRecord.id)]);
    setSelectedRecordId(newRecord.id);
  };

  // Jump to Blockchain Explorer with a specific record highlighted
  const handleViewBlock = (recordId: string) => {
    setSelectedRecordId(recordId);
    setActiveTab('ledger');
  };

  // Jump directly to Audit & Tamper Verifier Lab with a target record
  const handleTestTamper = (record: DecisionRecord) => {
    setSelectedRecordId(record.id);
    setActiveTab('verifier');
  };

  // Reset demo blockchain ledger
  const handleResetLedger = async () => {
    try {
      const res = await fetch('/api/blockchain/reset', { method: 'POST' });
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success && data.records) {
          setRecords(data.records);
          setSelectedRecordId(data.records[0]?.id);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend reset unavailable, resetting client seed ledger...');
    }
    const seedRecords = await getClientSeedLedger();
    setRecords(seedRecords);
    setSelectedRecordId(seedRecords[0]?.id);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 antialiased">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        recordCount={records.length}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
      />

      {/* Pitch Deck Modal for NTU InnovateX Hackathon */}
      <PitchDeckModal
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
        onNavigateToTab={(tab) => {
          setActiveTab(tab);
          setIsPitchDeckOpen(false);
        }}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {isLoading ? (
          <div className="py-24 text-center space-y-4">
            <div className="h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm font-mono text-slate-400">Initializing Provenance AI L1 Ledger...</p>
          </div>
        ) : (
          <>
            {activeTab === 'workspace' && (
              <AgentWorkspace
                onDecisionCreated={handleDecisionCreated}
                onViewBlock={handleViewBlock}
                onTestTamper={handleTestTamper}
              />
            )}

            {activeTab === 'ledger' && (
              <BlockchainLedger
                records={records}
                onTestTamper={handleTestTamper}
                onResetLedger={handleResetLedger}
                onRecordUpdated={(updated) => handleDecisionCreated(updated)}
                selectedBlockId={selectedRecordId}
              />
            )}

            {activeTab === 'verifier' && (
              <TamperVerifier records={records} initialRecordId={selectedRecordId} />
            )}

            {activeTab === 'certificate' && (
              <AuditCertificate records={records} initialRecordId={selectedRecordId} />
            )}

            {activeTab === 'contract' && (
              <SmartContractViewer />
            )}
          </>
        )}
      </main>
    </div>
  );
}
